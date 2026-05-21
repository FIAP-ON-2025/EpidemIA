import { useState } from 'react'
import { usarNavegacao } from '../../contextos/ContextoNavegacao'
import Container from './Container'

const itensMenu = [
  { id: 'inicio',   rotulo: 'Início' },
  { id: 'radar',    rotulo: 'Radar' },
  { id: 'locais',   rotulo: 'Atendimento' },
  { id: 'triagem',  rotulo: 'Triagem' },
]

export default function Cabecalho() {
  const { pagina, navegar } = usarNavegacao()
  const [menuAberto, definirMenuAberto] = useState(false)

  const clicarItem = (id) => {
    navegar(id)
    definirMenuAberto(false)
  }

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur border-b border-slate-200">
      <Container className="flex items-center justify-between h-16">
        <button
          onClick={() => clicarItem('inicio')}
          className="flex items-center gap-2 group"
        >
          <span className="inline-flex items-center justify-center w-9 h-9 rounded-xl bg-primaria-500 text-white">
            <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 12h4l2-7 4 14 2-7h6" />
            </svg>
          </span>
          <span className="font-bold text-lg text-texto group-hover:text-primaria-700 transition-colors">
            Epidemia<span className="text-primaria-500">Radar</span>
          </span>
        </button>

        <nav className="hidden md:flex items-center gap-1">
          {itensMenu.map((item) => (
            <button
              key={item.id}
              onClick={() => clicarItem(item.id)}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                pagina === item.id || (item.id === 'radar' && pagina === 'detalhe-epidemia')
                  ? 'bg-primaria-50 text-primaria-700'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-texto'
              }`}
            >
              {item.rotulo}
            </button>
          ))}
        </nav>

        <button
          className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg text-slate-700 hover:bg-slate-100"
          onClick={() => definirMenuAberto((v) => !v)}
          aria-label="Abrir menu"
        >
          <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            {menuAberto ? (
              <>
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </>
            ) : (
              <>
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="6"  x2="21" y2="6" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </>
            )}
          </svg>
        </button>
      </Container>

      {menuAberto && (
        <nav className="md:hidden border-t border-slate-200 bg-white">
          <Container className="py-2 flex flex-col">
            {itensMenu.map((item) => (
              <button
                key={item.id}
                onClick={() => clicarItem(item.id)}
                className={`text-left px-3 py-3 rounded-lg text-sm font-medium ${
                  pagina === item.id
                    ? 'bg-primaria-50 text-primaria-700'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                {item.rotulo}
              </button>
            ))}
          </Container>
        </nav>
      )}
    </header>
  )
}
