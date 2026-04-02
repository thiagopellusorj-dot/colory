"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useCompras } from "@/lib/useCompras";

const LIVRO_LINK_VENDA = process.env.NEXT_PUBLIC_PERFECTPAY_LINK_OTO1_UPSELL || "https://perfectpay.com";
const LIVRO_LINK_ACESSO = "https://meu-livro-magico-umber.vercel.app/personalizar";
const CLUBE_LINK_VENDA = process.env.NEXT_PUBLIC_PERFECTPAY_LINK_OTO3_UPSELL || "https://perfectpay.com";

export default function ResultadoPage() {
  const router = useRouter();
  const [fotoGerada, setFotoGerada] = useState<string | null>(null);
  const [fotoOriginal, setFotoOriginal] = useState<string | null>(null);
  const [filhoNome, setFilhoNome] = useState("seu filho");
  const [showingOriginal, setShowingOriginal] = useState(false);
  const { comprouLivro, comprouClube } = useCompras();

  useEffect(() => {
    const foto = sessionStorage.getItem("app_foto_gerada");
    const nome = sessionStorage.getItem("app_filho_nome");
    if (!foto) {
      router.replace("/criar");
      return;
    }
    setFotoGerada(foto);
    // Prefer URL over base64 for the original photo
    setFotoOriginal(
      sessionStorage.getItem("app_foto_original_url") ||
      sessionStorage.getItem("app_foto_base64") ||
      null
    );
    if (nome) setFilhoNome(nome);
  }, [router]);

  const handleDownload = async () => {
    if (!fotoGerada) return;
    try {
      const response = await fetch(fotoGerada);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `colory-${filhoNome.toLowerCase().replace(/\s+/g, "-")}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch {
      window.open(fotoGerada, "_blank");
    }
  };

  const handleShare = async () => {
    if (!fotoGerada || !navigator.share) return;
    try {
      const response = await fetch(fotoGerada);
      const blob = await response.blob();
      const file = new File([blob], "colory.png", { type: "image/png" });
      await navigator.share({
        title: `Página de colorir do ${filhoNome}`,
        text: "Olha que legal! Criei uma página de colorir personalizada no Colory!",
        files: [file],
      });
    } catch {
      // User cancelled
    }
  };

  const handlePrint = () => {
    if (!fotoGerada) return;

    // Remove iframe anterior se existir
    const old = document.getElementById("print-frame");
    if (old) old.remove();

    const iframe = document.createElement("iframe");
    iframe.id = "print-frame";
    iframe.style.position = "fixed";
    iframe.style.top = "-10000px";
    iframe.style.left = "-10000px";
    iframe.style.width = "0";
    iframe.style.height = "0";
    document.body.appendChild(iframe);

    const doc = iframe.contentDocument || iframe.contentWindow?.document;
    if (!doc) return;

    doc.open();
    doc.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Colory - Página de Colorir</title>
        <style>
          @page { size: A4 portrait; margin: 10mm; margin-top: 0; margin-bottom: 0; }
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { display: flex; align-items: center; justify-content: center; min-height: 100vh; background: white; }
          img { max-width: 100%; max-height: 100vh; object-fit: contain; }
        </style>
      </head>
      <body>
        <img src="${fotoGerada}" />
      </body>
      </html>
    `);
    doc.close();

    // Esperar imagem carregar, depois imprimir
    const img = doc.querySelector("img");
    if (img) {
      img.onload = () => {
        iframe.contentWindow?.print();
      };
      // Se já carregou (cache)
      if (img.complete) {
        iframe.contentWindow?.print();
      }
    }
  };

  if (!fotoGerada) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="w-8 h-8 border-2 border-purple-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-6 border-b">
        <button
          onClick={() => router.push("/criar")}
          className="p-2 hover:bg-purple-50 rounded-full transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6 text-purple-600">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
          </svg>
        </button>
        <h1 className="font-semibold text-gray-800">Resultado do {filhoNome}</h1>
        <button
          onClick={handleShare}
          className="p-2 hover:bg-purple-50 rounded-full transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6 text-purple-600">
            <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z" />
          </svg>
        </button>
      </header>

      {/* Main Content */}
      <main className="px-6 py-6 space-y-6">
        {/* Generated Image with Compare */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden relative">
          <div className="relative aspect-[3/4]">
            <Image
              src={showingOriginal && fotoOriginal ? fotoOriginal : fotoGerada}
              alt={showingOriginal ? "Foto original" : "Página de colorir gerada"}
              fill
              className="object-contain bg-gray-50 transition-opacity duration-200"
              sizes="(max-width: 768px) 90vw, 400px"
            />
            {/* Watermark */}
            {!showingOriginal && (
              <div className="absolute bottom-2 right-3 text-[10px] text-gray-300 font-medium select-none pointer-events-none">
                colory.app
              </div>
            )}
            {/* Label antes/depois */}
            <div className="absolute top-3 left-3 bg-black/50 backdrop-blur-sm text-white text-xs font-medium px-3 py-1.5 rounded-full">
              {showingOriginal ? "📷 Foto original" : "🎨 Página de colorir"}
            </div>
          </div>

          {/* Botão comparar */}
          {fotoOriginal && (
            <button
              onMouseDown={() => setShowingOriginal(true)}
              onMouseUp={() => setShowingOriginal(false)}
              onMouseLeave={() => setShowingOriginal(false)}
              onTouchStart={() => setShowingOriginal(true)}
              onTouchEnd={() => setShowingOriginal(false)}
              className="absolute bottom-3 left-3 bg-black/50 backdrop-blur-sm text-white text-xs font-medium px-3 py-2 rounded-full flex items-center gap-1.5 select-none active:bg-black/70 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                <path d="M10 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
                <path fillRule="evenodd" d="M.664 10.59a1.651 1.651 0 0 1 0-1.186A10.004 10.004 0 0 1 10 3c4.257 0 7.893 2.66 9.336 6.41.147.381.146.804 0 1.186A10.004 10.004 0 0 1 10 17c-4.257 0-7.893-2.66-9.336-6.41ZM14 10a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z" clipRule="evenodd" />
              </svg>
              Segurar para comparar
            </button>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <button
            onClick={handleDownload}
            className="flex-1 bg-white border-2 border-purple-600 text-purple-600 py-3 rounded-xl font-medium hover:bg-purple-50 transition-colors flex items-center justify-center gap-1.5 text-sm"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
              <path d="M10.75 2.75a.75.75 0 0 0-1.5 0v8.614L6.295 8.235a.75.75 0 1 0-1.09 1.03l4.25 4.5a.75.75 0 0 0 1.09 0l4.25-4.5a.75.75 0 0 0-1.09-1.03l-2.955 3.129V2.75Z" />
              <path d="M3.5 12.75a.75.75 0 0 0-1.5 0v2.5A2.75 2.75 0 0 0 4.75 18h10.5A2.75 2.75 0 0 0 18 15.25v-2.5a.75.75 0 0 0-1.5 0v2.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-2.5Z" />
            </svg>
            Baixar
          </button>
          <button
            onClick={handlePrint}
            className="flex-1 bg-white border-2 border-purple-600 text-purple-600 py-3 rounded-xl font-medium hover:bg-purple-50 transition-colors flex items-center justify-center gap-1.5 text-sm"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
              <path fillRule="evenodd" d="M5 2.75C5 1.784 5.784 1 6.75 1h6.5c.966 0 1.75.784 1.75 1.75v3.552c.377.338.75.753.75 1.448v4.5A2.75 2.75 0 0 1 13 15.25v.25H7v-.25A2.75 2.75 0 0 1 4.25 12.5V8.75c0-.695.373-1.11.75-1.448V2.75ZM7 4h6V2.75a.25.25 0 0 0-.25-.25h-5.5a.25.25 0 0 0-.25.25V4Zm-1 4v1.5h8V8H6Zm1 5.75V12h6v1.75A1.25 1.25 0 0 1 11.75 15h-3.5A1.25 1.25 0 0 1 7 13.75Z" clipRule="evenodd" />
            </svg>
            Imprimir
          </button>
          <button
            onClick={handleShare}
            className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-xl font-medium transition-colors flex items-center justify-center gap-1.5 shadow-md text-sm"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
              <path d="M13 4.5a2.5 2.5 0 1 1 .702 1.737L6.97 9.604a2.518 2.518 0 0 1 0 .799l6.733 3.366a2.5 2.5 0 1 1-.671 1.341l-6.733-3.366a2.5 2.5 0 1 1 0-3.482l6.733-3.366A2.52 2.52 0 0 1 13 4.5Z" />
            </svg>
            Compartilhar
          </button>
        </div>

        {/* Divider "Criar mais" */}
        <div className="relative py-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative flex justify-center">
            <span className="bg-white px-4 text-sm text-gray-500">Criar mais</span>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="space-y-4">
          {/* Gerar de novo */}
          <button
            onClick={() => {
              sessionStorage.removeItem("app_foto_base64");
              sessionStorage.removeItem("app_foto_gerada");
              router.push("/criar");
            }}
            className="w-full bg-white rounded-xl shadow-md p-4 flex items-center gap-4 hover:shadow-lg transition-shadow border border-gray-100"
          >
            <div className="w-16 h-16 bg-purple-100 rounded-lg overflow-hidden flex-shrink-0 flex items-center justify-center">
              <span className="text-3xl">🎨</span>
            </div>
            <div className="flex-1 text-left">
              <h3 className="font-semibold text-gray-800">Gerar de novo</h3>
              <p className="text-sm text-gray-500">Tente um estilo diferente</p>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-6 h-6 text-purple-600">
              <path fillRule="evenodd" d="M3 10a.75.75 0 0 1 .75-.75h10.638L10.23 5.29a.75.75 0 1 1 1.04-1.08l5.5 5.25a.75.75 0 0 1 0 1.08l-5.5 5.25a.75.75 0 1 1-1.04-1.08l4.158-3.96H3.75A.75.75 0 0 1 3 10Z" clipRule="evenodd" />
            </svg>
          </button>

          {/* Livro de História */}
          <a
            href={comprouLivro ? LIVRO_LINK_ACESSO : LIVRO_LINK_VENDA}
            target="_blank"
            rel="noopener noreferrer"
            className={`relative bg-white rounded-xl shadow-md p-4 flex items-center gap-4 ${
              comprouLivro ? "border border-green-300" : "border-2 border-purple-300"
            }`}
          >
            <div className={`relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 ${comprouLivro ? "bg-green-100" : "bg-purple-100"}`}>
              <div className="text-4xl flex items-center justify-center h-full">📖</div>
            </div>
            <div className="flex-1 text-left">
              <h3 className="font-semibold text-gray-800">
                Livro de História do {filhoNome}
              </h3>
              <p className="text-sm text-gray-600">
                {comprouLivro ? "Personalize seu livro agora" : `O ${filhoNome} como herói da história \u2022 R$67`}
              </p>
            </div>
            <span className={`px-4 py-2 rounded-full text-sm font-medium shadow-md ${
              comprouLivro
                ? "bg-green-600 text-white"
                : "bg-purple-600 text-white animate-pulse"
            }`}>
              {comprouLivro ? "Acessar" : "Desbloquear"}
            </span>
          </a>

          {/* Clube de Atividades */}
          <a
            href={comprouClube ? "#" : CLUBE_LINK_VENDA}
            target={comprouClube ? undefined : "_blank"}
            rel={comprouClube ? undefined : "noopener noreferrer"}
            className={`w-full bg-white rounded-xl shadow-md p-4 flex items-center gap-4 ${
              comprouClube ? "border border-green-300" : "border border-gray-200"
            } hover:shadow-lg transition-shadow`}
          >
            <div className={`relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 ${comprouClube ? "bg-green-100" : "bg-purple-100"}`}>
              <div className="text-4xl flex items-center justify-center h-full">🎨</div>
            </div>
            <div className="flex-1 text-left">
              <h3 className="font-semibold text-gray-800">Clube de Atividades</h3>
              <p className="text-sm text-gray-600">{comprouClube ? "Acesso liberado! Verifique seu email" : "52 semanas de atividades \u2022 R$97"}</p>
            </div>
            <span className={`px-4 py-2 rounded-full text-sm font-medium shadow-md ${
              comprouClube ? "bg-green-600 text-white" : "bg-purple-600 text-white"
            }`}>
              {comprouClube ? "Acessar" : "Desbloquear"}
            </span>
          </a>
        </div>
      </main>
    </div>
  );
}
