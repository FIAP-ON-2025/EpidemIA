import Container from "../componentes/layout/Container";
import Botao from "../componentes/ui/Botao";
import { usarNavegacao } from "../contextos/ContextoNavegacao";

import fotoAndre from "../assets/andre.jpeg";
import fotoElizabeth from "../assets/elizabeth.jpeg";
import fotoLucas from "../assets/lucas.jpeg";
import fotoIris from "../assets/iris.jpeg";
import fotoFelipe from "../assets/felipe.jpeg";

const blocos = [
  {
    emoji: "🛰️",
    titulo: "Veja os riscos",
    texto:
      "Escolha sua cidade e descubra quais epidemias estão em alerta agora.",
  },
  {
    emoji: "📖",
    titulo: "Entenda os sintomas",
    texto:
      "Sintomas, prevenção e quando procurar atendimento — em linguagem simples.",
  },
  {
    emoji: "🏥",
    titulo: "Encontre atendimento",
    texto: "UPAs, UBSs e hospitais perto de você, com endereço e contato.",
  },
];

const equipe = [
  {
    id: 1,
    nome: "André Luis Pinho Costa",
    funcao:
      "Organização de Projeto, Pesquisa Temática & Desenvolvimento Front-End",
    descricao:
      "Responsável pelo alinhamento das entregas e reuniões, pesquisa e direcionamento estratégico da temática do projeto com base nas diretrizes da empresa parceira, e atuação no desenvolvimento e adaptação do layout da interface gráfica.",
    foto: fotoAndre,
  },
  {
    id: 2,
    nome: "Elizabeth Alves da Silva",
    funcao: "Planejamento de Pitch, Comunicação & Revisão Colaborativa",
    descricao:
      "Participação ativa no alinhamento do projeto, roteirização, gravação e apresentação do Pitch em vídeo, colaborando também na revisão de concordância e ajustes de conteúdo do grupo.",
    foto: fotoElizabeth,
  },
  {
    id: 3,
    nome: "Lucas Mateus Celestino Vieira",
    funcao: "Elaboração de Documentação Técnica & Articulação de Ideias",
    descricao:
      "Participação ativa nas reuniões de alinhamento para contribuição no desenvolvimento da ideia, sendo o responsável exclusivo pela confecção, escrita e formatação do relatório técnico em formato PDF.",
    foto: fotoLucas,
  },
  {
    id: 4,
    nome: "Iris Alves de Cicco Benfatti",
    funcao:
      "Validação de Interface, Controle de Qualidade (QA) & Revisão Colaborativa",
    descricao:
      "Responsável pelos testes práticos de usabilidade e responsividade das páginas, além de auxiliar ativamente o grupo na revisão final de concordância e refinamento do site.",
    foto: fotoIris,
  },
  {
    id: 5,
    nome: "Felipe Meneguzzi",
    funcao: "Desenvolvimento Front-End, Edição Audiovisual & Deploy",
    descricao:
      "Responsável pela arquitetura e estruturação core do código em React, publicação da plataforma em ambiente de produção (deploy), edição e integração do Pitch em vídeo e fechamento do pacote para a entrega final.",
    foto: fotoFelipe,
  },
];

