import { Link } from 'react-router-dom'; 
import estilos from './Home.module.css';
import { EstrelasFundo } from '../componentes/layout/Estrelasfundo';
import { Planeta } from '../componentes/layout/Planeta';
import { Jupiter } from '../componentes/layout/Jupiter';

export function Home() {
  // Configuração dos itens do menu
  const menuItems = [
    { label: 'Home', path: '/' },
    { label: 'Sobre', path: '/sobre' },
    { label: 'OBA', path: '/oba' },
    { label: 'Contato', path: '/contato' },
  ];

  return (
    <div className={estilos.conteiner}>
      <EstrelasFundo />

      {/* HEADER */}
      <header className={estilos.header}>
        <div className={estilos.headerConteudo}>
          {/* Logo */}
          <div className={estilos.logo}>
            <Link to="/" className={estilos.logotexto}>
              Hyperion
            </Link>
          </div>

          {/* Menu de Navegação */}
          <nav className={estilos.nav}>
            <ul className={estilos.menu}>
              {menuItems.map((item, index) => (
                <li key={index}>
                  <Link to={item.path} className={estilos.animacaomenuhover}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Botão Login */}
          <div className={estilos.login}>
            <Link to="/login" className={estilos.botaologincadastre}>
              Login
            </Link>
          </div>
        </div>
      </header>

      {/* MAIN */}
      <main className={estilos.main}>
        {/* Texto de Boas-Vindas em Liquid Glass Container */}
        <div className={estilos.textoBoasVindas}>
          <h1 className={estilos.titulo}>
            Bem-Vindo ao <span className={estilos.tituloDestaque}>HYPERION</span>,<br />
            seu software de estudos sobre astronomia
          </h1>
          
          <div className={estilos.containerBotao}>
            <Link 
              to="/cadastro"
              className={estilos.botaologincadastre} 
            >
              Cadastre-se
            </Link>
          </div>
        </div>

        {/* Espaço do Planeta */}
        <div className={estilos.containerPlaneta}>
          <div className={estilos.planeta}>
            <Planeta />
          </div>
        </div>
      </main>

      {/* FOGUETE E LISTA DE CONTEÚDO */}
      <section className={estilos.secaoConteudo}>
        {/* Lado Esquerdo: Espaço do Foguete */}
        <div className={estilos.containerFoguete}>
          <div className={estilos.foguete}>
            <Jupiter tamanho={370} />
          </div>
        </div>

        {/* Lado Direito: Lista de Conteúdos em Liquid Glass Container */}
        <div className={estilos.listaConteudo}>
          <h2 className={estilos.tituloSecao}>
            Conteúdo
          </h2>

          <ul className={estilos.itensLista}>
            {[
              { title: "Conteúdos Descomplicados", desc: "Matérias organizadas e explicadas direto ao ponto, sem enrolação." },
              { title: "Simulados Reais", desc: "Treine com questões de exames anteriores e prepare-se para o dia da prova." },
              { title: "Gráficos de Evolução", desc: "Monitore seu progresso visualmente e veja sua evolução decolar." },
              { title: "Taxa de Acertos", desc: "Saiba exatamente onde você está brilhando e quais pontos precisa revisar." }
            ].map((item, index) => (
              <li key={index} className={estilos.itemCard}>
                <div className={estilos.checkIconBox}>
                  <span className={estilos.checkIcon}>✓</span>
                </div>
                <div>
                  <h3 className={estilos.itemTitulo}>
                    {item.title}:
                  </h3>
                  <p className={estilos.itemDescricao}>
                    {item.desc}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}