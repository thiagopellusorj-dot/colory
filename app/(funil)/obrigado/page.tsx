"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useFunilStore } from "@/store/funilStore";
import { posthog } from "@/lib/posthog";
import { t } from "@/lib/i18n";

export default function ObrigadoPage() {
  const router = useRouter();
  const store = useFunilStore();
  const txt = t().obrigado;
  const nome = store.nome_filho || "seu filho";

  useEffect(() => {
    // Limpar timer dos OTOs
    localStorage.removeItem("colory-oto-timer-start");
    posthog.capture("purchase_completed");
  }, []);

  // Guard
  useEffect(() => {
    if (!store.nome_filho) {
      router.replace("/");
    }
  }, [store.nome_filho, router]);

  const handleDownload = () => {
    if (!store.url_foto_gerada) return;

    // Se for base64, criar link de download
    if (store.url_foto_gerada.startsWith("data:")) {
      const link = document.createElement("a");
      link.href = store.url_foto_gerada;
      link.download = `colory-${nome}.png`;
      link.click();
    } else {
      // URL do Supabase — abrir em nova aba
      window.open(store.url_foto_gerada, "_blank");
    }
  };

  return (
    <main className="flex min-h-screen flex-col bg-white">
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-10">
        <div className="w-full max-w-md space-y-6">
          {/* Confetti emoji */}
          <div className="text-center">
            <span className="text-6xl">🎉</span>
          </div>

          {/* Titulo */}
          <div className="text-center space-y-2">
            <h1 className="text-2xl font-bold text-gray-900">
              {txt.titulo(nome)}
            </h1>
            <p className="text-gray-500">{txt.subtitulo}</p>
          </div>

          {/* Imagem gerada */}
          {store.url_foto_gerada && (
            <div className="relative aspect-square rounded-2xl overflow-hidden shadow-xl border-4 border-purple-100">
              <Image
                src={store.url_foto_gerada}
                alt={`Página de colorir do ${nome}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 90vw, 400px"
                unoptimized
              />
            </div>
          )}

          {/* Botão download */}
          <button
            onClick={handleDownload}
            className="w-full bg-purple-600 hover:bg-purple-700 active:scale-[0.98] text-white py-4 rounded-full font-semibold text-lg transition-all shadow-lg shadow-purple-200 flex items-center justify-center gap-2"
          >
            <span>⬇</span> {txt.baixar}
          </button>

          {/* Resumo da compra */}
          {store.otos_aceitos.length > 0 && (
            <div className="bg-gray-50 rounded-2xl p-5 space-y-3">
              <h3 className="font-semibold text-gray-900">
                {txt.resumoTitulo}
              </h3>

              <div className="space-y-2">
                {store.otos_aceitos.map((oto) => (
                  <div
                    key={oto}
                    className="flex items-center gap-2 text-sm text-gray-700"
                  >
                    <span className="text-green-500">✓</span>
                    {txt.nomesProdutos[oto] || oto}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Acesso ao app */}
          <div className="bg-purple-50 rounded-2xl p-5 text-center">
            <p className="text-sm text-purple-700">{txt.acessoApp}</p>
          </div>
        </div>
      </div>
    </main>
  );
}
