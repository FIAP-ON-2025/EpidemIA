import Container from '../componentes/layout/Container'
import SeletorRegiao from '../componentes/ui/SeletorRegiao'
import CardEpidemia from '../componentes/cards/CardEpidemia'
import Selo from '../componentes/ui/Selo'
import { usarRegiao } from '../contextos/ContextoRegiao'
import epidemias from '../dados/epidemias.json'
import ocorrencias from '../dados/ocorrencias.json'
import { maiorNivel } from '../utilidades/classificarRisco'

export default function Radar() {
  const { cidade } = usarRegiao()
  const dadosCidade = cidade ? ocorrencias[cidade] : null

  const nivelGeral = dadosCidade
    ? maiorNivel(Object.values(dadosCidade.epidemias).map((e) => e.nivel))
    : null

  return (
    <section className="py-10 sm:py-14">
      <Container>
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-texto mb-2">
            Radar de epidemias
          </h1>
          <p className="text-slate-600 max-w-2xl">
            Escolha seu estado e cidade para ver quais epidemias estão exigindo
            atenção na sua região.
          </p>
        </div>

        <div className="bg-white rounded-cartao shadow-cartao border border-slate-200 p-6 mb-8">
          <SeletorRegiao />

          {cidade && nivelGeral && (
            <div className="mt-5 pt-5 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-xs text-slate-500 uppercase tracking-wide font-semibold mb-1">
                  Status geral de {cidade}
                </p>
                <p className="text-sm text-slate-600">
                  Atualizado em {formatarData(dadosCidade.atualizadoEm)}
                </p>
              </div>
              <Selo nivel={nivelGeral} tamanho="grande" />
            </div>
          )}
        </div>

        {!cidade && (
          <EstadoVazio />
        )}

        {cidade && dadosCidade && (
          <div>
            <h2 className="text-xl font-bold text-texto mb-4">
              Epidemias monitoradas em {cidade}
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-5">
              {epidemias.map((epi) => (
                <CardEpidemia
                  key={epi.slug}
                  epidemia={epi}
                  ocorrencia={dadosCidade.epidemias[epi.slug]}
                />
              ))}
            </div>
          </div>
        )}
      </Container>
    </section>
  )
}

function EstadoVazio() {
  return (
    <div className="bg-white rounded-cartao border-2 border-dashed border-slate-200 p-10 sm:p-14 text-center">
      <span className="text-5xl block mb-4" aria-hidden>🗺️</span>
      <h3 className="text-xl font-bold text-texto mb-2">
        Comece selecionando sua região
      </h3>
      <p className="text-slate-600 max-w-md mx-auto">
        Os dados de epidemias são específicos por cidade. Escolha seu estado e
        depois a cidade para ver o panorama completo.
      </p>
    </div>
  )
}

function formatarData(iso) {
  if (!iso) return '—'
  const [ano, mes, dia] = iso.split('-')
  return `${dia}/${mes}/${ano}`
}
