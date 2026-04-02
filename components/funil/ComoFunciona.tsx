import { t } from "@/lib/i18n";

export function ComoFunciona() {
  const txt = t().componentes;

  const steps = [
    { num: 1, emoji: "\uD83D\uDCF7", label: txt.comoFuncionaPasso1 },
    { num: 2, emoji: "\u2728", label: txt.comoFuncionaPasso2 },
    { num: 3, emoji: "\uD83D\uDCD6", label: txt.comoFuncionaPasso3 },
  ];

  return (
    <div className="space-y-3">
      <p className="text-xs text-gray-400 uppercase tracking-wide text-center font-semibold">
        {txt.comoFuncionaTitulo}
      </p>
      <div className="flex items-start justify-center gap-2">
        {steps.map((step, i) => (
          <div key={step.num} className="flex items-start gap-2">
            <div className="flex flex-col items-center text-center w-24">
              <div className="w-9 h-9 rounded-full bg-purple-600 text-white text-sm font-bold flex items-center justify-center">
                {step.num}
              </div>
              <span className="text-2xl mt-1.5">{step.emoji}</span>
              <p className="text-xs text-gray-700 font-medium mt-1 leading-tight">
                {step.label}
              </p>
            </div>
            {i < steps.length - 1 && (
              <span className="text-purple-400 text-lg font-bold mt-2.5 flex-shrink-0">
                &rarr;
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
