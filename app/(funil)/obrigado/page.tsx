"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useFunilStore } from "@/store/funilStore";
import { posthog } from "@/lib/posthog";

export default function ObrigadoPage() {
  const store = useFunilStore();
  const nome = store.nome_filho || "seu filho";
  const otos = [...new Set(store.otos_aceitos)];
  const comprouLivro = otos.some((o) => o.includes("livro"));
  const comprouClube = otos.some((o) => o.includes("clube"));
  const [showPWA, setShowPWA] = useState(false);

  useEffect(() => {
    localStorage.removeItem("colory-oto-timer-start");
    try { posthog.capture("purchase_completed"); } catch {}
  }, []);

  const handleDownload = () => {
    if (!store.url_foto_gerada) return;
    if (store.url_foto_gerada.startsWith("data:")) {
      const link = document.createElement("a");
      link.href = store.url_foto_gerada;
      link.download = `colory-${nome.toLowerCase().replace(/\s+/g, "-")}.png`;
      link.click();
    } else {
      window.open(store.url_foto_gerada, "_blank");
    }
  };

  const handlePrint = () => {
    if (!store.url_foto_gerada) return;
    const old = document.getElementById("print-frame");
    if (old) old.remove();

    const iframe = document.createElement("iframe");
    iframe.id = "print-frame";
    iframe.style.cssText = "position:fixed;top:-10000px;left:-10000px;width:0;height:0";
    document.body.appendChild(iframe);

    const doc = iframe.contentDocument || iframe.contentWindow?.document;
    if (!doc) return;

    doc.open();
    doc.write(`<!DOCTYPE html><html><head><style>
      @page{size:A4 portrait;margin:10mm;margin-top:0;margin-bottom:0}
      *{margin:0;padding:0;box-sizing:border-box}
      body{display:flex;align-items:center;justify-content:center;min-height:100vh;background:white}
      img{max-width:100%;max-height:100vh;object-fit:contain}
    </style></head><body><img src="${store.url_foto_gerada}" /></body></html>`);
    doc.close();

    const img = doc.querySelector("img");
    if (img) {
      img.onload = () => iframe.contentWindow?.print();
      if (img.complete) iframe.contentWindow?.print();
    }
  };

  const nomesProdutos: Record<string, string> = {
    livro: "📖 Livro de História Personalizado",
    livro_downsell: "📖 Livro de História (1 un.)",
    clube: "🎨 Clube de Atividades (Anual)",
    clube_downsell: "🎨 Clube de Atividades (Semestral)",
  };

  return (
    <main className="flex min-h-screen flex-col bg-white">
      <div className="flex-1 flex flex-col items-center px-6 py-8">
        <div className="w-full max-w-md space-y-6">

          {/* 1. Celebração */}
          <div className="text-center space-y-2">
            <span className="text-6xl block">🎉</span>
            <h1 className="text-2xl font-bold text-gray-900">
              Pronto! A página do {nome} está liberada!
            </h1>
            <p className="text-gray-500 text-sm">
              Enviamos o link de acesso no seu email.
            </p>
          </div>

          {/* 2. Imagem gerada */}
          {store.url_foto_gerada && (
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-xl border-4 border-purple-100">
              <Image
                src={store.url_foto_gerada}
                alt={`Página de colorir do ${nome}`}
                fill
                className="object-contain bg-gray-50"
                sizes="(max-width: 768px) 90vw, 400px"
                unoptimized
              />
            </div>
          )}

          {/* 3. Botões Baixar + Imprimir */}
          {store.url_foto_gerada && (
            <div className="flex gap-3">
              <button
                onClick={handleDownload}
                className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-3.5 rounded-xl font-semibold transition-colors flex items-center justify-center gap-2 shadow-lg shadow-purple-200"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                  <path d="M10.75 2.75a.75.75 0 0 0-1.5 0v8.614L6.295 8.235a.75.75 0 1 0-1.09 1.03l4.25 4.5a.75.75 0 0 0 1.09 0l4.25-4.5a.75.75 0 0 0-1.09-1.03l-2.955 3.129V2.75Z" />
                  <path d="M3.5 12.75a.75.75 0 0 0-1.5 0v2.5A2.75 2.75 0 0 0 4.75 18h10.5A2.75 2.75 0 0 0 18 15.25v-2.5a.75.75 0 0 0-1.5 0v2.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-2.5Z" />
                </svg>
                Baixar
              </button>
              <button
                onClick={handlePrint}
                className="flex-1 bg-white border-2 border-purple-600 text-purple-600 py-3.5 rounded-xl font-semibold transition-colors flex items-center justify-center gap-2 hover:bg-purple-50"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                  <path fillRule="evenodd" d="M5 2.75C5 1.784 5.784 1 6.75 1h6.5c.966 0 1.75.784 1.75 1.75v3.552c.377.338.75.753.75 1.448v4.5A2.75 2.75 0 0 1 13 15.25v.25H7v-.25A2.75 2.75 0 0 1 4.25 12.5V8.75c0-.695.373-1.11.75-1.448V2.75ZM7 4h6V2.75a.25.25 0 0 0-.25-.25h-5.5a.25.25 0 0 0-.25.25V4Zm-1 4v1.5h8V8H6Zm1 5.75V12h6v1.75A1.25 1.25 0 0 1 11.75 15h-3.5A1.25 1.25 0 0 1 7 13.75Z" clipRule="evenodd" />
                </svg>
                Imprimir
              </button>
            </div>
          )}

          {/* 4. Resumo da compra */}
          {otos.length > 0 && (
            <div className="bg-gray-50 rounded-2xl p-5 space-y-3">
              <h3 className="font-semibold text-gray-900 text-sm">Resumo da sua compra</h3>
              <div className="space-y-2">
                {otos.map((oto) => (
                  <div key={oto} className="flex items-center gap-2 text-sm text-gray-700">
                    <span className="text-green-500">✓</span>
                    {nomesProdutos[oto] || oto}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 5. Seus produtos — dinâmico */}
          <div className="bg-purple-50 rounded-2xl p-5 space-y-3">
            <h3 className="font-semibold text-purple-900 text-sm">📬 O que vai chegar no seu email</h3>
            <div className="space-y-2.5">
              <div className="flex items-start gap-2.5">
                <span className="text-lg mt-0.5">📧</span>
                <p className="text-sm text-purple-800">Link de acesso ao app Colory — crie páginas de colorir ilimitadas</p>
              </div>
              {comprouLivro && (
                <div className="flex items-start gap-2.5">
                  <span className="text-lg mt-0.5">📖</span>
                  <p className="text-sm text-purple-800">Link pra personalizar o livro de história do {nome} — chega em poucos minutos</p>
                </div>
              )}
              {comprouClube && (
                <div className="flex items-start gap-2.5">
                  <span className="text-lg mt-0.5">🎨</span>
                  <p className="text-sm text-purple-800">Acesso ao Clube de Atividades — enviado por email em poucos minutos</p>
                </div>
              )}
            </div>
          </div>

          {/* 6. Próximos passos */}
          <div className="space-y-3">
            <h3 className="font-semibold text-gray-900 text-sm">Próximos passos</h3>
            <div className="space-y-2">
              {[
                { emoji: "✅", text: "Pagamento confirmado", done: true },
                { emoji: "📧", text: "Abra seu email e clique no link de acesso", done: false },
                { emoji: "📱", text: "Instale o Colory na tela inicial", done: false, action: true },
                { emoji: "🎨", text: "Crie sua primeira página de colorir!", done: false },
              ].map((step, i) => (
                <div key={i} className="flex items-center gap-3">
                  <span className={`text-lg ${step.done ? "" : "opacity-60"}`}>{step.emoji}</span>
                  <p className={`text-sm flex-1 ${step.done ? "text-gray-400 line-through" : "text-gray-700"}`}>
                    {step.text}
                  </p>
                  {step.action && (
                    <button
                      onClick={() => setShowPWA(!showPWA)}
                      className="text-xs text-purple-600 font-medium"
                    >
                      {showPWA ? "Fechar" : "Como?"}
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* 7. Guia PWA expansível */}
          {showPWA && (
            <div className="bg-gray-50 rounded-2xl p-5 space-y-4 animate-fade-in">
              <h4 className="font-semibold text-gray-800 text-sm">Instalar na tela inicial</h4>

              <div className="space-y-3">
                <div className="space-y-1.5">
                  <p className="text-xs font-bold text-gray-600 uppercase">iPhone (Safari)</p>
                  <div className="text-sm text-gray-700 space-y-1">
                    <p>1. Abra o Colory no <strong>Safari</strong></p>
                    <p>2. Toque no botão <strong>Compartilhar</strong> (⬆️)</p>
                    <p>3. Role e toque em <strong>"Adicionar à Tela de Início"</strong></p>
                    <p>4. Toque <strong>"Adicionar"</strong></p>
                  </div>
                </div>

                <div className="border-t border-gray-200" />

                <div className="space-y-1.5">
                  <p className="text-xs font-bold text-gray-600 uppercase">Android (Chrome)</p>
                  <div className="text-sm text-gray-700 space-y-1">
                    <p>1. Abra o Colory no <strong>Chrome</strong></p>
                    <p>2. Toque no menu <strong>⋮</strong> (3 pontinhos)</p>
                    <p>3. Toque em <strong>"Instalar aplicativo"</strong></p>
                    <p>4. Confirme tocando <strong>"Instalar"</strong></p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 8. CTA principal */}
          <a
            href="/criar"
            className="block w-full bg-purple-600 hover:bg-purple-700 text-white py-4 rounded-xl font-semibold text-lg text-center transition-all shadow-lg shadow-purple-200 active:scale-[0.98]"
          >
            Acessar meu app Colory
          </a>

        </div>
      </div>
    </main>
  );
}
