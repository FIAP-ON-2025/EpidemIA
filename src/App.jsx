import Cabecalho from "./componentes/layout/Cabecalho";
import Rodape from "./componentes/layout/Rodape";
import Index from "./paginas/Index";
import Radar from "./paginas/Radar";
import DetalheEpidemia from "./paginas/DetalheEpidemia";
import LocaisAtendimento from "./paginas/LocaisAtendimento";
import Triagem from "./paginas/Triagem";
import {
  ProvedorNavegacao,
  usarNavegacao,
} from "./contextos/ContextoNavegacao";
import { ProvedorRegiao } from "./contextos/ContextoRegiao";

function RenderizarPagina() {
  const { pagina } = usarNavegacao();

  switch (pagina) {
    case "sobre-o-projeto":
      return <Index />;
    case "radar":
      return <Radar />;
    case "detalhe-epidemia":
      return <DetalheEpidemia />;
    case "locais":
      return <LocaisAtendimento />;
    case "triagem":
      return <Triagem />;
    default:
      return <Index />;
  }
}

export default function App() {
  return (
    <ProvedorNavegacao>
      <ProvedorRegiao>
        <div className="min-h-screen flex flex-col">
          <Cabecalho />
          <main className="flex-1">
            <RenderizarPagina />
          </main>
          <Rodape />
        </div>
      </ProvedorRegiao>
    </ProvedorNavegacao>
  );
}
