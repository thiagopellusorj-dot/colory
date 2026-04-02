"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase";

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
}

export default function ConfiguracoesPage() {
  const router = useRouter();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [userEmail, setUserEmail] = useState("");
  const [filhos, setFilhos] = useState<Filho[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [novoNome, setNovoNome] = useState("");
  const [novoGenero, setNovoGenero] = useState("menino");
  const [novaIdade, setNovaIdade] = useState("");
  const [saving, setSaving] = useState(false);

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
        <h1 className="font-semibold text-gray-800">Configurações</h1>
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
                    ? `Plano ${userData.plano.charAt(0).toUpperCase() + userData.plano.slice(1)}`
                    : "Sem plano"
                  }
                  {userData?.status === "ativo" && " \u2022 Ativo"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Meus Filhos */}
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-gray-600 px-1">Meus Filhos</h3>
          <div className="bg-white rounded-xl shadow-md overflow-hidden divide-y divide-gray-100">
            {filhos.map((filho) => (
              <div
                key={filho.id}
                className="px-5 py-4 flex items-center gap-4"
              >
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

            {/* Add Child Button */}
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
                <span className="font-medium text-purple-600">Adicionar filho</span>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-purple-600">
                <path fillRule="evenodd" d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>

        {/* Add Child Form (overlay) */}
        {showAddForm && (
          <div className="bg-white rounded-xl shadow-md p-5 space-y-4">
            <h3 className="font-semibold text-gray-800">Novo filho</h3>
            <div>
              <label className="text-xs font-semibold text-gray-500 mb-1 block">Nome</label>
              <input
                type="text"
                value={novoNome}
                onChange={(e) => setNovoNome(e.target.value)}
                placeholder="Nome do filho"
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none"
                autoFocus
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-500 mb-1 block">Gênero</label>
              <div className="flex gap-2">
                <button
                  onClick={() => setNovoGenero("menino")}
                  className={`flex-1 py-2 rounded-xl text-sm font-medium transition-all ${
                    novoGenero === "menino" ? "bg-purple-600 text-white" : "bg-gray-100 text-gray-600"
                  }`}
                >
                  👦 Menino
                </button>
                <button
                  onClick={() => setNovoGenero("menina")}
                  className={`flex-1 py-2 rounded-xl text-sm font-medium transition-all ${
                    novoGenero === "menina" ? "bg-purple-600 text-white" : "bg-gray-100 text-gray-600"
                  }`}
                >
                  👧 Menina
                </button>
              </div>
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-500 mb-1 block">Idade</label>
              <select
                value={novaIdade}
                onChange={(e) => setNovaIdade(e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none bg-white"
              >
                <option value="">Selecionar...</option>
                <option value="0-2 anos">0-2 anos</option>
                <option value="3-5 anos">3-5 anos</option>
                <option value="6-8 anos">6-8 anos</option>
                <option value="9-12 anos">9-12 anos</option>
              </select>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => { setShowAddForm(false); setNovoNome(""); }}
                className="flex-1 py-2.5 rounded-xl text-sm font-medium text-gray-600 bg-gray-100"
              >
                Cancelar
              </button>
              <button
                onClick={handleAddFilho}
                disabled={!novoNome.trim() || saving}
                className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-white bg-purple-600 hover:bg-purple-700 disabled:bg-purple-400 transition-all"
              >
                {saving ? "Salvando..." : "Salvar"}
              </button>
            </div>
          </div>
        )}

        {/* Suporte */}
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-gray-600 px-1">Suporte</h3>
          <div className="bg-white rounded-xl shadow-md overflow-hidden divide-y divide-gray-100">
            {[
              { icon: "💬", label: "Fale Conosco" },
              { icon: "⭐", label: "Avaliar o app" },
              { icon: "📄", label: "Termos e Privacidade" },
            ].map((item, i) => (
              <button
                key={i}
                className="w-full px-5 py-4 flex items-center gap-4 hover:bg-purple-50 transition-colors"
              >
                <span className="text-xl flex-shrink-0">{item.icon}</span>
                <div className="flex-1 text-left">
                  <span className="font-medium text-gray-800">{item.label}</span>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-gray-400">
                  <path fillRule="evenodd" d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                </svg>
              </button>
            ))}
          </div>
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="w-full text-red-500 font-medium py-3 text-sm"
        >
          Sair da conta
        </button>

        {/* Footer */}
        <div className="pt-4 pb-4">
          <p className="text-center text-xs text-gray-400 leading-relaxed">
            Colory v1.0 &bull; Para cancelar entre em contato com o suporte
          </p>
        </div>
      </main>
    </div>
  );
}