export default function SobreProjeto() {
  const { navegar } = usarNavegacao();

  return (
    <>
      <section className="bg-gradient-to-b from-primaria-50 to-fundo pt-12 pb-20 sm:pt-20 sm:pb-28">
        <Container>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-primaria-200 text-primaria-700 text-xs font-semibold mb-6">
                <span className="w-2 h-2 rounded-full bg-primaria-500 animate-pulse"></span>
                Monitor de epidemias em tempo real
              </span>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-texto leading-tight mb-6">
                Saiba quais epidemias{" "}
                <span className="text-primaria-600">precisam de atenção</span>{" "}
                perto de você.
              </h1>

              <p className="text-lg text-slate-600 mb-8 leading-relaxed max-w-xl">
                Uma plataforma que traduz dados oficiais de saúde em informação
                clara, acolhedora e útil — para você se proteger e proteger quem
                ama.
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <Botao tamanho="grande" onClick={() => navegar("radar")}>
                  Ver radar da minha região
                  <svg
                    viewBox="0 0 24 24"
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </Botao>
                <Botao
                  variante="secundario"
                  tamanho="grande"
                  onClick={() => navegar("triagem")}
                >
                  Fazer triagem rápida
                </Botao>
              </div>
            </div>

            <div className="hidden lg:flex justify-center">
              <IlustracaoSaude />
            </div>
          </div>
        </Container>
      </section>

      <section className="-mt-12 mb-12">
        <Container>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {blocos.map((b) => (
              <div
                key={b.titulo}
                className="bg-white rounded-cartao shadow-cartao border border-slate-100 p-6 hover:-translate-y-1 hover:shadow-lg transition-all"
              >
                <span className="text-3xl block mb-3" aria-hidden>
                  {b.emoji}
                </span>
                <h3 className="text-lg font-bold text-texto mb-2">
                  {b.titulo}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {b.texto}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-12 bg-white border-y border-slate-200">
        <Container>
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-texto mb-4">
              Informação confiável, na hora certa.
            </h2>
            <p className="text-slate-600 mb-8">
              Cruzamos dados públicos do <strong>DataSUS</strong>, do{" "}
              <strong>Ministério da Saúde</strong> e das secretarias estaduais
              para te mostrar — sem números complicados — o que realmente
              importa.
            </p>
            <div className="flex flex-wrap justify-center gap-3 text-sm">
              <span className="px-3 py-1.5 rounded-full bg-slate-100 text-slate-700">
                📊 DataSUS
              </span>
              <span className="px-3 py-1.5 rounded-full bg-slate-100 text-slate-700">
                🏛️ Ministério da Saúde
              </span>
              <span className="px-3 py-1.5 rounded-full bg-slate-100 text-slate-700">
                📍 CNES
              </span>
              <span className="px-3 py-1.5 rounded-full bg-slate-100 text-slate-700">
                🗺️ Google Maps
              </span>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-16 bg-white border-b border-slate-200">
        <Container>
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7">
              <span className="text-xs font-bold uppercase tracking-wider text-primaria-600 bg-primaria-50 px-3 py-1 rounded-full">
                Nossa Missão
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-texto mt-3 mb-6 leading-tight">
                O que é o Radar Epidemiológico?
              </h2>
              <p className="text-base text-slate-600 leading-relaxed text-justify">
                O Radar Epidemiológico é uma plataforma desenvolvida para
                facilitar o acesso da população a informações sobre surtos e
                epidemias de forma simples, organizada e acessível. O sistema
                utiliza inteiramente dados públicos da área da saúde para
                apresentar alertas epidemiológicos, orientações de prevenção e
                informações relevantes para os usuários. Além disso, hospitais,
                UBSs, UPAs e outros pontos de atendimento também são exibidos
                através desses dados públicos, auxiliando no direcionamento dos
                usuários e contribuindo para a conscientização e apoio à saúde
                pública por meio da tecnologia.
              </p>
            </div>

            <div className="lg:col-span-5 bg-slate-50 border-2 border-slate-200 p-6 rounded-cartao shadow-sm">
              <h3 className="text-lg font-bold text-texto mb-4">
                Pilares do Nosso Site
              </h3>
              <ul className="space-y-4 text-sm text-slate-600">
                <li className="flex items-start gap-3">
                  <span className="text-primaria-600 font-bold">✓</span>
                  <span>Transparência com dados públicos oficiais.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primaria-600 font-bold">✓</span>
                  <span>Linguagem acessível e direto ao ponto.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primaria-600 font-bold">✓</span>
                  <span>Orientação rápida para unidades de saúde.</span>
                </li>
              </ul>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-16 bg-slate-50">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-bold text-texto mb-3">
              Quem Desenvolveu o Projeto
            </h2>
            <p className="text-slate-600">
              Estas são as mentes e códigos por trás do nosso portal, criados
              por nossa equipe de estudantes de Engenharia de Software da FIAP.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 items-stretch">
            {equipe.map((membro) => (
              <div
                key={membro.id}
                className="bg-white rounded-cartao shadow-md border-2 border-slate-200 p-5 flex flex-col items-center text-center hover:-translate-y-2 hover:shadow-2xl hover:border-primaria-500 transition-all duration-300 h-full"
              >
                <div className="w-24 h-24 rounded-full overflow-hidden mb-4 border-4 border-primaria-600 shadow-md shrink-0">
                  <img
                    src={membro.foto}
                    alt={membro.nome}
                    className="w-full h-full object-cover"
                  />
                </div>

                <h3 className="text-base font-extrabold text-texto mb-1 min-h-[3rem] flex items-center justify-center w-full">
                  {membro.nome}
                </h3>

                <span className="text-xs font-bold px-2.5 py-2 rounded-md bg-primaria-50 text-primaria-700 border border-primaria-200 block w-full min-h-[3.5rem] flex items-center justify-center my-2 shadow-sm">
                  {membro.funcao}
                </span>

                <p className="text-xs text-slate-600 tracking-normal leading-relaxed mt-3 text-center flex-grow min-h-[150px] px-1">
                  {membro.descricao}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}

function IlustracaoSaude() {
  return (
    <svg viewBox="0 0 400 400" className="w-full max-w-md" aria-hidden>
      <defs>
        <linearGradient id="gradPrincipal" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#7DD3FC" />
          <stop offset="100%" stopColor="#0284C7" />
        </linearGradient>
      </defs>
      <circle
        cx="200"
        cy="200"
        r="170"
        fill="url(#gradPrincipal)"
        opacity="0.15"
      />
      <circle
        cx="200"
        cy="200"
        r="130"
        fill="url(#gradPrincipal)"
        opacity="0.25"
      />
      <circle
        cx="200"
        cy="200"
        r="90"
        fill="url(#gradPrincipal)"
        opacity="0.4"
      />
      <g transform="translate(200 200)">
        <path
          d="M -50 0 L -20 0 L -10 -30 L 10 30 L 20 0 L 50 0"
          fill="none"
          stroke="#0369A1"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <circle
        cx="200"
        cy="200"
        r="170"
        fill="none"
        stroke="#0EA5E9"
        strokeWidth="2"
        strokeDasharray="4 8"
        opacity="0.6"
      >
        <animateTransform
          attributeName="transform"
          type="rotate"
          from="0 200 200"
          to="360 200 200"
          dur="40s"
          repeatCount="indefinite"
        />
      </circle>
      <g>
        <circle cx="80" cy="120" r="8" fill="#F59E0B" />
        <circle cx="320" cy="160" r="6" fill="#DC2626" />
        <circle cx="290" cy="290" r="9" fill="#16A34A" />
        <circle cx="100" cy="290" r="7" fill="#0EA5E9" />
      </g>
    </svg>
  );
}
