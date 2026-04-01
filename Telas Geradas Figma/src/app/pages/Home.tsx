import { Settings, Sparkles, Lock } from "lucide-react";
import { BottomNav } from "../components/BottomNav";
import { useNavigate } from "react-router";
import { useState } from "react";

export function Home() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("coloring-book");
  const [selectedStyle, setSelectedStyle] = useState("simple");

  const handleGenerate = () => {
    navigate("/processing");
  };

  const categories = [
    { id: "coloring-book", name: "Coloring Book", icon: "✦" },
    { id: "sketch", name: "Sketch", icon: "✏️" },
    { id: "colorful", name: "Colorful", icon: "🎨" },
  ];

  const styles = [
    {
      id: "simple",
      name: "Livro para colorir",
      image: "https://images.unsplash.com/photo-1658786335126-6e00866428ae?w=400",
      locked: false,
    },
    {
      id: "detailed",
      name: "Arte linear com tinta",
      image: "https://images.unsplash.com/photo-1765498173413-b428f5d0a17e?w=400",
      locked: false,
    },
    {
      id: "family",
      name: "Livro para colorir (linhas grossas)",
      image: "https://images.unsplash.com/photo-1544019860-78e7c6e3a2e5?w=400",
      locked: false,
    },
    {
      id: "bike",
      name: "Livro para colorir (crianças)",
      image: "https://images.unsplash.com/photo-1677856095766-68ad7e687662?w=400",
      locked: true,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white pb-32">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-6">
        <h1 className="text-2xl font-bold text-purple-600">Colory</h1>
        <button
          onClick={() => navigate("/settings")}
          className="p-2 hover:bg-purple-50 rounded-full transition-colors"
        >
          <Settings className="w-6 h-6 text-purple-600" />
        </button>
      </header>

      {/* Main Content */}
      <main className="px-6 space-y-5">
        {/* Upload Card */}
        <div className="bg-white rounded-2xl shadow-lg p-6 space-y-4">
          {/* Illustration Area */}
          <div className="border-2 border-dashed border-purple-300 rounded-xl p-8 flex items-center justify-center bg-purple-50/30">
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-3 text-purple-400">
                <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="30" y="10" width="8" height="80" fill="currentColor" rx="4" />
                  <path
                    d="M26 90 L42 90 L38 10 L30 10 Z"
                    fill="currentColor"
                    opacity="0.7"
                  />
                  <circle cx="34" cy="15" r="3" fill="#9333ea" />
                  <path
                    d="M20 75 Q25 70 30 75 T40 75 T50 75"
                    stroke="currentColor"
                    strokeWidth="3"
                    fill="none"
                    opacity="0.3"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <p className="text-center text-gray-700">
              Transforme a foto do <span className="font-semibold text-purple-600">[João]</span> em
              uma página de colorir
            </p>

            <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3.5 rounded-xl font-medium transition-colors shadow-md">
              Adicionar Foto +
            </button>
          </div>
        </div>

        {/* Style Selection */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-gray-800">Selecionar Estilo</h2>
            <button className="text-purple-600 text-sm hover:underline">Ver tudo &gt;</button>
          </div>

          {/* Category Pills */}
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap flex items-center gap-1.5 transition-all ${
                  selectedCategory === category.id
                    ? "bg-purple-600 text-white shadow-md"
                    : "bg-white text-gray-700 border border-gray-200 hover:border-purple-300"
                }`}
              >
                <span>{category.icon}</span>
                <span>{category.name}</span>
              </button>
            ))}
          </div>

          {/* Style Preview Cards - Horizontal Scroll */}
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide -mx-6 px-6">
            {styles.map((style) => (
              <button
                key={style.id}
                onClick={() => !style.locked && setSelectedStyle(style.id)}
                disabled={style.locked}
                className={`flex-shrink-0 w-28 transition-all ${
                  style.locked ? "opacity-60" : "hover:scale-105"
                } ${selectedStyle === style.id ? "ring-2 ring-purple-600 ring-offset-2 rounded-xl" : ""}`}
              >
                <div className="bg-white rounded-xl shadow-md overflow-hidden">
                  <div className="aspect-square bg-gray-100 relative">
                    <img
                      src={style.image}
                      alt={style.name}
                      className={`w-full h-full object-cover ${style.locked ? "blur-sm" : ""}`}
                    />
                    {style.locked && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/10">
                        <div className="bg-purple-600 rounded-full p-2 shadow-lg">
                          <Lock className="w-4 h-4 text-white" />
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="p-2">
                    <p className="text-xs text-gray-700 leading-tight line-clamp-2 text-center">
                      {style.name}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Generate Button */}
        <button
          onClick={handleGenerate}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white py-4 rounded-xl font-medium text-lg transition-colors shadow-lg"
        >
          Gerar Página
        </button>
      </main>

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
}