import { ArrowLeft, Pencil, Plus, ChevronRight, User } from "lucide-react";
import { BottomNav } from "../components/BottomNav";
import { useNavigate } from "react-router";

export function Settings() {
  const navigate = useNavigate();

  const children = [
    { id: 1, name: "João", age: 5 },
    { id: 2, name: "Ana", age: 3 },
  ];

  const supportItems = [
    { icon: "💬", label: "Fale Conosco" },
    { icon: "⭐", label: "Avaliar o app" },
    { icon: "📄", label: "Termos e Privacidade" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-32">
      {/* Header */}
      <header className="flex items-center justify-center relative px-6 py-6 bg-white border-b">
        <button
          onClick={() => navigate("/")}
          className="absolute left-6 p-2 hover:bg-purple-50 rounded-full transition-colors"
        >
          <ArrowLeft className="w-6 h-6 text-purple-600" />
        </button>
        <h1 className="font-semibold text-gray-800">Configurações</h1>
      </header>

      {/* Main Content */}
      <main className="px-6 py-6 space-y-6">
        {/* User Info Card */}
        <div className="bg-white rounded-2xl shadow-md p-6 space-y-4">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-white text-2xl font-bold">C</span>
            </div>
            <div className="flex-1">
              <h2 className="font-semibold text-gray-800">Camila Oliveira</h2>
              <p className="text-sm text-gray-500">camila@email.com</p>
              <div className="mt-2 inline-flex items-center gap-1 bg-purple-100 text-purple-600 px-3 py-1 rounded-full text-xs font-medium">
                <span>✦</span>
                <span>Plano Semanal • Ativo</span>
              </div>
            </div>
          </div>
        </div>

        {/* Meus Filhos Section */}
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-gray-600 px-1">Meus Filhos</h3>
          <div className="bg-white rounded-xl shadow-md overflow-hidden divide-y divide-gray-100">
            {children.map((child) => (
              <button
                key={child.id}
                className="w-full px-5 py-4 flex items-center gap-4 hover:bg-purple-50 transition-colors"
              >
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <User className="w-5 h-5 text-purple-600" />
                </div>
                <div className="flex-1 text-left">
                  <span className="font-medium text-gray-800">
                    {child.name} • {child.age} anos
                  </span>
                </div>
                <Pencil className="w-4 h-4 text-gray-400 flex-shrink-0" />
              </button>
            ))}

            {/* Add Child Button */}
            <button className="w-full px-5 py-4 flex items-center gap-4 hover:bg-purple-50 transition-colors">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Plus className="w-5 h-5 text-purple-600" />
              </div>
              <div className="flex-1 text-left">
                <span className="font-medium text-purple-600">Adicionar filho</span>
              </div>
              <ChevronRight className="w-5 h-5 text-purple-600 flex-shrink-0" />
            </button>
          </div>
        </div>

        {/* Suporte Section */}
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-gray-600 px-1">Suporte</h3>
          <div className="bg-white rounded-xl shadow-md overflow-hidden divide-y divide-gray-100">
            {supportItems.map((item, index) => (
              <button
                key={index}
                className="w-full px-5 py-4 flex items-center gap-4 hover:bg-purple-50 transition-colors"
              >
                <span className="text-xl flex-shrink-0">{item.icon}</span>
                <div className="flex-1 text-left">
                  <span className="font-medium text-gray-800">{item.label}</span>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0" />
              </button>
            ))}
          </div>
        </div>

        {/* Footer Info */}
        <div className="pt-8 pb-4">
          <p className="text-center text-xs text-gray-400 leading-relaxed">
            Colory v1.0 • Para cancelar entre em contato com o suporte
          </p>
        </div>
      </main>

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
}
