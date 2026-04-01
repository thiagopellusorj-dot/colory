export function GarantiaBadge() {
  return (
    <div className="flex items-start gap-4 bg-green-50 border border-green-200 rounded-2xl p-4">
      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
        <svg
          className="w-5 h-5 text-green-600"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
          />
        </svg>
      </div>
      <div className="space-y-0.5">
        <p className="font-bold text-gray-900 text-sm">
          Garantia de 30 dias
        </p>
        <p className="text-xs text-gray-600 leading-relaxed">
          Se não gostar, devolvemos 100% do seu dinheiro. Sem perguntas.
        </p>
      </div>
    </div>
  );
}
