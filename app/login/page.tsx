"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { createClient } from "@/lib/supabase";
import { posthog } from "@/lib/posthog";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    posthog.capture("login_page_viewed");
  }, []);

  const handleMagicLink = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || loading) return;

    setLoading(true);
    setError("");

    try {
      const supabase = createClient();
      const { error: authError } = await supabase.auth.signInWithOtp({
        email: email.trim(),
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (authError) throw authError;
      posthog.capture("login_magic_link_sent");
      setSent(true);
    } catch (err) {
      setError("Erro ao enviar link. Verifique o email e tente novamente.");
      console.error("Magic link error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    try {
      posthog.capture("login_google_clicked");
      const supabase = createClient();
      await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });
    } catch (err) {
      console.error("Google login error:", err);
      setError("Erro ao conectar com Google. Tente novamente.");
    }
  };

  return (
    <main className="flex min-h-screen flex-col bg-gradient-to-b from-purple-50 to-white">
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-10">
        <div className="w-full max-w-sm space-y-8">

          {/* Logo */}
          <div className="text-center space-y-3">
            <Image
              src="/images/logo.png"
              alt="Colory"
              width={80}
              height={80}
              className="mx-auto rounded-2xl"
            />
            <h1 className="text-2xl font-bold text-gray-900">Acesse sua conta</h1>
            <p className="text-sm text-gray-500">Entre pra criar páginas de colorir personalizadas</p>
          </div>

          {sent ? (
            /* Sucesso — link enviado */
            <div className="text-center space-y-4 bg-green-50 rounded-2xl p-6">
              <span className="text-5xl block">📧</span>
              <h2 className="text-lg font-bold text-gray-900">Link enviado!</h2>
              <p className="text-sm text-gray-600">
                Enviamos um link de acesso para <strong>{email}</strong>. Abra seu email e clique no link pra entrar.
              </p>
              <p className="text-xs text-gray-400">Não recebeu? Verifique a pasta de spam.</p>
              <button
                onClick={() => { setSent(false); setEmail(""); }}
                className="text-sm text-purple-600 font-medium hover:underline"
              >
                Enviar novamente
              </button>
            </div>
          ) : (
            <div className="space-y-5">
              {/* Google */}
              <button
                onClick={handleGoogle}
                className="w-full bg-white border-2 border-gray-200 hover:border-gray-300 text-gray-700 py-3.5 rounded-xl font-medium transition-colors flex items-center justify-center gap-3 shadow-sm"
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                </svg>
                Entrar com Google
              </button>

              {/* Divisor */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200" />
                </div>
                <div className="relative flex justify-center">
                  <span className="bg-gradient-to-b from-purple-50 to-white px-4 text-sm text-gray-400">ou</span>
                </div>
              </div>

              {/* Magic Link */}
              <form onSubmit={handleMagicLink} className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-1.5">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="seu@email.com"
                    required
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none"
                  />
                </div>
                {error && (
                  <p className="text-sm text-red-500">{error}</p>
                )}
                <button
                  type="submit"
                  disabled={loading || !email.trim()}
                  className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-purple-300 text-white py-3.5 rounded-xl font-semibold transition-colors shadow-lg shadow-purple-200"
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Enviando...
                    </span>
                  ) : (
                    "Enviar link de acesso"
                  )}
                </button>
              </form>
            </div>
          )}

          {/* Rodapé */}
          <div className="text-center">
            <p className="text-xs text-gray-400">
              Ainda não tem conta?{" "}
              <a href="/assinar" className="text-purple-600 font-medium hover:underline">
                Assine o Colory
              </a>
            </p>
          </div>

        </div>
      </div>
    </main>
  );
}
