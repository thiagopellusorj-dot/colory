"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useFunilStore } from "@/store/funilStore";
import { posthog } from "@/lib/posthog";
import { trackMeta } from "@/lib/tracking";
import { t } from "@/lib/i18n";

export default function ContatoPage() {
  const router = useRouter();
  const store = useFunilStore();
  const txt = t().contato;
  const [whatsapp, setWhatsapp] = useState("");
  const [email, setEmail] = useState("");
  const [lgpd, setLgpd] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Guard
  useEffect(() => {
    if (!store.nome_filho) {
      router.replace("/quiz");
    }
  }, [store.nome_filho, router]);

  const formatWhatsapp = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 11);
    if (digits.length <= 2) return digits;
    if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
  };

  const isValid = whatsapp.replace(/\D/g, "").length >= 10 && email.includes("@") && lgpd;

  const handleSubmit = async () => {
    if (!isValid || isSubmitting) return;
    setIsSubmitting(true);

    const cleanWhatsapp = whatsapp.replace(/\D/g, "");

    try {
      // Salvar lead no Supabase via API
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "save_lead",
          nome_filho: store.nome_filho,
          genero: store.genero,
          idade: store.idade,
          objetivo: store.objetivo,
          whatsapp: cleanWhatsapp,
          email,
        }),
      });

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }

      const data = await res.json();

      store.setLead({
        lead_id: data.lead_id || "",
        whatsapp: cleanWhatsapp,
        email,
      });

      posthog.capture("contato_submitted", { whatsapp: cleanWhatsapp, email });

      // Meta Pixel: Lead — só após sucesso confirmado do fetch
      trackMeta("Lead");

      // Vai para resultado — imagem pode já estar pronta
      router.push("/preview");
    } catch (error) {
      console.error("Erro ao salvar lead:", error);
      setIsSubmitting(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col bg-white">
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-10">
        <div className="w-full max-w-md space-y-6">
          <div className="text-center space-y-2">
            <div className="w-14 h-14 mx-auto rounded-full bg-purple-100 flex items-center justify-center">
              <span className="text-2xl">📱</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900">{txt.title}</h1>
            <p className="text-gray-500">{txt.subtitle}</p>
          </div>

          <div className="space-y-4">
            {/* WhatsApp */}
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-700">
                {txt.whatsappLabel}
              </label>
              <input
                type="tel"
                value={whatsapp}
                onChange={(e) => setWhatsapp(formatWhatsapp(e.target.value))}
                placeholder={txt.whatsappPlaceholder}
                className="w-full py-3.5 px-4 rounded-xl border-2 border-gray-200 focus:border-purple-400 focus:ring-4 focus:ring-purple-100 outline-none transition-all text-lg"
              />
            </div>

            {/* Email */}
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-700">
                {txt.emailLabel}
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={txt.emailPlaceholder}
                className="w-full py-3.5 px-4 rounded-xl border-2 border-gray-200 focus:border-purple-400 focus:ring-4 focus:ring-purple-100 outline-none transition-all text-lg"
              />
            </div>

            {/* LGPD */}
            <div className="space-y-1">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={lgpd}
                  onChange={(e) => setLgpd(e.target.checked)}
                  className="mt-0.5 w-5 h-5 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                />
                <span className="text-sm text-gray-600">
                  {txt.lgpdTermos} <a href="#" className="text-purple-600 underline">{txt.lgpdTermosLink}</a> {txt.lgpdE} <a href="#" className="text-purple-600 underline">{txt.lgpdPrivacidadeLink}</a>
                </span>
              </label>
              {!lgpd && (whatsapp || email) && (
                <p className="text-xs text-amber-600 ml-8">{txt.lgpdAviso}</p>
              )}
            </div>
          </div>

          <button
            onClick={handleSubmit}
            disabled={!isValid || isSubmitting}
            className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white py-4 rounded-full font-semibold text-lg transition-all active:scale-[0.98] shadow-lg shadow-purple-200"
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center gap-2">
                <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              </span>
            ) : (
              txt.continuar
            )}
          </button>
        </div>
      </div>
    </main>
  );
}
