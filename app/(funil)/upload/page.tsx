"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useFunilStore } from "@/store/funilStore";
import { posthog } from "@/lib/posthog";
import { t } from "@/lib/i18n";
import { compressImage } from "@/lib/compress";

export default function UploadPage() {
  const router = useRouter();
  const store = useFunilStore();
  const txt = t().upload;
  const fileRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [isCompressing, setIsCompressing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  useEffect(() => {
    if (!store.nome_filho) {
      router.replace("/quiz");
    }
  }, [store.nome_filho, router]);

  useEffect(() => {
    posthog.capture("upload_started");
  }, []);

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

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragOver(false);
      const f = e.dataTransfer.files?.[0];
      if (f) processFile(f);
    },
    [processFile]
  );

  const handleSubmit = async () => {
    if (!file || isSubmitting) return;
    setIsSubmitting(true);

    try {
      const base64 = await fileToBase64(file);
      store.setFotoOriginal(base64);

      // Disparar geração na Kie.ai em background
      const response = await fetch("/api/gerar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          image_base64: base64,
          nome_filho: store.nome_filho,
        }),
      });

      const data = await response.json();

      if (data.task_id) {
        store.setJobId(data.task_id);
      }

      posthog.capture("upload_completed");

      // Vai para processando — geração continua em background
      router.push("/processando");
    } catch (error) {
      console.error("Upload error:", error);
      setIsSubmitting(false);
    }
  };

  const nome = store.nome_filho || "seu filho";

  return (
    <main className="flex min-h-screen flex-col bg-white">
      <div className="w-full h-1.5 bg-purple-100">
        <div className="h-full bg-purple-600 rounded-r-full" style={{ width: "100%" }} />
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-6 py-10">
        <div className="w-full max-w-md space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-2xl font-bold text-gray-900">{txt.title(nome)}</h1>
            <p className="text-gray-500">{txt.subtitle}</p>
          </div>

          {!preview ? (
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setDragOver(true);
              }}
              onDragLeave={() => setDragOver(false)}
              onDrop={handleDrop}
              onClick={() => fileRef.current?.click()}
              className={`border-2 border-dashed rounded-2xl p-10 flex flex-col items-center gap-4 cursor-pointer transition-all ${
                dragOver
                  ? "border-purple-500 bg-purple-50"
                  : "border-gray-300 hover:border-purple-400 hover:bg-purple-50/30"
              }`}
            >
              <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center">
                <span className="text-3xl">📷</span>
              </div>

              {isCompressing ? (
                <p className="text-purple-600 font-medium">{txt.comprimindo}</p>
              ) : (
                <>
                  <p className="text-gray-600 font-medium">{txt.dragDrop}</p>
                  <p className="text-gray-400 text-sm">{txt.ou}</p>
                  <span className="bg-purple-600 text-white px-6 py-2.5 rounded-full font-medium text-sm">
                    {txt.selectButton}
                  </span>
                  <p className="text-xs text-gray-400">{txt.formatos}</p>
                </>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              <div className="relative aspect-square rounded-2xl overflow-hidden shadow-lg">
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
                className="w-full text-purple-600 font-medium py-2 text-sm"
              >
                {txt.trocar}
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

          {preview && (
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-purple-400 text-white py-4 rounded-full font-semibold text-lg transition-all active:scale-[0.98] shadow-lg shadow-purple-200"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  {txt.comprimindo}
                </span>
              ) : (
                txt.gerar
              )}
            </button>
          )}
        </div>
      </div>
    </main>
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
