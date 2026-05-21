import { useMemo, useState } from 'react'
import Container from '../componentes/layout/Container'
import Botao from '../componentes/ui/Botao'
import Selo from '../componentes/ui/Selo'
import { usarNavegacao } from '../contextos/ContextoNavegacao'
import perguntas from '../dados/perguntas-triagem.json'
import { calcularResultadoTriagem } from '../utilidades/calcularTriagem'

export default function Triagem() {
  const { navegar } = usarNavegacao()
  const [passo, definirPasso] = useState(0)
  const [respostas, definirRespostas] = useState({})
  const [finalizado, definirFinalizado] = useState(false)

  const totalPerguntas = perguntas.length
  const perguntaAtual = perguntas[passo]
  const progresso = ((passo + (finalizado ? 1 : 0)) / totalPerguntas) * 100

  const resultado = useMemo(() => {
    if (!finalizado) return null
    return calcularResultadoTriagem(respostas)
  }, [finalizado, respostas])

  const definirResposta = (id, valor) => {
    definirRespostas((r) => ({ ...r, [id]: valor }))
  }

  const alternarOpcaoMultipla = (id, valor) => {
    definirRespostas((r) => {
      const atual = Array.isArray(r[id]) ? r[id] : []
      if (valor === 'nenhum' || valor === 'nenhuma_exposicao' || valor === 'nenhum_cuidado') {
        return { ...r, [id]: atual.includes(valor) ? [] : [valor] }
      }
      const semExclusivos = atual.filter(
        (v) => v !== 'nenhum' && v !== 'nenhuma_exposicao' && v !== 'nenhum_cuidado'
      )
      const novo = semExclusivos.includes(valor)
        ? semExclusivos.filter((v) => v !== valor)
        : [...semExclusivos, valor]
      return { ...r, [id]: novo }
    })
  }

  const respostaValida = (() => {
    if (!perguntaAtual) return false
    const r = respostas[perguntaAtual.id]
    if (perguntaAtual.tipo === 'multipla') return Array.isArray(r) && r.length > 0
    return Boolean(r)
  })()

  const avancar = () => {
    if (passo < totalPerguntas - 1) {
      definirPasso(passo + 1)
    } else {
      definirFinalizado(true)
    }
  }

  const voltar = () => {
    if (passo > 0) definirPasso(passo - 1)
  }

  const reiniciar = () => {
    definirRespostas({})
    definirPasso(0)
    definirFinalizado(false)
  }

  return (
    <section className="py-10 sm:py-14">
      <Container className="max-w-3xl">
        <div className="mb-6 text-center">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-texto mb-2">
            Triagem rápida
          </h1>
          <p className="text-slate-600">
            Responda algumas perguntas e receba uma orientação personalizada.
          </p>
        </div>

        <div className="mb-6">
          <div className="flex justify-between text-xs font-semibold text-slate-600 mb-2 uppercase">
            <span>
              {finalizado ? 'Concluída' : `Pergunta ${passo + 1} de ${totalPerguntas}`}
            </span>
            <span>{Math.round(progresso)}%</span>
          </div>
          <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-primaria-500 transition-all duration-500"
              style={{ width: `${progresso}%` }}
            />
          </div>
        </div>

        {!finalizado && perguntaAtual && (
          <div className="bg-white rounded-cartao shadow-cartao border border-slate-200 p-6 sm:p-8">
            <h2 className="text-xl sm:text-2xl font-bold text-texto mb-2">
              {perguntaAtual.pergunta}
            </h2>
            {perguntaAtual.ajuda && (
              <p className="text-sm text-slate-500 mb-6">{perguntaAtual.ajuda}</p>
            )}

            <div className="space-y-2 mb-8">
              {perguntaAtual.opcoes.map((opcao) => {
                const selecionada =
                  perguntaAtual.tipo === 'multipla'
                    ? Array.isArray(respostas[perguntaAtual.id]) &&
                      respostas[perguntaAtual.id].includes(opcao.valor)
                    : respostas[perguntaAtual.id] === opcao.valor

                return (
                  <button
                    key={opcao.valor}
                    onClick={() => {
                      if (perguntaAtual.tipo === 'multipla') {
                        alternarOpcaoMultipla(perguntaAtual.id, opcao.valor)
                      } else {
                        definirResposta(perguntaAtual.id, opcao.valor)
                      }
                    }}
                    className={`w-full text-left p-4 rounded-xl border-2 flex items-center gap-3 transition-all ${
                      selecionada
                        ? 'border-primaria-500 bg-primaria-50'
                        : 'border-slate-200 bg-white hover:border-primaria-200 hover:bg-slate-50'
                    }`}
                  >
                    {opcao.emoji && (
                      <span className="text-2xl" aria-hidden>{opcao.emoji}</span>
                    )}
                    <span className="flex-1 font-medium text-texto">{opcao.rotulo}</span>
                    <span
                      className={`flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        selecionada ? 'border-primaria-500 bg-primaria-500' : 'border-slate-300'
                      }`}
                    >
                      {selecionada && (
                        <svg viewBox="0 0 24 24" className="w-3 h-3 text-white" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      )}
                    </span>
                  </button>
                )
              })}
            </div>

            <div className="flex justify-between gap-3">
              <Botao
                variante="fantasma"
                onClick={voltar}
                disabled={passo === 0}
              >
                Voltar
              </Botao>
              <Botao onClick={avancar} disabled={!respostaValida}>
                {passo === totalPerguntas - 1 ? 'Ver resultado' : 'Próxima'}
              </Botao>
            </div>
          </div>
        )}

        {finalizado && resultado && (
          <Resultado resultado={resultado} reiniciar={reiniciar} navegar={navegar} />
        )}
      </Container>
    </section>
  )
}

