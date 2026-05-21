export default function CardOrientacao({ titulo, texto, emoji = 'ℹ️', destaque = false }) {
  return (
    <div
      className={`rounded-cartao p-5 border transition-all ${
        destaque
          ? 'bg-red-50 border-red-200'
          : 'bg-white border-slate-200 hover:border-primaria-200 hover:shadow-sm'
      }`}
    >
      <div className="flex items-start gap-3">
        <span className="text-2xl flex-shrink-0" aria-hidden>{emoji}</span>
        <div>
          {titulo && (
            <h4 className={`font-semibold mb-1 ${destaque ? 'text-risco-alto' : 'text-texto'}`}>
              {titulo}
            </h4>
          )}
          <p className="text-sm text-slate-600 leading-relaxed">{texto}</p>
        </div>
      </div>
    </div>
  )
}
