const config = {
  alto: {
    rotulo: 'Alto risco',
    cor: 'bg-red-50 text-risco-alto border-red-200',
    pontoCor: 'bg-risco-alto',
  },
  atencao: {
    rotulo: 'Atenção',
    cor: 'bg-amber-50 text-amber-700 border-amber-200',
    pontoCor: 'bg-risco-atencao',
  },
  estavel: {
    rotulo: 'Estável',
    cor: 'bg-green-50 text-risco-estavel border-green-200',
    pontoCor: 'bg-risco-estavel',
  },
}

export default function Selo({ nivel = 'estavel', tamanho = 'medio' }) {
  const c = config[nivel] || config.estavel
  const tamanhos = {
    pequeno: 'text-xs px-2 py-0.5',
    medio:   'text-sm px-2.5 py-1',
    grande:  'text-base px-3 py-1.5',
  }

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border font-semibold ${c.cor} ${tamanhos[tamanho]}`}
    >
      <span className={`inline-block w-2 h-2 rounded-full ${c.pontoCor} animate-pulse`} />
      {c.rotulo}
    </span>
  )
}
