"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useFunilStore } from "@/store/funilStore";
import { posthog } from "@/lib/posthog";
import { t } from "@/lib/i18n";

export default function PreviewPage() {
  const router = useRouter();
  const store = useFunilStore();
  const txt = t().resultado;
  const nome = store.nome_filho || "seu filho";

  // Guard: sem imagem gerada → volta pro upload
  useEffect(() => {
    if (!store.url_foto_gerada) {
      router.replace("/upload");
    }
  }, [store.url_foto_gerada, router]);

  const handleBaixar = () => {
    posthog.capture("resultado_download_clicked");
    router.push("/assinar");
  };

  if (!store.url_foto_gerada) return null;

  return (
    <main className="flex min-h-screen flex-col bg-white">
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-10">
        <div className="w-full max-w-md space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-2xl font-bold text-gray-900">{txt.title(nome)}</h1>
            <p className="text-gray-500">{txt.subtitle}</p>
          </div>

          {/* Imagem gerada */}
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

          {/* Botão "Baixar" fake → vai para paywall */}
          <button
            onClick={handleBaixar}
            className="w-full bg-purple-600 hover:bg-purple-700 active:scale-[0.98] text-white py-4 rounded-full font-semibold text-lg transition-all shadow-lg shadow-purple-200 flex items-center justify-center gap-2"
          >
            <span>⬇</span> {txt.baixar}
          </button>
        </div>
      </div>
    </main>
  );
}
