"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { createClient } from "@/lib/supabase";
import { posthog } from "@/lib/posthog";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    posthog.capture("login_page_viewed");
  }, []);

  // Checar se já tem sessão ativa
  useEffect(() => {
    async function checkSession() {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (user) router.replace("/criar");
    }
    checkSession();
  }, [router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || loading) return;

    setLoading(true);
    setError("");

    try {
      // 1. Verificar se email tem assinatura ativa
      const checkRes = await fetch("/api/verificar-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });
      const checkData = await checkRes.json();

      if (!checkData.exists) {
        setError("Este email não tem uma assinatura ativa.");
        setLoading(false);
        return;
      }

      if (!checkData.active) {
        setError("Sua assinatura expirou. Renove para continuar.");
        setLoading(false);
        return;
      }

      // 2. Login direto — criar sessão via signInWithPassword com senha fixa interna
      // Como não temos senha, usar signInWithOtp + verificar automaticamente
      const supabase = createClient();

      // Usar admin endpoint pra criar sessão direto
      const res = await fetch("/api/login-direto", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });

      const data = await res.json();

      if (data.error) {
        setError(data.error);
        setLoading(false);
        return;
      }

      // Setar sessão no browser
      if (data.session) {
        await supabase.auth.setSession({
          access_token: data.session.access_token,
          refresh_token: data.session.refresh_token,
        });

        posthog.capture("login_success", { email: email.trim() });
        router.push("/criar");
      } else {
        setError("Erro ao criar sessão. Tente novamente.");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Erro ao entrar. Tente novamente.");
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

          <div className="text-center space-y-3">
            <Image
              src="/images/logo.png"
              alt="Colory"
              width={80}
              height={80}
              className="mx-auto rounded-2xl"
            />
            <h1 className="text-2xl font-bold text-gray-900">Acesse sua conta</h1>
            <p className="text-sm text-gray-500">Digite o email usado na compra</p>
          </div>

          <div className="space-y-5">
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

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center">
                <span className="bg-gradient-to-b from-purple-50 to-white px-4 text-sm text-gray-400">ou</span>
              </div>
            </div>

            <form onSubmit={handleLogin} className="space-y-3">
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1.5">Email de compra</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setError(""); }}
                  placeholder="email@usado-na-compra.com"
                  required
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none"
                />
              </div>
              {error && (
                <div className="bg-red-50 rounded-xl p-3 space-y-2">
                  <p className="text-sm text-red-600">{error}</p>
                  {error.includes("não tem") && (
                    <a href="/" className="text-sm text-purple-600 font-medium hover:underline block">
                      Assinar o Colory →
                    </a>
                  )}
                  {error.includes("expirou") && (
                    <a href="/" className="text-sm text-purple-600 font-medium hover:underline block">
                      Renovar assinatura →
                    </a>
                  )}
                </div>
              )}
              <button
                type="submit"
                disabled={loading || !email.trim()}
                className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-purple-300 text-white py-3.5 rounded-xl font-semibold transition-colors shadow-lg shadow-purple-200"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Entrando...
                  </span>
                ) : (
                  "Entrar"
                )}
              </button>
            </form>
          </div>

          <div className="text-center">
            <p className="text-xs text-gray-400">
              Ainda não tem conta?{" "}
              <a href="/" className="text-purple-600 font-medium hover:underline">
                Assine o Colory
              </a>
            </p>
          </div>

        </div>
      </div>
    </main>
  );
}
