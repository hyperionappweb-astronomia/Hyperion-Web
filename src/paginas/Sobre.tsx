import { Link } from 'react-router-dom'; 
import estilos from './Sobre.module.css';
import { FiUser, FiBook, FiClipboard, FiHelpCircle, FiUsers } from 'react-icons/fi';
import { BsBullseye } from 'react-icons/bs';
import { EstrelasFundo } from '../componentes/layout/Estrelasfundo';

export function Sobre() {
  // Configuração dos itens do menu
  const menuItems = [
    { label: 'Home', path: '/' },
    { label: 'Sobre', path: '/sobre' },
    { label: 'OBA', path: '/oba' },
    { label: 'Contato', path: '/contato' },
  ];

  // Funcionalidades do sistema, exibidas na seção abaixo
  const funcionalidades = [
    {
      icone: <FiClipboard size={22} />,
      titulo: 'Simulados',
      descricao: 'Monte simulados com questões sorteadas por nível e treine dentro do tempo real de prova.',
    },
    {
      icone: <FiHelpCircle size={22} />,
      titulo: 'Questões',
      descricao: 'Pratique questões avulsas, filtradas por assunto, com correção na hora.',
    },
    {
      icone: <FiUsers size={22} />,
      titulo: 'Área do Aluno',
      descricao: 'Acompanhe seu progresso, taxa de acertos e histórico de simulados em um só lugar.',
    },
  ];

  // Criadores do projeto — placeholders prontos para receber foto/avatar futuramente
  const criadores = [
    { nome: 'Juan Costa Da Silva' },
    { nome: 'Leandro Henrique Pereira' },
  ];

  function iniciais(nome: string) {
    return nome
      .split(' ')
      .filter(Boolean)
      .slice(0, 2)
      .map((parte) => parte[0])
      .join('')
      .toUpperCase();
  }

  return (
     <div className={estilos.conteiner}>
            <EstrelasFundo />

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

      {/* Título da seção */}
      <h1 className={estilos.tituloSecao}>Sobre Nós</h1>

      {/*Card*/ }

        <div className={estilos.card}>

          <div className={estilos.cardindividual}>
               <span className={estilos.iconecard}>
                <FiUser size={22} />
              </span>
              <p className={estilos.textocard}>Somos alunos da Etec De Hortolândia desenvolvendo um TCC.</p>
              <div className={estilos.linhacard}></div>
          </div>

          <div className={estilos.cardindividual}>
               <span className={estilos.iconecard}>
                <FiBook size={22} />
              </span>
              <p className={estilos.textocard}>Nossa Missão é democratizar e facilitar o acesso ao ensino de astronomia no Brasil.</p>
              <div className={estilos.linhacard}></div>
          </div>

          <div className={estilos.cardindividual}>
               <span className={estilos.iconecard}>
                <BsBullseye size={22} />
              </span>
              <p className={estilos.textocard}>O objetivo é de forma organizada e gratuita disponibilizar os conteúdos desta área.</p>
              <div className={estilos.linhacard}></div>
          </div>
          
      </div>

      {/* Ilustração do astronauta (placeholder para a arte final) 
      <div className={estilos.containerAstronauta}>
        <div className={estilos.astronauta}>
           Ilustração do astronauta vai aqui 
        </div>
      </div>
      
      */}

      {/* Funcionalidades do sistema */}
      <h2 className={estilos.tituloFuncionalidades}>O que você encontra no Hyperion</h2>

      <div className={estilos.gradeFuncionalidades}>
        {funcionalidades.map((f, index) => (
          <div key={index} className={estilos.cardFuncionalidade}>
            <span className={estilos.iconeFuncionalidade}>{f.icone}</span>
            <h3 className={estilos.tituloFuncionalidade}>{f.titulo}</h3>
            <p className={estilos.textoFuncionalidade}>{f.descricao}</p>
          </div>
        ))}
      </div>

      {/* Criadores do projeto */}
      <h2 className={estilos.tituloCriadores}>Quem criou o Hyperion</h2>

      <div className={estilos.gradeCriadores}>
        {criadores.map((c, index) => (
          <div key={index} className={estilos.cardCriador}>
            <div className={estilos.avatarCriador}>{iniciais(c.nome)}</div>
            <p className={estilos.nomeCriador}>{c.nome}</p>
          </div>
        ))}
      </div>

      </div>
  )
}