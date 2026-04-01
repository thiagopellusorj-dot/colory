import { Sparkles, Palette } from "lucide-react";
import { useNavigate, useLocation } from "react-router";

interface BottomNavProps {
  disabled?: boolean;
}

export function BottomNav({ disabled = false }: BottomNavProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-md">
      <div className="bg-white rounded-full shadow-lg px-8 py-4 flex items-center justify-around">
        <button
          onClick={() => !disabled && navigate("/")}
          disabled={disabled}
          className={`flex flex-col items-center gap-1 transition-colors ${
            disabled ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          <Sparkles
            className={`w-6 h-6 ${
              isActive("/") ? "text-purple-600 fill-purple-600" : "text-gray-400"
            }`}
          />
          <span
            className={`text-xs ${
              isActive("/") ? "text-purple-600 font-medium" : "text-gray-500"
            }`}
          >
            Criar
          </span>
        </button>

        <button
          onClick={() => !disabled && navigate("/my-pages")}
          disabled={disabled}
          className={`flex flex-col items-center gap-1 transition-colors ${
            disabled ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          <Palette
            className={`w-6 h-6 ${
              isActive("/my-pages") ? "text-purple-600 fill-purple-600" : "text-gray-400"
            }`}
          />
          <span
            className={`text-xs ${
              isActive("/my-pages") ? "text-purple-600 font-medium" : "text-gray-500"
            }`}
          >
            Minhas Páginas
          </span>
        </button>
      </div>
    </div>
  );
}