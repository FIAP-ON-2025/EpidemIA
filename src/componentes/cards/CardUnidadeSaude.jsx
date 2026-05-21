const coresTipo = {
  Hospital:           { bg: 'bg-red-50',    texto: 'text-red-700',    icone: '🏥' },
  UPA:                { bg: 'bg-orange-50', texto: 'text-orange-700', icone: '🚑' },
  UBS:                { bg: 'bg-blue-50',   texto: 'text-blue-700',   icone: '🩺' },
  'Farmácia Popular': { bg: 'bg-green-50',  texto: 'text-green-700',  icone: '💊' },
}

export default function CardUnidadeSaude({ unidade }) {
  const visual = coresTipo[unidade.tipo] || { bg: 'bg-slate-50', texto: 'text-slate-700', icone: '🏢' }

  return (
    <article className="bg-white rounded-cartao shadow-cartao border border-slate-200 p-5 hover:shadow-md transition-all">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-3">
          <span className="text-2xl" aria-hidden>{visual.icone}</span>
          <div>
            <h3 className="font-semibold text-texto leading-tight">{unidade.nome}</h3>
            <span className={`inline-block mt-1 text-xs font-semibold px-2 py-0.5 rounded-full ${visual.bg} ${visual.texto}`}>
              {unidade.tipo}
            </span>
          </div>
        </div>
      </div>

      <div className="space-y-2 text-sm text-slate-600 mb-4">
        <p className="flex items-start gap-2">
          <span aria-hidden>📍</span>
          <span>{unidade.endereco}</span>
        </p>
        {unidade.telefone && (
          <p className="flex items-start gap-2">
            <span aria-hidden>📞</span>
            <a href={`tel:${unidade.telefone.replace(/\D/g, '')}`} className="hover:text-primaria-600 transition-colors">
              {unidade.telefone}
            </a>
          </p>
        )}
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {unidade.atendimento24h && (
          <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-primaria-50 text-primaria-700 border border-primaria-200">
            ⏰ Atende 24h
          </span>
        )}
        {unidade.vacinacao && (
          <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-green-50 text-green-700 border border-green-200">
            💉 Vacinação
          </span>
        )}
      </div>

      <a
        href={unidade.mapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 text-sm font-medium text-primaria-700 hover:text-primaria-800"
      >
        Ver no mapa
        <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M7 17L17 7" />
          <polyline points="7 7 17 7 17 17" />
        </svg>
      </a>
    </article>
  )
}
