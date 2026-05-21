import Container from '../componentes/layout/Container'
import Botao from '../componentes/ui/Botao'
import Selo from '../componentes/ui/Selo'
import CardOrientacao from '../componentes/cards/CardOrientacao'
import { usarNavegacao } from '../contextos/ContextoNavegacao'
import { usarRegiao } from '../contextos/ContextoRegiao'
import epidemias from '../dados/epidemias.json'
import ocorrencias from '../dados/ocorrencias.json'

const emojiSintoma = {
  termometro:  '🌡️',
  olho:        '👁️',
  corpo:       '💪',
  pele:        '🩹',
  nausea:      '🤢',
  tosse:       '😷',
  garganta:    '🗣️',
  nariz:       '👃',
  olfato:      '👃',
  cabeca:      '🤕',
  articulacao: '🦴',
  incheo:      '🦵',
}

export default function DetalheEpidemia() {
  const { parametro, navegar } = usarNavegacao()
  const { cidade } = usarRegiao()

  const epidemia = epidemias.find((e) => e.slug === parametro)

  if (!epidemia) {
    return (
      <Container className="py-16">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Epidemia não encontrada</h1>
          <Botao onClick={() => navegar('radar')}>Voltar ao Radar</Botao>
        </div>
      </Container>
    )
  }

  const ocorrencia = cidade ? ocorrencias[cidade]?.epidemias?.[epidemia.slug] : null

  return (
    <>
      <section
        className="py-12 sm:py-16 relative overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${epidemia.corDestaque}15, ${epidemia.corDestaque}05)`,
        }}
      >
        <Container>
          <button
            onClick={() => navegar('radar')}
            className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-primaria-700 mb-6 font-medium"
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
            Voltar ao Radar
          </button>

          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="flex items-center gap-4">
              <span className="text-5xl sm:text-6xl" aria-hidden>{epidemia.emoji}</span>
              <div>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-texto">
                  {epidemia.nome}
                </h1>
                <p className="text-slate-600 mt-1">
                  Transmissão: <span className="font-medium">{epidemia.transmissao}</span>
                </p>
              </div>
            </div>
            {ocorrencia && (
              <div className="text-right">
                <p className="text-xs text-slate-500 uppercase tracking-wide font-semibold mb-1">
                  Status em {cidade}
                </p>
                <Selo nivel={ocorrencia.nivel} tamanho="grande" />
              </div>
            )}
          </div>

          <p className="mt-6 text-base sm:text-lg text-slate-700 leading-relaxed max-w-3xl">
            {epidemia.descricao}
          </p>

          <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur rounded-full border border-slate-200 text-sm">
            <span aria-hidden>⏱️</span>
            <span className="text-slate-700">
              <strong>Período de incubação:</strong> {epidemia.periodoIncubacao}
            </span>
          </div>
        </Container>
      </section>

      <Container className="py-10 sm:py-14 space-y-12">
        <Secao titulo="Sintomas comuns" emoji="🧐">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {epidemia.sintomas.map((s) => (
              <div
                key={s.rotulo}
                className="bg-white rounded-cartao border border-slate-200 p-4 flex items-center gap-3 hover:border-primaria-200 transition-colors"
              >
                <span className="text-2xl" aria-hidden>{emojiSintoma[s.icone] || '•'}</span>
                <span className="text-sm font-medium text-texto">{s.rotulo}</span>
              </div>
            ))}
          </div>
        </Secao>

        <Secao titulo="Sinais de agravamento — procure ajuda imediata" emoji="🚨" destaque>
          <div className="grid sm:grid-cols-2 gap-3">
            {epidemia.agravamento.map((a) => (
              <CardOrientacao key={a} emoji="⚠️" texto={a} destaque />
            ))}
          </div>
        </Secao>

        <Secao titulo="Como prevenir" emoji="🛡️">
          <div className="grid sm:grid-cols-2 gap-3">
            {epidemia.prevencao.map((p) => (
              <CardOrientacao
                key={p.titulo}
                titulo={p.titulo}
                texto={p.texto}
                emoji="✅"
              />
            ))}
          </div>
        </Secao>

        <Secao titulo="Quando procurar ajuda médica" emoji="🩺">
          <div className="bg-primaria-50 border border-primaria-200 rounded-cartao p-6">
            <p className="text-base text-primaria-900 leading-relaxed">
              {epidemia.quandoBuscarAjuda}
            </p>
          </div>
        </Secao>

        <Secao titulo="Vacinação" emoji="💉">
          <div className="bg-white border border-slate-200 rounded-cartao p-6">
            <div className="flex items-start gap-4">
              <span
                className={`inline-flex items-center justify-center w-12 h-12 rounded-full text-2xl ${
                  epidemia.vacina.disponivel ? 'bg-green-100' : 'bg-slate-100'
                }`}
              >
                {epidemia.vacina.disponivel ? '✅' : '🚧'}
              </span>
              <div>
                <p className="font-semibold text-texto mb-1">
                  {epidemia.vacina.disponivel ? 'Vacina disponível' : 'Sem vacina no momento'}
                </p>
                <p className="text-sm text-slate-600 mb-2">
                  <strong>Público-alvo:</strong> {epidemia.vacina.publicoAlvo}
                </p>
                {epidemia.vacina.observacao && (
                  <p className="text-xs text-slate-500">{epidemia.vacina.observacao}</p>
                )}
              </div>
            </div>
          </div>
        </Secao>

        <div className="grid sm:grid-cols-2 gap-3 pt-4">
          <Botao tamanho="grande" onClick={() => navegar('locais')}>
            Ver locais de atendimento
          </Botao>
          <Botao
            variante="secundario"
            tamanho="grande"
            onClick={() => navegar('triagem')}
          >
            Fazer triagem rápida
          </Botao>
        </div>
      </Container>
    </>
  )
}

function Secao({ titulo, emoji, children, destaque = false }) {
  return (
    <div>
      <h2 className={`text-xl sm:text-2xl font-bold mb-4 flex items-center gap-3 ${destaque ? 'text-risco-alto' : 'text-texto'}`}>
        <span aria-hidden>{emoji}</span>
        {titulo}
      </h2>
      {children}
    </div>
  )
}
