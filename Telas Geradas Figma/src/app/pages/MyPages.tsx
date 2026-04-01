import { Filter, Download, Plus, Lock } from "lucide-react";
import { BottomNav } from "../components/BottomNav";
import { useNavigate } from "react-router";

export function MyPages() {
  const navigate = useNavigate();

  const creations = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1658786335126-6e00866428ae?w=400",
      name: "João",
      style: "Estilo Simples",
      date: "28 mar",
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1612094264491-73d6c8758510?w=400",
      name: "João",
      style: "Detalhado",
      date: "25 mar",
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1658786335126-6e00866428ae?w=400",
      name: "Ana",
      style: "Simples",
      date: "20 mar",
    },
  ];

  return (
    <div className="min-h-screen bg-[#F5F3FF] pb-32">
      {/* Header */}
      <header className="px-6 py-6 bg-white border-b">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-800">Minhas Páginas</h1>
          <button className="p-2 hover:bg-purple-50 rounded-full transition-colors">
            <Filter className="w-6 h-6 text-purple-600" />
          </button>
        </div>

        {/* Filter Pills */}
        <div className="flex gap-2 overflow-x-auto mt-4 pb-2 scrollbar-hide">
          <button className="px-4 py-2 bg-purple-600 text-white rounded-full text-sm font-medium whitespace-nowrap shadow-md">
            Todas
          </button>
          <button className="px-4 py-2 bg-white text-gray-600 rounded-full text-sm font-medium whitespace-nowrap border border-gray-200 hover:border-purple-300 transition-colors">
            João
          </button>
          <button className="px-4 py-2 bg-white text-gray-600 rounded-full text-sm font-medium whitespace-nowrap border border-gray-200 hover:border-purple-300 transition-colors">
            Ana
          </button>
          <button className="px-4 py-2 bg-white text-purple-600 rounded-full text-sm font-medium whitespace-nowrap border border-purple-300 hover:bg-purple-50 transition-colors">
            + Adicionar
          </button>
        </div>
      </header>

      {/* Grid of Creations */}
      <main className="px-6 py-6">
        <div className="grid grid-cols-2 gap-4">
          {creations.map((creation) => (
            <div key={creation.id} className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="aspect-[3/4] bg-gray-100 relative group">
                <img
                  src={creation.image}
                  alt={`Página de ${creation.name}`}
                  className="w-full h-full object-cover"
                />
                <button className="absolute bottom-2 right-2 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity">
                  <Download className="w-4 h-4 text-purple-600" />
                </button>
              </div>
              <div className="p-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-800">
                      {creation.name} • {creation.style}
                    </p>
                  </div>
                  <p className="text-xs text-gray-500">{creation.date}</p>
                </div>
              </div>
            </div>
          ))}

          {/* Clube de Atividades - Locked Card */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden border-2 border-purple-300 relative">
            <div className="aspect-[3/4] bg-gradient-to-br from-purple-100 to-purple-50 relative flex items-center justify-center">
              <div className="absolute inset-0 backdrop-blur-sm bg-white/30"></div>
              <div className="relative text-center space-y-3 p-6 z-10">
                <div className="bg-purple-600 rounded-full p-4 w-16 h-16 flex items-center justify-center mx-auto shadow-lg">
                  <Lock className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-bold text-gray-800">Clube de Atividades</h3>
                <p className="text-sm text-gray-600 leading-snug">
                  52 semanas de atividades para imprimir
                </p>
                <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-full text-sm font-medium shadow-md transition-colors">
                  Ver oferta
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Floating Add Button */}
      <button
        onClick={() => navigate("/")}
        className="fixed bottom-28 right-6 bg-purple-600 hover:bg-purple-700 text-white p-4 rounded-full shadow-xl transition-all hover:scale-110"
      >
        <Plus className="w-6 h-6" />
      </button>

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
}