function Resultado({ resultado, reiniciar, navegar }) {
  const { nivel, orientacoes, sinaisAlerta } = resultado

  const textosNivel = {
    alto: {
      titulo: 'Recomendamos buscar atendimento',
      texto: 'Pelo que você descreveu, é importante procurar avaliação médica em breve. Algumas combinações de sintomas merecem atenção rápida.',
      cor: 'from-red-50 to-white',
      borda: 'border-red-200',
      icone: '🚨',
    },
    atencao: {
      titulo: 'Mantenha atenção e monitore',
      texto: 'Você apresenta sintomas que merecem acompanhamento. Reforce os cuidados preventivos e observe a evolução nas próximas horas.',
      cor: 'from-amber-50 to-white',
      borda: 'border-amber-200',
      icone: '⚠️',
    },
    estavel: {
      titulo: 'Tudo parece tranquilo no momento',
      texto: 'Você não relatou sinais preocupantes agora. Continue mantendo medidas preventivas e refaça a triagem em caso de mudança.',
      cor: 'from-green-50 to-white',
      borda: 'border-green-200',
      icone: '✅',
    },
  }

  const cfg = textosNivel[nivel]

  return (
    <div className="space-y-6">
      <div className={`bg-gradient-to-br ${cfg.cor} border ${cfg.borda} rounded-cartao p-6 sm:p-8`}>
        <div className="flex items-start gap-4 mb-4">
          <span className="text-4xl" aria-hidden>{cfg.icone}</span>
          <div>
            <Selo nivel={nivel} tamanho="medio" />
            <h2 className="text-2xl font-extrabold text-texto mt-2">
              {cfg.titulo}
            </h2>
          </div>
        </div>
        <p className="text-slate-700 leading-relaxed">{cfg.texto}</p>
      </div>

      {sinaisAlerta.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-cartao p-6">
          <h3 className="font-bold text-risco-alto mb-3 flex items-center gap-2">
            <span aria-hidden>⚠️</span> Sinais relatados que merecem atenção
          </h3>
          <ul className="space-y-1 text-sm text-slate-700">
            {sinaisAlerta.map((s) => (
              <li key={s} className="flex items-start gap-2">
                <span className="text-risco-alto" aria-hidden>•</span>
                {s}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="bg-white rounded-cartao border border-slate-200 p-6">
        <h3 className="font-bold text-texto mb-4 flex items-center gap-2">
          <span aria-hidden>📋</span> Suas orientações personalizadas
        </h3>
        <ul className="space-y-3">
          {orientacoes.map((o, i) => (
            <li key={i} className="flex items-start gap-3 text-slate-700">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primaria-100 text-primaria-700 text-xs font-bold flex items-center justify-center mt-0.5">
                {i + 1}
              </span>
              <span className="text-sm leading-relaxed">{o}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-slate-50 border border-slate-200 rounded-cartao p-5 text-xs text-slate-600 leading-relaxed">
        <strong className="text-texto">Aviso importante:</strong> esta triagem tem caráter
        educacional e não substitui consulta médica. Em caso de urgência, procure
        atendimento ou ligue para o SAMU (192).
      </div>

      <div className="grid sm:grid-cols-2 gap-3">
        {nivel !== 'estavel' && (
          <Botao tamanho="grande" onClick={() => navegar('locais')}>
            Encontrar atendimento
          </Botao>
        )}
        <Botao
          variante="secundario"
          tamanho="grande"
          onClick={reiniciar}
          className={nivel === 'estavel' ? 'sm:col-span-2' : ''}
        >
          Refazer triagem
        </Botao>
      </div>
    </div>
  )
}
