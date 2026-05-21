import Container from './Container'

export default function Rodape() {
  return (
    <footer className="mt-16 border-t border-slate-200 bg-white">
      <Container className="py-8 grid gap-6 md:grid-cols-3 text-sm text-slate-600">
        <div>
          <p className="font-semibold text-texto mb-2">EpidemiaRadar</p>
          <p>
            Plataforma educacional que traduz dados públicos de saúde em informação
            acessível ao paciente.
          </p>
        </div>

        <div>
          <p className="font-semibold text-texto mb-2">Fontes de dados</p>
          <ul className="space-y-1">
            <li>CNES / DataSUS</li>
            <li>Ministério da Saúde</li>
            <li>Secretarias estaduais</li>
          </ul>
        </div>

        <div>
          <p className="font-semibold text-texto mb-2">Importante</p>
          <p>
            As orientações aqui não substituem consulta médica. Em caso de
            urgência, ligue <strong>SAMU 192</strong>.
          </p>
        </div>
      </Container>

      <div className="border-t border-slate-200">
        <Container className="py-4 text-xs text-slate-500 text-center">
          © {new Date().getFullYear()} EpidemiaRadar · Projeto acadêmico
        </Container>
      </div>
    </footer>
  )
}
