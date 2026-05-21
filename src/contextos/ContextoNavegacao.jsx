import { createContext, useContext, useState, useCallback } from 'react'

const ContextoNavegacao = createContext(null)

export function ProvedorNavegacao({ children }) {
  const [pagina, definirPagina] = useState('inicio')
  const [parametro, definirParametro] = useState(null)

  const navegar = useCallback((novaPagina, novoParametro = null) => {
    definirPagina(novaPagina)
    definirParametro(novoParametro)
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [])

  const valor = { pagina, parametro, navegar }

  return (
    <ContextoNavegacao.Provider value={valor}>
      {children}
    </ContextoNavegacao.Provider>
  )
}

export function usarNavegacao() {
  const contexto = useContext(ContextoNavegacao)
  if (!contexto) {
    throw new Error('usarNavegacao deve ser usado dentro de ProvedorNavegacao')
  }
  return contexto
}
