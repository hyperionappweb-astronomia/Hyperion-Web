import { useContext, useState } from 'react'
import estilos from './Configuracoes.module.css'
import { LayoutContexto } from '../contextos/LayoutContexto'
import { HiOutlineUser, HiOutlineLockClosed, HiOutlineBell, HiOutlineCheckCircle } from 'react-icons/hi'
import { atualizarPerfil, atualizarSenha } from '../servicos/perfilServico'

export function Configuracoes() {
    const { usuarioContexto, setUsuarioContexto } = useContext(LayoutContexto)

    //--- Perfil ---
    const [nome, setNome] = useState(usuarioContexto?.nome ?? '')
    const [salvandoPerfil, setSalvandoPerfil] = useState(false)
    const [erroPerfil, setErroPerfil] = useState<string | null>(null)
    const [sucessoPerfil, setSucessoPerfil] = useState(false)

    const salvarPerfil = async () => {
        if (!usuarioContexto) return

        setSalvandoPerfil(true)
        setErroPerfil(null)
        setSucessoPerfil(false)

        try {
            await atualizarPerfil(usuarioContexto.id, { nome })
            setUsuarioContexto({ ...usuarioContexto, nome })
            setSucessoPerfil(true)
        } catch (erro) {
            setErroPerfil(erro instanceof Error ? erro.message : 'Não foi possível salvar suas alterações.')
        } finally {
            setSalvandoPerfil(false)
        }
    }

    // --- Segurança ---
    const [senhaAtual, setSenhaAtual] = useState('')
    const [novaSenha, setNovaSenha] = useState('')
    const [salvandoSenha, setSalvandoSenha] = useState(false)
    const [erroSenha, setErroSenha] = useState<string | null>(null)
    const [sucessoSenha, setSucessoSenha] = useState(false)

    const salvarSenha = async () => {
        if (!usuarioContexto) return

        setSalvandoSenha(true)
        setErroSenha(null)
        setSucessoSenha(false)

        try {
            await atualizarSenha(usuarioContexto.email, senhaAtual, novaSenha)
            setSenhaAtual('')
            setNovaSenha('')
            setSucessoSenha(true)
        } catch (erro) {
            setErroSenha(erro instanceof Error ? erro.message : 'Não foi possível atualizar sua senha.')
        } finally {
            setSalvandoSenha(false)
        }
    }

    // --- Notificações ---
    const [lembretes, setLembretes] = useState(true)
    const [novidades, setNovidades] = useState(true)

    return (
        <div className={estilos.conteiner}>

            <header className={estilos.cabecalho}>
                <h1 className={estilos.titulo}>Configurações</h1>
                <p className={estilos.subtitulo}>Gerencie sua conta e preferências do HYPERION.</p>
            </header>

            <div className={estilos.secoes}>

                {/* Perfil */}
                <section className={estilos.card}>
                    <div className={estilos.cardCabecalho}>
                        <span className={estilos.icone}><HiOutlineUser size={18} /></span>
                        <h2 className={estilos.cardTitulo}>Perfil</h2>
                    </div>

                    <div className={estilos.campo}>
                        <label className={estilos.rotulo}>Nome</label>
                        <input
                            className={estilos.input}
                            type="text"
                            placeholder="Seu nome"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                        />
                    </div>

                    <div className={estilos.campo}>
                        <label className={estilos.rotulo}>E-mail</label>
                        <input
                            className={estilos.input}
                            type="email"
                            value={usuarioContexto?.email ?? ''}
                            disabled
                        />
                    </div>

                    {erroPerfil && <p className={estilos.erro}>{erroPerfil}</p>}
                    {sucessoPerfil && (
                        <p className={estilos.sucesso}>
                            <HiOutlineCheckCircle size={15} /> Alterações salvas.
                        </p>
                    )}

                    <button className={estilos.botao} onClick={salvarPerfil} disabled={salvandoPerfil}>
                        {salvandoPerfil ? 'Salvando...' : 'Salvar alterações'}
                    </button>
                </section>

                {/* Segurança */}
                <section className={estilos.card}>
                    <div className={estilos.cardCabecalho}>
                        <span className={estilos.icone}><HiOutlineLockClosed size={18} /></span>
                        <h2 className={estilos.cardTitulo}>Segurança</h2>
                    </div>

                    <div className={estilos.campo}>
                        <label className={estilos.rotulo}>Senha atual</label>
                        <input
                            className={estilos.input}
                            type="password"
                            placeholder="••••••"
                            value={senhaAtual}
                            onChange={(e) => setSenhaAtual(e.target.value)}
                        />
                    </div>

                    <div className={estilos.campo}>
                        <label className={estilos.rotulo}>Nova senha</label>
                        <input
                            className={estilos.input}
                            type="password"
                            placeholder="••••••"
                            value={novaSenha}
                            onChange={(e) => setNovaSenha(e.target.value)}
                        />
                    </div>

                    {erroSenha && <p className={estilos.erro}>{erroSenha}</p>}
                    {sucessoSenha && (
                        <p className={estilos.sucesso}>
                            <HiOutlineCheckCircle size={15} /> Senha atualizada.
                        </p>
                    )}

                    <button className={estilos.botao} onClick={salvarSenha} disabled={salvandoSenha}>
                        {salvandoSenha ? 'Atualizando...' : 'Atualizar senha'}
                    </button>
                </section>

                {/* Notificações */}
                <section className={estilos.card}>
                    <div className={estilos.cardCabecalho}>
                        <span className={estilos.icone}><HiOutlineBell size={18} /></span>
                        <h2 className={estilos.cardTitulo}>Notificações</h2>
                    </div>

                    <label className={estilos.opcaoToggle}>
                        <span>Lembretes de estudo por e-mail</span>
                        <input
                            type="checkbox"
                            checked={lembretes}
                            onChange={(e) => setLembretes(e.target.checked)}
                            className={estilos.checkbox}
                        />
                    </label>

                    <label className={estilos.opcaoToggle}>
                        <span>Novidades sobre a OBA</span>
                        <input
                            type="checkbox"
                            checked={novidades}
                            onChange={(e) => setNovidades(e.target.checked)}
                            className={estilos.checkbox}
                        />
                    </label>
                </section>

            </div>

        </div>
    )
}