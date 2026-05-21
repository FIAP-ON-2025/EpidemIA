import { useMemo, useState } from 'react'
import Container from '../componentes/layout/Container'
import SeletorRegiao from '../componentes/ui/SeletorRegiao'
import CardUnidadeSaude from '../componentes/cards/CardUnidadeSaude'
import Botao from '../componentes/ui/Botao'
import { usarRegiao } from '../contextos/ContextoRegiao'
import { usarNavegacao } from '../contextos/ContextoNavegacao'
import unidadesPorCidade from '../dados/unidades-saude.json'

const filtros = ['Todos', 'Hospital', 'UPA', 'UBS', 'Farmácia Popular']

export default function LocaisAtendimento() {
  const { cidade } = usarRegiao()
  const { navegar } = usarNavegacao()
  const [filtroAtivo, definirFiltro] = useState('Todos')

  const unidades = useMemo(() => {
    if (!cidade) return []
    const todas = unidadesPorCidade[cidade] || []
    if (filtroAtivo === 'Todos') return todas
    return todas.filter((u) => u.tipo === filtroAtivo)
  }, [cidade, filtroAtivo])

  return (
    <section className="py-10 sm:py-14">
      <Container>
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-texto mb-2">
            Onde buscar atendimento
          </h1>
          <p className="text-slate-600 max-w-2xl">
            UPAs, hospitais, postos de saúde e farmácias populares próximos a você.
            Confira endereço, contato e horário de atendimento.
          </p>
        </div>

        <div className="bg-white rounded-cartao shadow-cartao border border-slate-200 p-6 mb-8">
          <SeletorRegiao />
        </div>

        {!cidade && (
          <div className="bg-white rounded-cartao border-2 border-dashed border-slate-200 p-10 text-center">
            <span className="text-5xl block mb-4" aria-hidden>🏥</span>
            <h3 className="text-xl font-bold text-texto mb-2">
              Selecione uma cidade para ver as unidades
            </h3>
            <p className="text-slate-600 max-w-md mx-auto">
              Mostraremos uma lista curada com os principais pontos de atendimento da
              sua região.
            </p>
          </div>
        )}

        {cidade && (
          <>
            <ContatosUteis />

            <div className="flex flex-wrap gap-2 mb-6">
              {filtros.map((f) => (
                <button
                  key={f}
                  onClick={() => definirFiltro(f)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    filtroAtivo === f
                      ? 'bg-primaria-500 text-white shadow-sm'
                      : 'bg-white text-slate-700 border border-slate-200 hover:border-primaria-300 hover:text-primaria-700'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>

            {unidades.length === 0 ? (
              <div className="bg-white rounded-cartao border border-slate-200 p-8 text-center text-slate-600">
                Nenhuma unidade do tipo <strong>{filtroAtivo}</strong> cadastrada para esta cidade.
              </div>
            ) : (
              <>
                <p className="text-sm text-slate-600 mb-4">
                  Mostrando <strong>{unidades.length}</strong> {unidades.length === 1 ? 'unidade' : 'unidades'} em <strong>{cidade}</strong>.
                </p>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {unidades.map((u) => (
                    <CardUnidadeSaude key={u.nome} unidade={u} />
                  ))}
                </div>
              </>
            )}

            <div className="mt-12 bg-primaria-50 border border-primaria-200 rounded-cartao p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-bold text-texto mb-1">
                  Não tem certeza se precisa ir ao médico?
                </h3>
                <p className="text-sm text-slate-700">
                  Faça uma triagem rápida e receba orientação personalizada.
                </p>
              </div>
              <Botao onClick={() => navegar('triagem')}>Iniciar triagem</Botao>
            </div>
          </>
        )}
      </Container>
    </section>
  )
}

function ContatosUteis() {
  const contatos = [
    { numero: '192', servico: 'SAMU', descricao: 'Urgência e emergência médica' },
    { numero: '136', servico: 'Disque Saúde', descricao: 'Informações do Ministério da Saúde' },
    { numero: '0800 61 1997', servico: 'Disque Intoxicação', descricao: 'Centros de informação toxicológica' },
  ]

  return (
    <div className="bg-gradient-to-br from-primaria-50 to-white border border-primaria-100 rounded-cartao p-5 mb-6">
      <h3 className="text-sm font-bold text-texto uppercase tracking-wide mb-3 flex items-center gap-2">
        <span aria-hidden>📞</span> Contatos úteis
      </h3>
      <div className="grid sm:grid-cols-3 gap-3">
        {contatos.map((c) => (
          <a
            key={c.numero}
            href={`tel:${c.numero.replace(/\D/g, '')}`}
            className="bg-white rounded-lg p-3 border border-slate-200 hover:border-primaria-300 transition-colors"
          >
            <p className="text-2xl font-extrabold text-primaria-600">{c.numero}</p>
            <p className="text-sm font-semibold text-texto">{c.servico}</p>
            <p className="text-xs text-slate-500">{c.descricao}</p>
          </a>
        ))}
      </div>
    </div>
  )
}
