import { usarRegiao } from '../../contextos/ContextoRegiao'

export default function SeletorRegiao() {
  const { uf, cidade, regiaoSelecionada, regioes, selecionarRegiao } = usarRegiao()

  const aoMudarUf = (e) => {
    const novaUf = e.target.value || null
    if (!novaUf) {
      selecionarRegiao(null, null)
      return
    }
    const regiao = regioes.find((r) => r.uf === novaUf)
    const cidadePadrao = regiao?.cidades?.[0] || null
    selecionarRegiao(novaUf, cidadePadrao)
  }

  const aoMudarCidade = (e) => {
    selecionarRegiao(uf, e.target.value || null)
  }

  return (
    <div className="grid sm:grid-cols-2 gap-3 w-full">
      <div className="flex flex-col">
        <label className="text-xs font-semibold text-slate-600 mb-1 uppercase tracking-wide">
          Estado
        </label>
        <select
          value={uf || ''}
          onChange={aoMudarUf}
          className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 text-sm text-texto focus:outline-none focus:ring-2 focus:ring-primaria-400 focus:border-primaria-400 transition-all"
        >
          <option value="">Selecione um estado</option>
          {regioes.map((r) => (
            <option key={r.uf} value={r.uf}>{r.nome} ({r.uf})</option>
          ))}
        </select>
      </div>

      <div className="flex flex-col">
        <label className="text-xs font-semibold text-slate-600 mb-1 uppercase tracking-wide">
          Cidade
        </label>
        <select
          value={cidade || ''}
          onChange={aoMudarCidade}
          disabled={!regiaoSelecionada}
          className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 text-sm text-texto disabled:bg-slate-100 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-primaria-400 focus:border-primaria-400 transition-all"
        >
          <option value="">
            {regiaoSelecionada ? 'Selecione uma cidade' : 'Primeiro escolha o estado'}
          </option>
          {regiaoSelecionada?.cidades?.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>
    </div>
  )
}
