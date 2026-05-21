import perguntas from '../dados/perguntas-triagem.json'

export function calcularResultadoTriagem(respostas) {
  let pontuacao = 0
  const sinaisAlerta = []

  for (const pergunta of perguntas) {
    const resposta = respostas[pergunta.id]
    if (resposta === undefined || resposta === null) continue

    if (pergunta.tipo === 'multipla') {
      const selecionadas = Array.isArray(resposta) ? resposta : []
      for (const valor of selecionadas) {
        const opcao = pergunta.opcoes.find((o) => o.valor === valor)
        if (opcao) {
          pontuacao += opcao.peso
          if (valor === 'falta_ar' || valor === 'manchas') {
            sinaisAlerta.push(opcao.rotulo)
          }
        }
      }
    } else if (pergunta.tipo === 'unica') {
      const opcao = pergunta.opcoes.find((o) => o.valor === resposta)
      if (opcao) {
        pontuacao += opcao.peso
        if (pergunta.id === 'tempo' && resposta === 'mais_3_dias') {
          sinaisAlerta.push('Sintomas há mais de 3 dias')
        }
      }
    }
  }

  let nivel = 'estavel'
  if (pontuacao >= 8 || sinaisAlerta.includes('Falta de ar')) {
    nivel = 'alto'
  } else if (pontuacao >= 4) {
    nivel = 'atencao'
  }

  const orientacoes = montarOrientacoes(nivel, sinaisAlerta, respostas)

  return { nivel, pontuacao, sinaisAlerta, orientacoes }
}

function montarOrientacoes(nivel, sinaisAlerta, respostas) {
  const base = []

  if (nivel === 'alto') {
    base.push('Procure atendimento médico hoje mesmo.')
    base.push('Não se automedique — evite anti-inflamatórios como AAS sem orientação.')
    base.push('Mantenha-se bem hidratado e em repouso até a avaliação.')
    if (sinaisAlerta.includes('Falta de ar')) {
      base.push('Sinais de falta de ar exigem avaliação imediata — considere UPA ou pronto-socorro.')
    }
  } else if (nivel === 'atencao') {
    base.push('Monitore seus sintomas pelas próximas 24 a 48 horas.')
    base.push('Beba bastante líquido e descanse.')
    base.push('Procure atendimento se a febre persistir ou novos sintomas aparecerem.')
  } else {
    base.push('Você não apresenta sinais preocupantes no momento.')
    base.push('Continue mantendo medidas de prevenção.')
    base.push('Em caso de qualquer alteração, refaça a triagem.')
  }

  const sintomas = respostas.sintomas || []
  if (sintomas.includes('manchas') || sintomas.includes('dor_corpo')) {
    base.push('Sintomas como manchas e dor no corpo podem indicar arbovirose — fique atento à dengue e chikungunya.')
  }
  if (sintomas.includes('tosse') || sintomas.includes('falta_ar')) {
    base.push('Sintomas respiratórios podem indicar gripe ou COVID-19 — use máscara para proteger pessoas próximas.')
  }

  const exposicoes = respostas.exposicao || []
  if (exposicoes.includes('agua_parada')) {
    base.push('Inspecione sua casa: elimine água parada e use repelente nas próximas semanas.')
  }

  return base
}
