import { t } from "@/lib/i18n";

export function TransformacaoVisual() {
  const txt = t().componentes;

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        {/* Foto */}
        <div className="flex-1 bg-gray-100 rounded-xl p-4 text-center space-y-2">
          <span className="text-3xl block">{"\uD83D\uDCF7"}</span>
          <p className="text-sm font-semibold text-gray-700">{txt.transformacaoFoto}</p>
        </div>

        {/* Arrow */}
        <div className="flex flex-col items-center flex-shrink-0">
          <span className="text-purple-500 text-2xl font-bold">&rarr;</span>
        </div>

        {/* Book */}
        <div className="flex-1 bg-purple-100 rounded-xl p-4 text-center space-y-2">
          <span className="text-3xl block">{"\uD83D\uDCD6"}</span>
          <p className="text-sm font-semibold text-purple-700">{txt.transformacaoLivro}</p>
        </div>
      </div>

      <p className="text-xs text-gray-500 text-center leading-relaxed">
        {txt.transformacaoDescricao}
      </p>
    </div>
  );
}
