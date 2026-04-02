"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useFunilStore } from "@/store/funilStore";
import { posthog } from "@/lib/posthog";
import { t } from "@/lib/i18n";

type QuizStep = "genero" | "idade" | "nome" | "transicao" | "tempo_tela" | "conexao" | "objetivo";

const STEP_ORDER: QuizStep[] = ["genero", "idade", "nome", "transicao", "tempo_tela", "conexao", "objetivo"];

function getProgressWidth(step: QuizStep): number {
  const idx = STEP_ORDER.indexOf(step);
  if (step === "transicao") return getProgressWidth("nome");
  return Math.round(((idx + 1) / (STEP_ORDER.length - 1)) * 100); // -1 to exclude transicao
}

export default function QuizPage() {
  const router = useRouter();
  const store = useFunilStore();
  const txt = t().quiz;
  const [step, setStep] = useState<QuizStep>("genero");
  const [feedback, setFeedback] = useState<string | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [slideDirection, setSlideDirection] = useState<"enter" | "exit" | null>(null);

  useEffect(() => {
    posthog.capture("quiz_started");
  }, []);

  const advanceToStep = useCallback((nextStep: QuizStep) => {
    setSlideDirection("exit");
    setIsAnimating(true);

    setTimeout(() => {
      setStep(nextStep);
      setSlideDirection("enter");
      setFeedback(null);

      setTimeout(() => {
        setSlideDirection(null);
        setIsAnimating(false);
      }, 300);
    }, 300);
  }, []);

  const handleSelect = useCallback(
    (stepName: string, value: string, feedbackText: string, nextStep: QuizStep) => {
      if (isAnimating) return;
      setFeedback(feedbackText);
      posthog.capture("quiz_step_completed", { step: stepName, resposta: value });

      setTimeout(() => {
        advanceToStep(nextStep);
      }, 1000);
    },
    [isAnimating, advanceToStep]
  );

  const handleGenero = (genero: "menino" | "menina") => {
    store.setGenero(genero);
    const fb = genero === "menino" ? txt.feedbackMenino : txt.feedbackMenina;
    handleSelect("genero", genero, fb, "idade");
  };

  const handleIdade = (idade: string) => {
    store.setIdade(idade);
    const feedbacks: Record<string, string> = {
      "0-2": txt.feedbackIdade02,
      "3-5": txt.feedbackIdade35,
      "6-8": txt.feedbackIdade68,
      "9-12": txt.feedbackIdade912,
    };
    handleSelect("idade", idade, feedbacks[idade] ?? "", "nome");
  };

  const handleNome = () => {
    if (!store.nome_filho.trim()) return;
    posthog.capture("quiz_step_completed", { step: "nome", resposta: store.nome_filho });
    advanceToStep("transicao");
  };

  useEffect(() => {
    if (step === "transicao") {
      const timer = setTimeout(() => {
        advanceToStep("tempo_tela");
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [step, advanceToStep]);

  const handleTempoTela = (tempo: string) => {
    store.setTempoTela(tempo);
    const feedbacks: Record<string, string> = {
      "menos_1h": txt.feedbackTela1h,
      "1_2h": txt.feedbackTela2h,
      "2_4h": txt.feedbackTela4h,
      "mais_4h": txt.feedbackTela4hMais,
    };
    handleSelect("tempo_tela", tempo, feedbacks[tempo] ?? "", "conexao");
  };

  const handleConexao = (conexao: string) => {
    store.setConexao(conexao);
    const feedbacks: Record<string, string> = {
      "mais_momentos": txt.feedbackConexaoSim,
      "corrido": txt.feedbackConexaoCorrido,
      "falta": txt.feedbackConexaoFalta,
    };
    handleSelect("conexao", conexao, feedbacks[conexao] ?? "", "objetivo");
  };

  const handleObjetivo = (objetivo: string) => {
    store.setObjetivo(objetivo);
    const feedbacks: Record<string, string> = {
      criativo: txt.feedbackCriativo,
      sem_tela: txt.feedbackSemTela,
      lembranca: txt.feedbackLembranca,
      aprendizado: txt.feedbackAprendizado,
    };

    setFeedback(feedbacks[objetivo] ?? "");
    posthog.capture("quiz_step_completed", { step: "objetivo", resposta: objetivo });

    setTimeout(() => {
      router.push("/upload");
    }, 1000);
  };

  const slideClass =
    slideDirection === "exit"
      ? "translate-x-[-100%] opacity-0"
      : slideDirection === "enter"
        ? "animate-slide-in-right"
        : "";

  return (
    <main className="flex min-h-screen flex-col bg-white">
      {/* Barra de progresso */}
      <div className="w-full h-1.5 bg-purple-100">
        <div
          className="h-full bg-purple-600 transition-all duration-500 ease-out rounded-r-full"
          style={{ width: `${getProgressWidth(step)}%` }}
        />
      </div>

      {/* Conteúdo do quiz */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-10">
        <div className={`w-full max-w-md transition-all duration-300 ease-out ${slideClass}`}>
          {step === "genero" && (
            <StepGenero onSelect={handleGenero} feedback={feedback} />
          )}
          {step === "idade" && (
            <StepIdade onSelect={handleIdade} feedback={feedback} genero={store.genero} />
          )}
          {step === "nome" && (
            <StepNome
              nome={store.nome_filho}
              onChangeNome={store.setNomeFIlho}
              onSubmit={handleNome}
              genero={store.genero}
            />
          )}
          {step === "transicao" && <StepTransicao nome={store.nome_filho} />}
          {step === "tempo_tela" && (
            <StepTempoTela onSelect={handleTempoTela} feedback={feedback} nome={store.nome_filho} />
          )}
          {step === "conexao" && (
            <StepConexao onSelect={handleConexao} feedback={feedback} nome={store.nome_filho} />
          )}
          {step === "objetivo" && (
            <StepObjetivo onSelect={handleObjetivo} feedback={feedback} nome={store.nome_filho} />
          )}
        </div>
      </div>
    </main>
  );
}

/* ======= STEP COMPONENTS ======= */

function StepGenero({
  onSelect,
  feedback,
}: {
  onSelect: (g: "menino" | "menina") => void;
  feedback: string | null;
}) {
  const txt = t().quiz;

  return (
    <div className="text-center space-y-8">
      <div className="space-y-2">
        <p className="text-sm text-purple-600 font-medium">{txt.generoSubtitle}</p>
        <h2 className="text-2xl font-bold text-gray-900">{txt.generoTitle}</h2>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={() => onSelect("menino")}
          className="flex flex-col items-center gap-3 p-6 rounded-2xl border-2 border-gray-200 hover:border-purple-400 hover:bg-purple-50 transition-all active:scale-95"
        >
          <span className="text-6xl">👦</span>
          <span className="font-semibold text-gray-700 text-lg">{txt.menino}</span>
        </button>
        <button
          onClick={() => onSelect("menina")}
          className="flex flex-col items-center gap-3 p-6 rounded-2xl border-2 border-gray-200 hover:border-purple-400 hover:bg-purple-50 transition-all active:scale-95"
        >
          <span className="text-6xl">👧</span>
          <span className="font-semibold text-gray-700 text-lg">{txt.menina}</span>
        </button>
      </div>

      {feedback && (
        <p className="text-purple-600 font-medium animate-fade-in">{feedback}</p>
      )}
    </div>
  );
}

function StepIdade({
  onSelect,
  feedback,
  genero,
}: {
  onSelect: (i: string) => void;
  feedback: string | null;
  genero: "menino" | "menina" | null;
}) {
  const txt = t().quiz;
  const pronome = genero === "menina" ? "ela" : "ele";

  const opcoes = [
    { valor: "0-2", emoji: "🍼", label: txt.idade02 },
    { valor: "3-5", emoji: "🎨", label: txt.idade35 },
    { valor: "6-8", emoji: "📚", label: txt.idade68 },
    { valor: "9-12", emoji: "⭐", label: txt.idade912 },
  ];

  return (
    <div className="text-center space-y-8">
      <h2 className="text-2xl font-bold text-gray-900">{txt.idadeTitle(pronome)}</h2>

      <div className="grid grid-cols-2 gap-3">
        {opcoes.map((op) => (
          <button
            key={op.valor}
            onClick={() => onSelect(op.valor)}
            className="flex flex-col items-center gap-2 p-5 rounded-2xl border-2 border-gray-200 hover:border-purple-400 hover:bg-purple-50 transition-all active:scale-95"
          >
            <span className="text-4xl">{op.emoji}</span>
            <span className="font-medium text-gray-700">{op.label}</span>
          </button>
        ))}
      </div>

      {feedback && (
        <p className="text-purple-600 font-medium animate-fade-in">{feedback}</p>
      )}
    </div>
  );
}

function StepNome({
  nome,
  onChangeNome,
  onSubmit,
  genero,
}: {
  nome: string;
  onChangeNome: (n: string) => void;
  onSubmit: () => void;
  genero: "menino" | "menina" | null;
}) {
  const txt = t().quiz;
  const pronome = genero === "menina" ? "dela" : "dele";

  return (
    <div className="text-center space-y-8">
      <h2 className="text-2xl font-bold text-gray-900">{txt.nomeTitle(pronome)}</h2>

      <div className="space-y-4">
        <input
          type="text"
          value={nome}
          onChange={(e) => onChangeNome(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && onSubmit()}
          placeholder={txt.nomePlaceholder}
          autoFocus
          className="w-full text-center text-xl py-4 px-6 rounded-2xl border-2 border-gray-200 focus:border-purple-400 focus:ring-4 focus:ring-purple-100 outline-none transition-all"
        />

        <button
          onClick={onSubmit}
          disabled={!nome.trim()}
          className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white py-4 rounded-full font-semibold text-lg transition-all active:scale-[0.98]"
        >
          {txt.nomeContinuar}
        </button>
      </div>
    </div>
  );
}

function StepTransicao({ nome }: { nome: string }) {
  const txt = t().quiz;

  return (
    <div className="text-center space-y-8 py-10">
      <div className="w-16 h-16 mx-auto rounded-full bg-purple-100 flex items-center justify-center">
        <span className="text-3xl">✨</span>
      </div>

      <h2 className="text-2xl font-bold text-gray-900">
        {txt.transicaoTitle(nome)}
      </h2>

      <div className="w-full max-w-xs mx-auto h-2 bg-purple-100 rounded-full overflow-hidden">
        <div className="h-full bg-purple-600 rounded-full animate-loading-bar" />
      </div>
    </div>
  );
}

function StepTempoTela({
  onSelect,
  feedback,
  nome,
}: {
  onSelect: (t: string) => void;
  feedback: string | null;
  nome: string;
}) {
  const txt = t().quiz;

  const opcoes = [
    { valor: "menos_1h", emoji: "📱", label: txt.tempoTela1h },
    { valor: "1_2h", emoji: "📺", label: txt.tempoTela2h },
    { valor: "2_4h", emoji: "🎮", label: txt.tempoTela4h },
    { valor: "mais_4h", emoji: "😰", label: txt.tempoTela4hMais },
  ];

  return (
    <div className="text-center space-y-8">
      <h2 className="text-2xl font-bold text-gray-900">
        {txt.tempoTelaTitle(nome)}
      </h2>

      <div className="space-y-3">
        {opcoes.map((op) => (
          <button
            key={op.valor}
            onClick={() => onSelect(op.valor)}
            className="w-full flex items-center gap-4 p-4 rounded-2xl border-2 border-gray-200 hover:border-purple-400 hover:bg-purple-50 transition-all active:scale-[0.98] text-left"
          >
            <span className="text-3xl">{op.emoji}</span>
            <span className="font-medium text-gray-700 text-lg">{op.label}</span>
          </button>
        ))}
      </div>

      {feedback && (
        <p className="text-purple-600 font-medium animate-fade-in">{feedback}</p>
      )}
    </div>
  );
}

function StepConexao({
  onSelect,
  feedback,
  nome,
}: {
  onSelect: (c: string) => void;
  feedback: string | null;
  nome: string;
}) {
  const txt = t().quiz;

  const opcoes = [
    { valor: "mais_momentos", emoji: "💛", label: txt.conexaoSim },
    { valor: "corrido", emoji: "😔", label: txt.conexaoCorrido },
    { valor: "falta", emoji: "🤔", label: txt.conexaoFalta },
  ];

  return (
    <div className="text-center space-y-8">
      <h2 className="text-2xl font-bold text-gray-900">
        {txt.conexaoTitle(nome)}
      </h2>

      <div className="space-y-3">
        {opcoes.map((op) => (
          <button
            key={op.valor}
            onClick={() => onSelect(op.valor)}
            className="w-full flex items-center gap-4 p-4 rounded-2xl border-2 border-gray-200 hover:border-purple-400 hover:bg-purple-50 transition-all active:scale-[0.98] text-left"
          >
            <span className="text-3xl">{op.emoji}</span>
            <span className="font-medium text-gray-700 text-lg">{op.label}</span>
          </button>
        ))}
      </div>

      {feedback && (
        <p className="text-purple-600 font-medium animate-fade-in">{feedback}</p>
      )}
    </div>
  );
}

function StepObjetivo({
  onSelect,
  feedback,
  nome,
}: {
  onSelect: (o: string) => void;
  feedback: string | null;
  nome: string;
}) {
  const txt = t().quiz;

  const opcoes = [
    { valor: "criativo", emoji: "🎨", label: txt.objetivoCriativo },
    { valor: "sem_tela", emoji: "📵", label: txt.objetivoSemTela },
    { valor: "lembranca", emoji: "🎁", label: txt.objetivoLembranca },
    { valor: "aprendizado", emoji: "🏫", label: txt.objetivoAprendizado },
  ];

  return (
    <div className="text-center space-y-8">
      <h2 className="text-2xl font-bold text-gray-900">
        {txt.objetivoTitle(nome)}
      </h2>

      <div className="space-y-3">
        {opcoes.map((op) => (
          <button
            key={op.valor}
            onClick={() => onSelect(op.valor)}
            className="w-full flex items-center gap-4 p-4 rounded-2xl border-2 border-gray-200 hover:border-purple-400 hover:bg-purple-50 transition-all active:scale-[0.98] text-left"
          >
            <span className="text-3xl">{op.emoji}</span>
            <span className="font-medium text-gray-700 text-lg">{op.label}</span>
          </button>
        ))}
      </div>

      {feedback && (
        <p className="text-purple-600 font-medium animate-fade-in">{feedback}</p>
      )}
    </div>
  );
}
