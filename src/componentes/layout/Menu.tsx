import estilos from './Menu.module.css'
import logo from '../../assets/image/LogoBranca.png'
import { useContext } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { LayoutContexto } from '../../contextos/LayoutContexto'
import { sair } from '../../servicos/autenticacao'
import {
    HiHome,
    HiBookOpen,
    HiViewBoards,
    HiChartPie,
    HiCog,
    HiUser,
    HiChevronLeft,
    HiChevronRight,
    HiOutlineLogout,
    HiChevronRight as HiArrow,
} from 'react-icons/hi'

interface MenuLinkProps {
    to: string;
    icon: React.ReactNode;
    label: string;
    ativo: boolean;
    aberto: boolean;
}

export function Menu() {
    const location = useLocation()
    const navegacao = useNavigate()
    const { menuAbertoContexto, setMenuAbertoContexto, usuarioContexto, setUsuarioContexto } = useContext(LayoutContexto)
    const verificarAtivo = (path: string) => location.pathname === path

    const sairDaConta = async () => {
        try {
            await sair()
        } finally {
            setUsuarioContexto(null)
            navegacao('/')
        }
    }

    return (
        <aside 
            className={estilos.conteiner}
            style={{ width: menuAbertoContexto ? '250px' : '80px' }}
        >
            
            <button 
                className={estilos.botaoToggle} 
                onClick={() => setMenuAbertoContexto(!menuAbertoContexto)}
                style={{ left: menuAbertoContexto ? '236px' : '66px' }}
            >
                {menuAbertoContexto
                    ? <HiChevronLeft size={16} />
                    : <HiChevronRight size={16} />
                }
            </button>

            {/* TOPO: LOGO */}
            <div className={estilos.topo}>
                <div className={estilos.logoIcon}>
                    <img src={logo} alt="Logo" />
                </div>
                
            </div>

            {/* ITENS DO MENU */}
            <nav className={estilos.itemConteiner}>
                <MenuLink 
                    to="/principal" 
                    label="Início" 
                    ativo={verificarAtivo('/principal')} 
                    aberto={menuAbertoContexto}
                    icon={<HiHome size={20} />} 
                />
                <MenuLink 
                    to="/principal/conteudo" 
                    label="Conteúdo" 
                    ativo={verificarAtivo('/principal/conteudo')} 
                    aberto={menuAbertoContexto}
                    icon={<HiBookOpen size={20} />} 
                />
                <MenuLink 
                    to="/principal/questoes" 
                    label="Questões" 
                    ativo={verificarAtivo('/principal/questoes')} 
                    aberto={menuAbertoContexto}
                    icon={<HiViewBoards size={20} />} 
                />
                <MenuLink 
                    to="/principal/simulados" 
                    label="Simulados" 
                    ativo={verificarAtivo('/principal/simulados')} 
                    aberto={menuAbertoContexto}
                    icon={<HiChartPie size={20} />} 
                />
            </nav>

            {/* RODAPÉ DO MENU */}
            <div className={estilos.rodapeMenu}>
                <Link
                    className={`${estilos.item} ${verificarAtivo('/principal/configuracoes') ? estilos.ativo : ''}`}
                    to="/principal/configuracoes"
                >
                    <span className={estilos.iconeWrapper}>
                        <HiCog size={20} />
                    </span>
                    {menuAbertoContexto && <span className={estilos.rotulo}>Configuração</span>}
                </Link>

                <div className={estilos.perfil}>
                    <div className={estilos.avatar}>
                        <HiUser size={20} />
                    </div>
                    {menuAbertoContexto && (
                        <div className="flex-1 ml-3 overflow-hidden">
                            <p className="text-white text-sm font-medium truncate">
                                {usuarioContexto?.nome || 'Usuário'}
                            </p>
                        </div>
                    )}
                    {menuAbertoContexto && (
                        <button
                            className={estilos.botaoSair}
                            onClick={sairDaConta}
                            title="Sair"
                        >
                            <HiOutlineLogout size={18} />
                        </button>
                    )}
                </div>
            </div>
        </aside>
    )
}

function MenuLink({ to, icon, label, ativo, aberto }: MenuLinkProps) {
    return (
        <Link className={`${estilos.item} ${ativo ? estilos.ativo : ''}`} to={to}>
            <span className={estilos.iconeWrapper}>{icon}</span>
            {aberto && <span className={estilos.rotulo}>{label}</span>}
            {aberto && (
                <HiArrow className="ml-auto opacity-40" size={14} />
            )}
        </Link>
    )
}