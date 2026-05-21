import { createContext, useContext, useState, useCallback, useMemo } from 'react'
import regioes from '../dados/regioes.json'

const ContextoRegiao = createContext(null)

export function ProvedorRegiao({ children }) {
  const [uf, definirUf] = useState(null)
  const [cidade, definirCidade] = useState(null)

  const selecionarRegiao = useCallback((novaUf, novaCidade) => {
    definirUf(novaUf)
    definirCidade(novaCidade)
  }, [])

  const limpar = useCallback(() => {
    definirUf(null)
    definirCidade(null)
  }, [])

  const regiaoSelecionada = useMemo(() => {
    if (!uf) return null
    return regioes.find((r) => r.uf === uf) || null
  }, [uf])

  const valor = {
    uf,
    cidade,
    regiaoSelecionada,
    regioes,
    selecionarRegiao,
    limpar,
  }

  return (
    <ContextoRegiao.Provider value={valor}>
      {children}
    </ContextoRegiao.Provider>
  )
}

export function usarRegiao() {
  const contexto = useContext(ContextoRegiao)
  if (!contexto) {
    throw new Error('usarRegiao deve ser usado dentro de ProvedorRegiao')
  }
  return contexto
}
