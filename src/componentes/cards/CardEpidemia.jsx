import Selo from '../ui/Selo'
import Botao from '../ui/Botao'
import { descreverNivel } from '../../utilidades/classificarRisco'
import { usarNavegacao } from '../../contextos/ContextoNavegacao'

export default function CardEpidemia({ epidemia, ocorrencia }) {
  const { navegar } = usarNavegacao()
  const nivel = ocorrencia?.nivel || 'estavel'
  const visual = descreverNivel(nivel)

  return (
    <article
      className={`group relative bg-white rounded-cartao shadow-cartao border ${visual.borda} overflow-hidden hover:-translate-y-1 hover:shadow-lg transition-all`}
    >
      <div
        className={`h-2 w-full`}
        style={{ background: epidemia.corDestaque }}
      />

      <div className="p-6">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-3">
            <span className="text-3xl" aria-hidden>{epidemia.emoji}</span>
            <h3 className="text-xl font-bold text-texto">{epidemia.nome}</h3>
          </div>
          <Selo nivel={nivel} tamanho="pequeno" />
        </div>

        <p className="text-sm text-slate-600 mb-5 leading-relaxed">
          {ocorrencia?.resumo || 'Sem dados recentes para esta região.'}
        </p>

        <Botao
          variante="secundario"
          tamanho="pequeno"
          onClick={() => navegar('detalhe-epidemia', epidemia.slug)}
          className="w-full"
        >
          Saber mais
          <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </Botao>
      </div>
    </article>
  )
}
