"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { t } from "@/lib/i18n";

interface BottomNavProps {
  disabled?: boolean;
}

export default function BottomNav({ disabled = false }: BottomNavProps) {
  const pathname = usePathname();
  const txt = t().app;

  const isActive = (path: string) => pathname === path || pathname.startsWith(path + "/");

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-md z-50">
      <div className="bg-white rounded-full shadow-lg px-8 py-4 flex items-center justify-around">
        {/* Criar */}
        {disabled ? (
          <div className="flex flex-col items-center gap-1 opacity-50 cursor-not-allowed">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6 text-gray-400">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 0 0-2.455 2.456Z" />
            </svg>
            <span className="text-xs text-gray-500">{txt.navCriar}</span>
          </div>
        ) : (
          <Link href="/criar" className="flex flex-col items-center gap-1 transition-colors">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill={isActive("/criar") ? "currentColor" : "none"}
              stroke="currentColor"
              strokeWidth={isActive("/criar") ? 0 : 1.5}
              className={`w-6 h-6 ${isActive("/criar") ? "text-purple-600" : "text-gray-400"}`}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 0 0-2.455 2.456Z" />
            </svg>
            <span className={`text-xs ${isActive("/criar") ? "text-purple-600 font-medium" : "text-gray-500"}`}>
              {txt.navCriar}
            </span>
          </Link>
        )}

        {/* Minhas Páginas */}
        {disabled ? (
          <div className="flex flex-col items-center gap-1 opacity-50 cursor-not-allowed">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6 text-gray-400">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 0 0-5.78 1.128 2.25 2.25 0 0 1-2.4 2.245 4.5 4.5 0 0 0 8.4-2.245c0-.399-.078-.78-.22-1.128Zm0 0a15.998 15.998 0 0 0 3.388-1.62m-5.043-.025a15.994 15.994 0 0 1 1.622-3.395m3.42 3.42a15.995 15.995 0 0 0 4.764-4.648l3.876-5.814a1.151 1.151 0 0 0-1.597-1.597L14.146 6.32a15.996 15.996 0 0 0-4.649 4.763m3.42 3.42a6.776 6.776 0 0 0-3.42-3.42" />
            </svg>
            <span className="text-xs text-gray-500">{txt.navPaginas}</span>
          </div>
        ) : (
          <Link href="/paginas" className="flex flex-col items-center gap-1 transition-colors">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill={isActive("/paginas") ? "currentColor" : "none"}
              stroke="currentColor"
              strokeWidth={isActive("/paginas") ? 0 : 1.5}
              className={`w-6 h-6 ${isActive("/paginas") ? "text-purple-600" : "text-gray-400"}`}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 0 0-5.78 1.128 2.25 2.25 0 0 1-2.4 2.245 4.5 4.5 0 0 0 8.4-2.245c0-.399-.078-.78-.22-1.128Zm0 0a15.998 15.998 0 0 0 3.388-1.62m-5.043-.025a15.994 15.994 0 0 1 1.622-3.395m3.42 3.42a15.995 15.995 0 0 0 4.764-4.648l3.876-5.814a1.151 1.151 0 0 0-1.597-1.597L14.146 6.32a15.996 15.996 0 0 0-4.649 4.763m3.42 3.42a6.776 6.776 0 0 0-3.42-3.42" />
            </svg>
            <span className={`text-xs ${isActive("/paginas") ? "text-purple-600 font-medium" : "text-gray-500"}`}>
              {txt.navPaginas}
            </span>
          </Link>
        )}
      </div>
    </div>
  );
}
