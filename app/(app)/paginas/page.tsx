"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { createClient } from "@/lib/supabase";
import { useCompras } from "@/lib/useCompras";
import { posthog } from "@/lib/posthog";
import { t, getLocale } from "@/lib/i18n";

interface Imagem {
  id: string;
  url_original: string | null;
  url_gerada: string;
  estilo: string | null;
  criado_em: string;
  filho_id: string | null;
}

interface Filho {
  id: string;
  nome: string;
  genero: string | null;
}

export default function PaginasPage() {
  const router = useRouter();
  const txt = t().app;
  const [imagens, setImagens] = useState<Imagem[]>([]);
  const [filhos, setFilhos] = useState<Filho[]>([]);
  const [filtroFilho, setFiltroFilho] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const { comprouLivro, comprouClube } = useCompras();

  const isIntl = getLocale() !== "pt-BR";
  const LIVRO_LINK = "https://meu-livro-magico-umber.vercel.app/lp";
  const CLUBE_LINK_VENDA = isIntl
    ? (process.env.NEXT_PUBLIC_CHECKOUT_LINK_OTO3_INTL || "#")
    : (process.env.NEXT_PUBLIC_PERFECTPAY_LINK_OTO3_UPSELL || "https://perfectpay.com");

  useEffect(() => {
    async function loadData() {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();

      if (user) {
        const { data: userData } = await supabase
          .from("usuarios")
          .select("id")
          .eq("email", user.email)
          .single();

        if (userData) {
          const [imagensRes, filhosRes] = await Promise.all([
            supabase
              .from("imagens")
              .select("*")
              .eq("usuario_id", userData.id)
              .order("criado_em", { ascending: false }),
            supabase
              .from("filhos")
              .select("id, nome, genero")
              .eq("usuario_id", userData.id)
              .order("criado_em", { ascending: true }),
          ]);

          if (imagensRes.data) setImagens(imagensRes.data);
          if (filhosRes.data) setFilhos(filhosRes.data);
        }
      } else {
        const { data } = await supabase
          .from("imagens")
          .select("*")
          .is("usuario_id", null)
          .order("criado_em", { ascending: false });

        if (data) setImagens(data);
      }

      setLoading(false);
    }
    loadData();
    posthog.capture("app_paginas_viewed");
  }, []);

  const imagensFiltradas = filtroFilho
    ? imagens.filter((img) => img.filho_id === filtroFilho)
    : imagens;

  const formatDate = (dateStr: string) => {
    const locale = getLocale() === "pt-BR" ? "pt-BR" : getLocale() === "fr" ? "fr-FR" : getLocale() === "es" ? "es-ES" : getLocale() === "it" ? "it-IT" : "en-US";
    const d = new Date(dateStr);
    return d.toLocaleDateString(locale, { day: "numeric", month: "short" });
  };

  const getFilhoNome = (filhoId: string | null) => {
    if (!filhoId) return "";
    return filhos.find((f) => f.id === filhoId)?.nome || "";
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="w-8 h-8 border-2 border-purple-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F3FF]">
      {/* Header */}
      <header className="px-6 py-4 bg-white border-b">
        <div className="flex items-center gap-2 mb-3">
          <Image src="/images/logo.png" alt="Colory" width={32} height={32} className="rounded-lg" />
          <h1 className="text-xl font-bold text-purple-600">{txt.paginasHeader}</h1>
        </div>

        {/* Filter Pills */}
        <div className="flex gap-2 overflow-x-auto mt-4 pb-2 scrollbar-hide">
          <button
            onClick={() => setFiltroFilho(null)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
              filtroFilho === null
                ? "bg-purple-600 text-white shadow-md"
                : "bg-white text-gray-600 border border-gray-200 hover:border-purple-300"
            }`}
          >
            {txt.paginasTodas}
          </button>
          {filhos.map((filho) => (
            <button
              key={filho.id}
              onClick={() => setFiltroFilho(filho.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                filtroFilho === filho.id
                  ? "bg-purple-600 text-white shadow-md"
                  : "bg-white text-gray-600 border border-gray-200 hover:border-purple-300"
              }`}
            >
              {filho.nome}
            </button>
          ))}
          <button
            onClick={() => router.push("/configuracoes")}
            className="px-4 py-2 bg-white text-purple-600 rounded-full text-sm font-medium whitespace-nowrap border border-purple-300 hover:bg-purple-50 transition-colors"
          >
            {txt.paginasAdicionar}
          </button>
        </div>
      </header>

      {/* Content */}
      <main className="px-6 py-6">
        {imagens.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-20 h-20 rounded-full bg-purple-100 flex items-center justify-center mb-4">
              <span className="text-4xl">🎨</span>
            </div>
            <h2 className="text-lg font-bold text-gray-900 mb-2">{txt.paginasVazia}</h2>
            <button
              onClick={() => router.push("/criar")}
              className="mt-4 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-full font-semibold text-sm transition-all shadow-md"
            >
              {txt.paginasVaziaCta}
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Upsell cards — sempre no topo */}
            <div className="grid grid-cols-2 gap-4">
              {/* Livro de História */}
              <a
                href={LIVRO_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className={`bg-white rounded-xl shadow-md overflow-hidden relative block ${comprouLivro ? "border-2 border-green-300" : "border-2 border-purple-300"}`}
              >
                <div className={`aspect-[3/4] relative flex items-center justify-center ${comprouLivro ? "bg-gradient-to-br from-green-50 to-emerald-50" : "bg-gradient-to-br from-amber-50 to-orange-50"}`}>
                  <div className="relative text-center space-y-2 p-5 z-10">
                    <span className="text-5xl block">📖</span>
                    <h3 className="font-bold text-gray-800 text-sm">{txt.paginasLivroHistoria}</h3>
                    <p className="text-[11px] text-gray-600 leading-snug">
                      {comprouLivro ? txt.paginasLivroAcessar : txt.paginasLivroDesc}
                    </p>
                    <span className={`inline-block px-4 py-2 rounded-full text-xs font-medium shadow-md ${comprouLivro ? "bg-green-600 text-white" : "bg-purple-600 text-white"}`}>
                      {comprouLivro ? txt.paginasAcessar : txt.paginasDesbloquear}
                    </span>
                  </div>
                </div>
              </a>

              {/* Clube de Atividades */}
              <a
                href={comprouClube ? "#" : CLUBE_LINK_VENDA}
                target={comprouClube ? undefined : "_blank"}
                rel={comprouClube ? undefined : "noopener noreferrer"}
                className={`bg-white rounded-xl shadow-md overflow-hidden relative block ${comprouClube ? "border-2 border-green-300" : "border-2 border-purple-300"}`}
              >
                <div className={`aspect-[3/4] relative flex items-center justify-center ${comprouClube ? "bg-gradient-to-br from-green-50 to-emerald-50" : "bg-gradient-to-br from-purple-100 to-purple-50"}`}>
                  <div className="relative text-center space-y-2 p-5 z-10">
                    <span className="text-5xl block">🎨</span>
                    <h3 className="font-bold text-gray-800 text-sm">{txt.paginasClubeAtividades}</h3>
                    <p className="text-[11px] text-gray-600 leading-snug">
                      {comprouClube ? txt.paginasClubeAcessar : txt.paginasClubeDesc}
                    </p>
                    <span className={`inline-block px-4 py-2 rounded-full text-xs font-medium shadow-md ${comprouClube ? "bg-green-600 text-white" : "bg-purple-600 text-white"}`}>
                      {comprouClube ? txt.paginasAcessar : txt.paginasDesbloquear}
                    </span>
                  </div>
                </div>
              </a>
            </div>

            {/* Páginas geradas */}
            <div className="grid grid-cols-2 gap-4">
              {imagensFiltradas.map((img) => (
                <button
                  key={img.id}
                  onClick={() => {
                    sessionStorage.setItem("app_foto_gerada", img.url_gerada);
                    if (img.url_original) sessionStorage.setItem("app_foto_original_url", img.url_original);
                    const filho = filhos.find((f) => f.id === img.filho_id);
                    if (filho) sessionStorage.setItem("app_filho_nome", filho.nome);
                    router.push("/resultado");
                  }}
                  className="bg-white rounded-xl shadow-md overflow-hidden group"
                >
                  <div className="aspect-[3/4] bg-gray-100 relative">
                    <Image
                      src={img.url_gerada}
                      alt="Coloring page"
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 45vw, 200px"
                    />
                    <div className="absolute bottom-2 right-2 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-purple-600">
                        <path d="M10.75 2.75a.75.75 0 0 0-1.5 0v8.614L6.295 8.235a.75.75 0 1 0-1.09 1.03l4.25 4.5a.75.75 0 0 0 1.09 0l4.25-4.5a.75.75 0 0 0-1.09-1.03l-2.955 3.129V2.75Z" />
                        <path d="M3.5 12.75a.75.75 0 0 0-1.5 0v2.5A2.75 2.75 0 0 0 4.75 18h10.5A2.75 2.75 0 0 0 18 15.25v-2.5a.75.75 0 0 0-1.5 0v2.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-2.5Z" />
                      </svg>
                    </div>
                  </div>
                  <div className="p-3">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-gray-800 truncate">
                        {getFilhoNome(img.filho_id)}
                        {img.estilo && ` \u2022 ${img.estilo}`}
                      </p>
                      <p className="text-xs text-gray-500 flex-shrink-0 ml-1">{formatDate(img.criado_em)}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* FAB */}
      {imagens.length > 0 && (
        <button
          onClick={() => router.push("/criar")}
          className="fixed bottom-28 right-6 bg-purple-600 hover:bg-purple-700 text-white p-4 rounded-full shadow-xl transition-all hover:scale-110 z-40"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-6 h-6">
            <path d="M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z" />
          </svg>
        </button>
      )}
    </div>
  );
}
