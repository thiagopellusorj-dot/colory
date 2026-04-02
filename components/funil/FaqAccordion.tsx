"use client";

import { useState } from "react";
import { t } from "@/lib/i18n";

interface FaqItem {
  pergunta: string;
  resposta: string;
}

interface FaqAccordionProps {
  items: FaqItem[];
}

export function FaqAccordion({ items }: FaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const txt = t().componentes;

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="space-y-3">
      <p className="text-sm font-bold text-gray-900 text-center">
        {txt.faqTitulo}
      </p>
      <div className="divide-y divide-gray-100 border border-gray-100 rounded-xl overflow-hidden">
        {items.map((item, i) => {
          const isOpen = openIndex === i;
          return (
            <div key={i} className="bg-white">
              <button
                onClick={() => toggle(i)}
                className="w-full flex items-center justify-between px-4 py-3 text-left"
              >
                <span className="text-sm font-medium text-gray-800 pr-2">
                  {item.pergunta}
                </span>
                <span
                  className={`text-gray-400 text-lg flex-shrink-0 transition-transform duration-200 ${
                    isOpen ? "rotate-45" : ""
                  }`}
                >
                  +
                </span>
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <p className="px-4 pb-3 text-xs text-gray-600 leading-relaxed">
                  {item.resposta}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
