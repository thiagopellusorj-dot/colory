"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { t } from "@/lib/i18n";

export default function GerandoAppPage() {
  const router = useRouter();
  const txt = t().app;
  const txtProc = t().processando;
  const [progress, setProgress] = useState(0);
  const [fatoIndex, setFatoIndex] = useState(0);
  const [fotoOriginal, setFotoOriginal] = useState<string | null>(null);
  const [erro, setErro] = useState(false);
  const [nome, setNome] = useState("seu filho");
  const [estilo, setEstilo] = useState("simple");
  const hasStarted = useRef(false);
  const progressRef = useRef(0);

  useEffect(() => {
    const foto = sessionStorage.getItem("app_foto_base64");
    if (!foto) {
      router.replace("/criar");
      return;
    }
    setFotoOriginal(foto);
    setNome(sessionStorage.getItem("app_filho_nome") || "seu filho");
    setEstilo(sessionStorage.getItem("app_estilo") || "simple");
  }, [router]);

  useEffect(() => {
    if (!fotoOriginal) return;
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) {
          clearInterval(interval);
          return prev;
        }
        const increment = prev < 60 ? 2 : prev < 80 ? 0.5 : 0.2;
        const next = Math.min(prev + increment, 90);
        progressRef.current = next;
        return next;
      });
    }, 100);
    return () => clearInterval(interval);
  }, [fotoOriginal]);

  useEffect(() => {
    if (!fotoOriginal) return;
    const interval = setInterval(() => {
      setFatoIndex((prev) => (prev + 1) % txt.gerandoFatos.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [fotoOriginal, txt.gerandoFatos.length]);

  useEffect(() => {
    if (hasStarted.current || !fotoOriginal) return;
    hasStarted.current = true;

    async function gerarImagem() {
      try {
        const filhoId = sessionStorage.getItem("app_filho_id") || "";

        const response = await fetch("/api/gerar", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            image_base64: fotoOriginal,
            estilo,
            filho_id: filhoId,
            source: "app",
          }),
        });

        if (!response.ok) {
          const errData = await response.json().catch(() => ({}));
          throw new Error(errData.details || errData.error || `HTTP ${response.status}`);
        }

        const data = await response.json();

        if (data.url) {
          sessionStorage.setItem("app_foto_gerada", data.url);
          if (data.url_original) {
            sessionStorage.setItem("app_foto_original_url", data.url_original);
          }
          setProgress(100);
          setTimeout(() => router.push("/resultado"), 500);
        } else {
          throw new Error(data.error || "No URL in response");
        }
      } catch (error) {
        console.error("Erro ao gerar:", error);
        setErro(true);
      }
    }

    gerarImagem();
  }, [fotoOriginal, estilo, router]);

  if (erro) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white flex flex-col items-center justify-center px-6">
        <div className="text-center space-y-6 max-w-md">
          <div className="w-16 h-16 mx-auto rounded-full bg-red-100 flex items-center justify-center">
            <span className="text-3xl">😕</span>
          </div>
          <h2 className="text-xl font-bold text-gray-900">{txtProc.erro}</h2>
          <button
            onClick={() => {
              setErro(false);
              setProgress(0);
              hasStarted.current = false;
            }}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white py-4 rounded-xl font-semibold text-lg transition-all"
          >
            {txtProc.tentarNovamente}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 via-purple-50/50 to-white flex flex-col items-center justify-center px-6">
      <div className="w-full max-w-md space-y-8">
        {fotoOriginal && (
          <div className="relative">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="relative aspect-square">
                <Image
                  src={fotoOriginal}
                  alt="Photo"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 90vw, 400px"
                />
              </div>
            </div>
            <div className="absolute top-4 left-4 bg-purple-600 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg flex items-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                <path d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401Z" />
              </svg>
              {txt.gerandoEstilos[estilo] || estilo}
            </div>
          </div>
        )}

        <div className="text-center space-y-4">
          <div className="text-7xl font-bold text-purple-600">
            {Math.round(progress)}%
          </div>
          <div className="w-full bg-purple-100 rounded-full h-3 overflow-hidden">
            <div
              className="bg-purple-600 h-full rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-gray-500">
            {txt.gerandoTexto(nome)}
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-lg p-6 space-y-4">
          <div className="flex items-start gap-4">
            <div className="bg-purple-600 rounded-xl p-2 flex-shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-6 h-6 text-white">
                <path d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401Z" />
              </svg>
            </div>
            <div className="flex-1">
              <p className="text-gray-600 text-sm leading-relaxed animate-fade-in" key={fatoIndex}>
                {txt.gerandoFatos[fatoIndex]} {txt.gerandoVaiAdorar(nome)}
              </p>
            </div>
          </div>

          <div className="flex items-center justify-center gap-2 pt-2">
            {txt.gerandoFatos.map((_: string, i: number) => (
              <div
                key={i}
                className={`w-2 h-2 rounded-full transition-colors ${
                  i === fatoIndex ? "bg-purple-600" : "bg-purple-200"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
