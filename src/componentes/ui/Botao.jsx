export default function Botao({
  children,
  variante = 'primario',
  tamanho = 'medio',
  className = '',
  ...resto
}) {
  const base =
    'inline-flex items-center justify-center gap-2 font-medium rounded-xl transition-all focus:outline-none focus:ring-2 focus:ring-primaria-300 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed'

  const variantes = {
    primario:   'bg-primaria-500 text-white hover:bg-primaria-600 active:bg-primaria-700 shadow-sm hover:shadow',
    secundario: 'bg-white text-primaria-700 border border-primaria-200 hover:bg-primaria-50',
    fantasma:   'bg-transparent text-slate-700 hover:bg-slate-100',
    perigo:     'bg-risco-alto text-white hover:bg-red-700',
  }

  const tamanhos = {
    pequeno: 'px-3 py-1.5 text-sm',
    medio:   'px-5 py-2.5 text-sm',
    grande:  'px-7 py-3.5 text-base',
  }

  return (
    <button
      className={`${base} ${variantes[variante]} ${tamanhos[tamanho]} ${className}`}
      {...resto}
    >
      {children}
    </button>
  )
}
