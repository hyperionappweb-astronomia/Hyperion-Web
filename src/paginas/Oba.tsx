import { Link } from 'react-router-dom'; 
import estilos from './Oba.module.css'
import {
  HiOutlineGlobeAlt,
  HiOutlineSparkles,
  HiOutlineSun,
  HiOutlineAcademicCap,
  HiOutlineBadgeCheck,
} from 'react-icons/hi'
import { EstrelasFundo } from '../componentes/layout/Estrelasfundo';
import { Foguete } from '../componentes/layout/Foguete';

const niveis = [
  {
    numero: '1',
    icone: <HiOutlineGlobeAlt size={22} />,
    publico: '1º ao 3º ano · Ensino Fundamental',
    descricao: 'Conceitos básicos e lúdicos sobre a Terra, o Sol e a Lua.',
  },
  {
    numero: '2',
    icone: <HiOutlineSparkles size={22} />,
    publico: '4º e 5º ano · Ensino Fundamental',
    descricao: 'Os movimentos celestes e a importância da nossa atmosfera.',
  },
  {
    numero: '3',
    icone: <HiOutlineSun size={22} />,
    publico: '6º ao 9º ano · Ensino Fundamental',
    descricao: 'O Sistema Solar, a gravitação e as primeiras missões espaciais.',
  },
  {
    numero: '4',
    icone: <HiOutlineAcademicCap size={22} />,
    publico: 'Qualquer série · Ensino Médio',
    descricao: 'Astronomia teórica avançada unida a noções de astronáutica.',
  },
]

export function Oba() {
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

      {/* HERO */}
      <section className={estilos.hero}>
        

        <h1 className={estilos.titulo}>
          O que é a <span className={estilos.tituloDestaque}>OBA</span>?
        </h1>

        <p className={estilos.paragrafo}>
          A Olimpíada Brasileira de Astronomia e Astronáutica (OBA) é um dos maiores
          eventos científicos escolares do Brasil. Realizada anualmente em fase única,
          ela desafia estudantes de escolas públicas e privadas a testarem seus
          conhecimentos sobre o cosmos, o Sistema Solar, a exploração espacial e a
          física que rege o universo.
        </p>

        <p className={estilos.paragrafo}>
          Além de premiar os alunos com medalhas de ouro, prata e bronze de grande
          valor acadêmico, a OBA serve como a principal porta de entrada para as
          seletivas das olimpíadas internacionais de astronomia.
        </p>

        
      </section>

      {/* NÍVEIS */}
      <section className={estilos.secaoNiveis}>

        <div className={estilos.cabecalhoNiveis}>
          <h2 className={estilos.tituloNiveis}>Níveis OBA</h2>
          <p className={estilos.subtituloNiveis}>
            A prova é dividida em 4 níveis, cada um pensado para uma faixa escolar diferente.
          </p>
        </div>

        <div className={estilos.grade}>
          {niveis.map((nivel) => (
            <div key={nivel.numero} className={estilos.card}>
              <div className={estilos.cardTopo}>
                <span className={estilos.numero}>{nivel.icone}</span>
                <span className={estilos.badge}>Nível {nivel.numero}</span>
              </div>

              <p className={estilos.cardPublico}>{nivel.publico}</p>
              <p className={estilos.cardDescricao}>{nivel.descricao}</p>
            </div>
          ))}
        </div>

      </section>

      {/* CTA */}
      <section className={estilos.cta}>
        <div className={estilos.ctaConteudo}>
          <h3 className={estilos.ctaTitulo}>Pronto para começar sua jornada pelo cosmos?</h3>
          <p className={estilos.ctaTexto}>
            Crie sua conta gratuita e comece a estudar para a OBA agora mesmo.
          </p>
        </div>
        <Link to="/cadastro" className={estilos.ctaBotao}>
          Cadastre-se grátis
        </Link>
      </section>

      </div>
  )
}
