"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { posthog } from "@/lib/posthog";
import { createClient } from "@/lib/supabase";
import { compressImage } from "@/lib/compress";
import { t, getLocale } from "@/lib/i18n";

interface Filho {
  id: string;
  nome: string;
  genero: string | null;
  idade: string | null;
}

export default function CriarPage() {
  const router = useRouter();
  const txt = t().app;
  const fileRef = useRef<HTMLInputElement>(null);
  const [filhos, setFilhos] = useState<Filho[]>([]);
  const [preview, setPreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [selectedStyle, setSelectedStyle] = useState("simple");
  const [isCompressing, setIsCompressing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [creditos, setCreditos] = useState<number | null>(null);
  const [planoExpirado, setPlanoExpirado] = useState(false);

  const filhoNome = filhos.length > 0 ? filhos[0].nome : t().landing.seuFilho;

  useEffect(() => {
    async function loadFilhos() {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data: userData } = await supabase
        .from("usuarios")
        .select("id")
        .eq("email", user.email)
        .single();

      if (!userData) return;

      const { data } = await supabase
        .from("filhos")
        .select("*")
        .eq("usuario_id", userData.id)
        .order("criado_em", { ascending: true });

      if (data && data.length > 0) setFilhos(data);
    }
    loadFilhos();
  }, []);

  useEffect(() => {
    async function loadCreditos() {
      try {
        const res = await fetch("/api/creditos");
        if (res.ok) {
          const data = await res.json();
          setCreditos(data.creditos_restantes);
          if (data.expirado) setPlanoExpirado(true);
        }
      } catch {
        // Not authenticated or error
      }
    }
    loadCreditos();
    posthog.capture("app_criar_viewed");
  }, []);

  const semCreditos = creditos !== null && creditos <= 0;

  const processFile = useCallback(async (f: File) => {
    if (!f.type.startsWith("image/")) return;
    setIsCompressing(true);
    try {
      const compressed = await compressImage(f, 1200, 2 * 1024 * 1024);
      setFile(compressed);
      const reader = new FileReader();
      reader.onload = (e) => setPreview(e.target?.result as string);
      reader.readAsDataURL(compressed);
    } finally {
      setIsCompressing(false);
    }
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) processFile(f);
  };

  const handleGenerate = async () => {
    if (!file || isSubmitting) return;
    setIsSubmitting(true);

    try {
      const base64 = await fileToBase64(file);
      sessionStorage.setItem("app_foto_base64", base64);
      sessionStorage.setItem("app_estilo", selectedStyle);
      if (filhos.length > 0) {
        sessionStorage.setItem("app_filho_nome", filhos[0].nome);
        sessionStorage.setItem("app_filho_id", filhos[0].id);
      }
      posthog.capture("app_generate_started", { estilo: selectedStyle });
      router.push("/gerando");
    } catch (error) {
      console.error("Submit error:", error);
      setIsSubmitting(false);
    }
  };

  const isIntl = getLocale() !== "pt-BR";

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-2">
          <Image src="/images/logo.png" alt="Colory" width={36} height={36} className="rounded-lg" />
          <span className="text-xl font-bold text-purple-600">Colory</span>
        </div>
        <div className="flex items-center gap-2">
          {creditos !== null && (
            <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
              creditos <= 3 ? "bg-red-100 text-red-600" : "bg-purple-100 text-purple-600"
            }`}>
              {creditos} {txt.criarRestantes}
            </span>
          )}
        <button
          onClick={() => router.push("/configuracoes")}
          className="p-2 hover:bg-purple-50 rounded-full transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6 text-purple-600">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
          </svg>
        </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-6 space-y-5">
        {/* Upload Card */}
        <div className="bg-white rounded-2xl shadow-lg p-6 space-y-4">
          {!preview ? (
            <>
              <div
                onClick={() => fileRef.current?.click()}
                className="border-2 border-dashed border-purple-300 rounded-xl p-8 flex items-center justify-center bg-purple-50/30 cursor-pointer hover:border-purple-400 transition-colors"
              >
                <div className="text-center">
                  <Image src="/images/logo.png" alt="Colory" width={80} height={80} className="mx-auto mb-1" />
                </div>
              </div>

              <div className="space-y-3">
                <p className="text-center text-gray-700">
                  {txt.criarTransformar(filhoNome)}
                </p>
                <button
                  onClick={() => fileRef.current?.click()}
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3.5 rounded-xl font-medium transition-colors shadow-md"
                >
                  {isCompressing ? txt.criarOtimizando : txt.criarAdicionarFoto}
                </button>
              </div>
            </>
          ) : (
            <div className="space-y-3">
              <div className="relative aspect-square rounded-xl overflow-hidden">
                <Image
                  src={preview}
                  alt="Preview"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 90vw, 400px"
                />
              </div>
              <button
                onClick={() => {
                  setPreview(null);
                  setFile(null);
                  fileRef.current?.click();
                }}
                className="w-full text-purple-600 font-medium py-2 text-sm hover:underline"
              >
                {txt.criarTrocarFoto}
              </button>
            </div>
          )}
          <input
            ref={fileRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            className="hidden"
            onChange={handleFileChange}
          />
        </div>

        {/* Style Selection */}
        <div className="space-y-3">
          <h2 className="font-semibold text-gray-800">{txt.criarSelecionarEstilo}</h2>

          <div className="flex gap-3 overflow-x-auto pb-2 -mx-6 px-6 scrollbar-hide">
            {txt.criarEstilos.map((style) => {
              const isSelected = selectedStyle === style.id;
              return (
                <button
                  key={style.id}
                  onClick={() => setSelectedStyle(style.id)}
                  className={`flex-shrink-0 w-24 transition-all ${
                    isSelected ? "ring-2 ring-purple-600 ring-offset-2 rounded-xl" : ""
                  }`}
                >
                  <div className="bg-white rounded-xl shadow-md overflow-hidden">
                    <div className="aspect-square bg-gray-100 relative">
                      <Image
                        src={`/images/styles/${style.id}.${style.id === "ink" ? "png" : "jpg"}`}
                        alt={style.name}
                        fill
                        className="object-cover"
                        sizes="96px"
                      />
                    </div>
                    <div className="p-1.5">
                      <p className="text-[11px] text-gray-700 leading-tight text-center line-clamp-2">
                        {style.name}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Plano expirado */}
        {planoExpirado && (
          <div className="bg-red-50 rounded-2xl p-5 text-center space-y-3">
            <span className="text-3xl block">⏰</span>
            <p className="text-sm font-bold text-gray-800">{txt.criarPlanoExpirou}</p>
            <p className="text-xs text-gray-500">{txt.criarRenovarDesc}</p>
            <a
              href="/"
              className="inline-block bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl font-medium text-sm transition-colors shadow-lg"
            >
              {txt.criarRenovar}
            </a>
          </div>
        )}

        {/* Sem créditos */}
        {!planoExpirado && semCreditos ? (
          <div className="bg-red-50 rounded-2xl p-5 text-center space-y-3">
            <p className="text-sm font-bold text-gray-800">{txt.criarSemCreditos}</p>
            <p className="text-xs text-gray-500">{txt.criarSemCreditosDesc}</p>
            <a
              href={isIntl ? (process.env.NEXT_PUBLIC_CHECKOUT_LINK_CREDITOS_INTL || "#") : (process.env.NEXT_PUBLIC_PERFECTPAY_LINK_CREDITOS || "https://perfectpay.com")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl font-medium text-sm transition-colors shadow-lg"
            >
              {txt.criarComprarCreditos}
            </a>
          </div>
        ) : !planoExpirado ? (
          <button
            onClick={handleGenerate}
            disabled={!preview || isSubmitting}
            className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-purple-300 text-white py-4 rounded-xl font-medium text-lg transition-colors shadow-lg"
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center gap-2">
                <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                {txt.criarPreparando}
              </span>
            ) : (
              txt.criarGerarPagina
            )}
          </button>
        ) : null}
      </main>
    </div>
  );
}

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
