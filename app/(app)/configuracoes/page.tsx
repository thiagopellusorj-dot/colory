"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase";
import { posthog } from "@/lib/posthog";
import { t, getLocale, setLocale, locales, type Locale } from "@/lib/i18n";

interface Filho {
  id: string;
  nome: string;
  genero: string | null;
  idade: string | null;
}

interface UserData {
  id: string;
  email: string;
  plano: string | null;
  status: string | null;
  creditos_restantes: number | null;
  creditos_renovam_em: string | null;
}

export default function ConfiguracoesPage() {
  const router = useRouter();
  const txt = t().app;
  const [userData, setUserData] = useState<UserData | null>(null);
  const [userEmail, setUserEmail] = useState("");
  const [filhos, setFilhos] = useState<Filho[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [novoNome, setNovoNome] = useState("");
  const [novoGenero, setNovoGenero] = useState("menino");
  const [novaIdade, setNovaIdade] = useState("");
  const [saving, setSaving] = useState(false);
  const [creditos, setCreditos] = useState<number | null>(null);
  const [creditosRenovaEm, setCreditosRenovaEm] = useState<string | null>(null);
  const [currentLang, setCurrentLang] = useState<Locale>(getLocale());

  useEffect(() => {
    async function loadData() {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setLoading(false);
        return;
      }
      setUserEmail(user.email || "");

      const { data: usuario } = await supabase
        .from("usuarios")
        .select("*")
        .eq("email", user.email)
        .single();

      if (usuario) {
        setUserData(usuario);
        setCreditos(usuario.creditos_restantes ?? 15);
        setCreditosRenovaEm(usuario.creditos_renovam_em);
        const { data } = await supabase
          .from("filhos")
          .select("*")
          .eq("usuario_id", usuario.id)
          .order("criado_em", { ascending: true });
        if (data) setFilhos(data);
      }
      setLoading(false);
    }
    loadData();
    posthog.capture("app_configuracoes_viewed");
  }, []);

  const handleAddFilho = async () => {
    if (!novoNome.trim() || !userData?.id || saving) return;
    setSaving(true);
    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("filhos")
        .insert({
          usuario_id: userData.id,
          nome: novoNome.trim(),
          genero: novoGenero,
          idade: novaIdade || null,
        })
        .select()
        .single();

      if (error) throw error;
      if (data) {
        setFilhos((prev) => [...prev, data]);
        setNovoNome("");
        setNovoGenero("menino");
        setNovaIdade("");
        setShowAddForm(false);
      }
    } catch (error) {
      console.error("Erro ao adicionar filho:", error);
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.replace("/");
  };

  const initial = userEmail ? userEmail[0].toUpperCase() : "C";

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="w-8 h-8 border-2 border-purple-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="flex items-center justify-center relative px-6 py-6 bg-white border-b">
        <button
          onClick={() => router.push("/criar")}
          className="absolute left-6 p-2 hover:bg-purple-50 rounded-full transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6 text-purple-600">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
          </svg>
        </button>
        <h1 className="font-semibold text-gray-800">{txt.configHeader}</h1>
      </header>

      {/* Main Content */}
      <main className="px-6 py-6 space-y-6">
        {/* User Info Card */}
        <div className="bg-white rounded-2xl shadow-md p-6 space-y-4">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-white text-2xl font-bold">{initial}</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-gray-500 truncate">{userEmail}</p>
              <div className="mt-2 inline-flex items-center gap-1 bg-purple-100 text-purple-600 px-3 py-1 rounded-full text-xs font-medium">
                <span>✦</span>
                <span>
                  {userData?.plano
                    ? `${txt.configPlanoLabel} ${userData.plano.charAt(0).toUpperCase() + userData.plano.slice(1)}`
                    : txt.configSemPlano
                  }
                  {userData?.status === "ativo" && ` \u2022 ${txt.configAtivo}`}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Créditos */}
        {creditos !== null && (
          <div className="bg-white rounded-2xl shadow-md p-5 space-y-4">
            <h3 className="text-sm font-semibold text-gray-600">{txt.configCreditos}</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-gray-900">{creditos}</span>
                <span className="text-xs text-gray-400">{txt.configCreditosDe}</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2.5">
                <div
                  className={`h-full rounded-full transition-all ${
                    creditos <= 3 ? "bg-red-500" : creditos <= 8 ? "bg-amber-500" : "bg-purple-600"
                  }`}
                  style={{ width: `${Math.min((creditos / 15) * 100, 100)}%` }}
                />
              </div>
              {creditosRenovaEm && (
                <p className="text-xs text-gray-400">
                  {txt.configCreditosRenova(Math.max(0, Math.ceil((new Date(creditosRenovaEm).getTime() - Date.now()) / (1000 * 60 * 60 * 24))))}
                </p>
              )}
            </div>
            <a
              href={process.env.NEXT_PUBLIC_PERFECTPAY_LINK_CREDITOS || "https://perfectpay.com"}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-xl font-semibold text-sm text-center transition-colors shadow-md"
            >
              {txt.configComprarCreditos}
            </a>
          </div>
        )}

        {/* Idioma */}
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-gray-600 px-1">{txt.configIdiomaLabel}</h3>
          <div className="bg-white rounded-xl shadow-md p-4">
            <div className="flex flex-wrap gap-2">
              {locales.map((loc) => (
                <button
                  key={loc.code}
                  onClick={() => {
                    setLocale(loc.code);
                    setCurrentLang(loc.code);
                    posthog.capture("language_changed", { locale: loc.code });
                    window.location.reload();
                  }}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    currentLang === loc.code
                      ? "bg-purple-600 text-white shadow-md"
                      : "bg-gray-100 text-gray-600 hover:bg-purple-50"
                  }`}
                >
                  <span>{loc.flag}</span>
                  <span>{loc.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Meus Filhos */}
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-gray-600 px-1">{txt.configMeusFilhos}</h3>
          <div className="bg-white rounded-xl shadow-md overflow-hidden divide-y divide-gray-100">
            {filhos.map((filho) => (
              <div key={filho.id} className="px-5 py-4 flex items-center gap-4">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-lg">{filho.genero === "menino" ? "👦" : "👧"}</span>
                </div>
                <div className="flex-1 text-left">
                  <span className="font-medium text-gray-800">
                    {filho.nome}
                    {filho.idade && ` \u2022 ${filho.idade}`}
                  </span>
                </div>
              </div>
            ))}

            <button
              onClick={() => setShowAddForm(true)}
              className="w-full px-5 py-4 flex items-center gap-4 hover:bg-purple-50 transition-colors"
            >
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-purple-600">
                  <path d="M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z" />
                </svg>
              </div>
              <div className="flex-1 text-left">
                <span className="font-medium text-purple-600">{txt.configAdicionarFilho}</span>
              </div>
            </button>
          </div>
        </div>

        {/* Add Child Form */}
        {showAddForm && (
          <div className="bg-white rounded-xl shadow-md p-5 space-y-4">
            <h3 className="font-semibold text-gray-800">{txt.configNovoFilho}</h3>
            <div>
              <label className="text-xs font-semibold text-gray-500 mb-1 block">{txt.configNome}</label>
              <input
                type="text"
                value={novoNome}
                onChange={(e) => setNovoNome(e.target.value)}
                placeholder={txt.configNomePlaceholder}
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none"
                autoFocus
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-500 mb-1 block">{txt.configGenero}</label>
              <div className="flex gap-2">
                <button
                  onClick={() => setNovoGenero("menino")}
                  className={`flex-1 py-2 rounded-xl text-sm font-medium transition-all ${
                    novoGenero === "menino" ? "bg-purple-600 text-white" : "bg-gray-100 text-gray-600"
                  }`}
                >
                  👦 {t().quiz.menino}
                </button>
                <button
                  onClick={() => setNovoGenero("menina")}
                  className={`flex-1 py-2 rounded-xl text-sm font-medium transition-all ${
                    novoGenero === "menina" ? "bg-purple-600 text-white" : "bg-gray-100 text-gray-600"
                  }`}
                >
                  👧 {t().quiz.menina}
                </button>
              </div>
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-500 mb-1 block">{txt.configIdade}</label>
              <select
                value={novaIdade}
                onChange={(e) => setNovaIdade(e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none bg-white"
              >
                <option value="">{txt.configSelectIdade}</option>
                {txt.configIdadeOptions.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => { setShowAddForm(false); setNovoNome(""); }}
                className="flex-1 py-2.5 rounded-xl text-sm font-medium text-gray-600 bg-gray-100"
              >
                {txt.configCancelar}
              </button>
              <button
                onClick={handleAddFilho}
                disabled={!novoNome.trim() || saving}
                className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-white bg-purple-600 hover:bg-purple-700 disabled:bg-purple-400 transition-all"
              >
                {saving ? txt.configSalvando : txt.configSalvar}
              </button>
            </div>
          </div>
        )}

        {/* Suporte */}
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-gray-600 px-1">{txt.configSuporte}</h3>
          <div className="bg-white rounded-xl shadow-md overflow-hidden divide-y divide-gray-100">
            {[
              { icon: "💬", label: txt.configSuporteItems[0] },
              { icon: "⭐", label: txt.configSuporteItems[1] },
              { icon: "📄", label: txt.configSuporteItems[2] },
            ].map((item, i) => (
              <button
                key={i}
                className="w-full px-5 py-4 flex items-center gap-4 hover:bg-purple-50 transition-colors"
              >
                <span className="text-xl flex-shrink-0">{item.icon}</span>
                <div className="flex-1 text-left">
                  <span className="font-medium text-gray-800">{item.label}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="w-full text-red-500 font-medium py-3 text-sm"
        >
          {txt.configLogout}
        </button>

        {/* Footer */}
        <div className="pt-4 pb-4">
          <p className="text-center text-xs text-gray-400 leading-relaxed">
            Colory v1.0 &bull; {txt.configFooter}
          </p>
        </div>
      </main>
    </div>
  );
}
