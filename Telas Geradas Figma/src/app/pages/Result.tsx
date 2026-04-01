import { ArrowLeft, Share2, Download, ArrowRight, Lock } from "lucide-react";
import { BottomNav } from "../components/BottomNav";
import { useNavigate } from "react-router";

export function Result() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white pb-32">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-6 border-b">
        <button
          onClick={() => navigate("/")}
          className="p-2 hover:bg-purple-50 rounded-full transition-colors"
        >
          <ArrowLeft className="w-6 h-6 text-purple-600" />
        </button>
        <h1 className="font-semibold text-gray-800">Resultado do João</h1>
        <button className="p-2 hover:bg-purple-50 rounded-full transition-colors">
          <Share2 className="w-6 h-6 text-purple-600" />
        </button>
      </header>

      {/* Main Content */}
      <main className="px-6 py-6 space-y-6">
        {/* Generated Coloring Page */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1658786335126-6e00866428ae?w=800"
            alt="Página de colorir gerada"
            className="w-full aspect-[3/4] object-cover"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button className="flex-1 bg-white border-2 border-purple-600 text-purple-600 py-3 rounded-xl font-medium hover:bg-purple-50 transition-colors flex items-center justify-center gap-2">
            <Download className="w-5 h-5" />
            Baixar
          </button>
          <button className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-xl font-medium transition-colors flex items-center justify-center gap-2 shadow-md">
            <Share2 className="w-5 h-5" />
            Compartilhar
          </button>
        </div>

        {/* Divider */}
        <div className="relative py-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative flex justify-center">
            <span className="bg-white px-4 text-sm text-gray-500">Criar mais</span>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="space-y-4">
          {/* Gerar de novo - Available */}
          <button className="w-full bg-white rounded-xl shadow-md p-4 flex items-center gap-4 hover:shadow-lg transition-shadow border border-gray-100">
            <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
              <img
                src="https://images.unsplash.com/photo-1612094264491-73d6c8758510?w=200"
                alt="Outro estilo"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 text-left">
              <h3 className="font-semibold text-gray-800">Gerar de novo</h3>
              <p className="text-sm text-gray-500">Tente um estilo diferente</p>
            </div>
            <ArrowRight className="w-6 h-6 text-purple-600" />
          </button>

          {/* OTO 1 - Livro de História */}
          <div className="relative bg-white rounded-xl shadow-md p-4 flex items-center gap-4 border-2 border-purple-300 animate-pulse-subtle">
            <div className="relative w-16 h-16 bg-purple-100 rounded-lg overflow-hidden flex-shrink-0">
              <div className="absolute inset-0 flex items-center justify-center bg-purple-600/20 backdrop-blur-sm">
                <Lock className="w-6 h-6 text-purple-600" />
              </div>
              <div className="text-4xl flex items-center justify-center h-full">📖</div>
            </div>
            <div className="flex-1 text-left">
              <h3 className="font-semibold text-gray-800">Livro de História do João</h3>
              <p className="text-sm text-gray-600">O João como herói da história • R$67</p>
            </div>
            <div className="bg-purple-600 text-white px-4 py-2 rounded-full text-sm font-medium shadow-md animate-pulse">
              Desbloquear
            </div>
          </div>

          {/* OTO 2 - Música Personalizada */}
          <button className="w-full bg-white rounded-xl shadow-md p-4 flex items-center gap-4 hover:shadow-lg transition-shadow border border-gray-200">
            <div className="relative w-16 h-16 bg-purple-100 rounded-lg overflow-hidden flex-shrink-0">
              <div className="absolute inset-0 flex items-center justify-center bg-purple-600/20 backdrop-blur-sm">
                <Lock className="w-6 h-6 text-purple-600" />
              </div>
              <div className="text-4xl flex items-center justify-center h-full">🎵</div>
            </div>
            <div className="flex-1 text-left">
              <h3 className="font-semibold text-gray-800">Música Personalizada</h3>
              <p className="text-sm text-gray-600">Uma música com o nome do João • R$37</p>
            </div>
            <div className="bg-purple-600 text-white px-4 py-2 rounded-full text-sm font-medium">
              Desbloquear
            </div>
          </button>
        </div>
      </main>

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
}
