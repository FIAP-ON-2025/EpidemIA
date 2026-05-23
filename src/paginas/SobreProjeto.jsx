import Container from '../componentes/layout/Container'
import Botao from '../componentes/ui/Botao'
import { usarNavegacao } from '../contextos/ContextoNavegacao'

const blocos = [
  {
    emoji: '🛰️',
    titulo: 'Veja os riscos',
    texto: 'Escolha sua cidade e descubra quais epidemias estão em alerta agora.',
  },
  {
    emoji: '📖',
    titulo: 'Entenda os sintomas',
    texto: 'Sintomas, prevenção e quando procurar atendimento — em linguagem simples.',
  },
  {
    emoji: '🏥',
    titulo: 'Encontre atendimento',
    texto: 'UPAs, UBSs e hospitais perto de você, com endereço e contato.',
  },
]

export default function Inicio() {
  const { navegar } = usarNavegacao()

  return (
    <>
      <section className="bg-gradient-to-b from-primaria-50 to-fundo pt-12 pb-20 sm:pt-20 sm:pb-28">
        <Container>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-primaria-200 text-primaria-700 text-xs font-semibold mb-6">
                <span className="w-2 h-2 rounded-full bg-primaria-500 animate-pulse"></span>
                Monitor de epidemias em tempo real
              </span>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-texto leading-tight mb-6">
                Saiba quais epidemias{' '}
                <span className="text-primaria-600">precisam de atenção</span>{' '}
                perto de você.
              </h1>

              <p className="text-lg text-slate-600 mb-8 leading-relaxed max-w-xl">
                Uma plataforma que traduz dados oficiais de saúde em informação clara,
                acolhedora e útil — para você se proteger e proteger quem ama.
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <Botao tamanho="grande" onClick={() => navegar('radar')}>
                  Ver radar da minha região
                  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </Botao>
                <Botao
                  variante="secundario"
                  tamanho="grande"
                  onClick={() => navegar('triagem')}
                >
                  Fazer triagem rápida
                </Botao>
              </div>
            </div>

            <div className="hidden lg:flex justify-center">
              <IlustracaoSaude />
            </div>
          </div>
        </Container>
      </section>

      <section className="-mt-12 mb-12">
        <Container>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {blocos.map((b) => (
              <div
                key={b.titulo}
                className="bg-white rounded-cartao shadow-cartao border border-slate-100 p-6 hover:-translate-y-1 hover:shadow-lg transition-all"
              >
                <span className="text-3xl block mb-3" aria-hidden>{b.emoji}</span>
                <h3 className="text-lg font-bold text-texto mb-2">{b.titulo}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{b.texto}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-12 bg-white border-y border-slate-200">
        <Container>
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-texto mb-4">
              Informação confiável, na hora certa.
            </h2>
            <p className="text-slate-600 mb-8">
              Cruzamos dados públicos do <strong>DataSUS</strong>, do{' '}
              <strong>Ministério da Saúde</strong> e das secretarias estaduais para
              te mostrar — sem números complicados — o que realmente importa.
            </p>
            <div className="flex flex-wrap justify-center gap-3 text-sm">
              <span className="px-3 py-1.5 rounded-full bg-slate-100 text-slate-700">📊 DataSUS</span>
              <span className="px-3 py-1.5 rounded-full bg-slate-100 text-slate-700">🏛️ Ministério da Saúde</span>
              <span className="px-3 py-1.5 rounded-full bg-slate-100 text-slate-700">📍 CNES</span>
              <span className="px-3 py-1.5 rounded-full bg-slate-100 text-slate-700">🗺️ Google Maps</span>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}

function IlustracaoSaude() {
  return (
    <svg viewBox="0 0 400 400" className="w-full max-w-md" aria-hidden>
      <defs>
        <linearGradient id="gradPrincipal" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#7DD3FC" />
          <stop offset="100%" stopColor="#0284C7" />
        </linearGradient>
      </defs>
      <circle cx="200" cy="200" r="170" fill="url(#gradPrincipal)" opacity="0.15" />
      <circle cx="200" cy="200" r="130" fill="url(#gradPrincipal)" opacity="0.25" />
      <circle cx="200" cy="200" r="90"  fill="url(#gradPrincipal)" opacity="0.4" />
      <g transform="translate(200 200)">
        <path
          d="M -50 0 L -20 0 L -10 -30 L 10 30 L 20 0 L 50 0"
          fill="none"
          stroke="#0369A1"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <circle cx="200" cy="200" r="170" fill="none" stroke="#0EA5E9" strokeWidth="2" strokeDasharray="4 8" opacity="0.6">
        <animateTransform attributeName="transform" type="rotate" from="0 200 200" to="360 200 200" dur="40s" repeatCount="indefinite" />
      </circle>
      <g>
        <circle cx="80" cy="120" r="8" fill="#F59E0B" />
        <circle cx="320" cy="160" r="6" fill="#DC2626" />
        <circle cx="290" cy="290" r="9" fill="#16A34A" />
        <circle cx="100" cy="290" r="7" fill="#0EA5E9" />
      </g>
    </svg>
  )
}
