import { useEffect, useState } from "react";
import { Sparkles } from "lucide-react";
import { BottomNav } from "../components/BottomNav";
import { useNavigate } from "react-router";

export function Processing() {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => navigate("/result"), 500);
          return 100;
        }
        return prev + 2;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 via-purple-25 to-white pb-32 flex flex-col items-center justify-center px-6">
      <div className="w-full max-w-md space-y-8">
        {/* Photo Card */}
        <div className="relative">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1704644219407-811dfefae037?w=800"
              alt="Foto do João"
              className="w-full aspect-square object-cover"
            />
          </div>
          <div className="absolute top-4 left-4 bg-purple-600 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg flex items-center gap-1">
            <Sparkles className="w-4 h-4" />
            Estilo Simples
          </div>
        </div>

        {/* Progress Section */}
        <div className="text-center space-y-4">
          <div className="text-7xl font-bold text-purple-600">{progress}%</div>

          {/* Progress Bar */}
          <div className="w-full bg-purple-100 rounded-full h-3 overflow-hidden">
            <div
              className="bg-purple-600 h-full rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>

          <p className="text-gray-500">Gerando a página do João...</p>
        </div>

        {/* Info Card */}
        <div className="bg-white rounded-3xl shadow-lg p-6 space-y-4 mt-8">
          <div className="flex items-start gap-4">
            <div className="bg-purple-600 rounded-xl p-2 flex-shrink-0">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <p className="text-gray-600 text-sm leading-relaxed">
                Sabia que colorir reduz o estresse em até 35%? O João vai adorar!
              </p>
            </div>
          </div>

          {/* Pagination Dots */}
          <div className="flex items-center justify-center gap-2 pt-2">
            <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
            <div className="w-2 h-2 bg-purple-200 rounded-full"></div>
            <div className="w-2 h-2 bg-purple-200 rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Bottom Navigation - Disabled during processing */}
      <BottomNav disabled />
    </div>
  );
}
