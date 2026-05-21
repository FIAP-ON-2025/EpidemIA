const peso = { alto: 3, atencao: 2, estavel: 1 }

export const niveis = {
  alto:    { rotulo: 'Alto risco', cor: 'risco-alto',    bg: 'bg-red-50',   borda: 'border-red-200',   texto: 'text-risco-alto' },
  atencao: { rotulo: 'Atenção',    cor: 'risco-atencao', bg: 'bg-amber-50', borda: 'border-amber-200', texto: 'text-amber-700' },
  estavel: { rotulo: 'Estável',    cor: 'risco-estavel', bg: 'bg-green-50', borda: 'border-green-200', texto: 'text-risco-estavel' },
}

export function descreverNivel(nivel) {
  return niveis[nivel] || niveis.estavel
}

export function maiorNivel(niveisLista) {
  if (!niveisLista || niveisLista.length === 0) return 'estavel'
  return niveisLista.reduce((acc, n) => (peso[n] > peso[acc] ? n : acc), 'estavel')
}
