import { useContext, useState, useEffect } from 'react'
import estilos from './Simulados.module.css'
import { HiOutlinePlay, HiOutlineAcademicCap, HiOutlineClipboardList, HiOutlineClock } from 'react-icons/hi'
import { listarNiveis, iniciarSimulado, type Nivel, type SimuladoIniciado } from '../servicos/simuladosServico'
import { LayoutContexto } from '../contextos/LayoutContexto'
import { Carregando } from '../componentes/estado/Carregando'
import { ErroCarregamento } from '../componentes/estado/ErroCarregamento'

export function Simulados() {
    const { usuarioContexto } = useContext(LayoutContexto)

    const [niveis, setNiveis] = useState<Nivel[]>([])
    const [carregandoNiveis, setCarregandoNiveis] = useState(true)
    const [erroNiveis, setErroNiveis] = useState<string | null>(null)

    const [idNivelSelecionado, setIdNivelSelecionado] = useState<number | null>(null)
    const [quantidade, setQuantidade] = useState<10 | 15 | 20>(10)

    const [iniciando, setIniciando] = useState(false)
    const [erroInicio, setErroInicio] = useState<string | null>(null)
    const [simuladoIniciado, setSimuladoIniciado] = useState<SimuladoIniciado | null>(null)

    useEffect(() => {
        listarNiveis()
            .then((lista) => {
                setNiveis(lista)
                if (lista.length > 0) setIdNivelSelecionado(lista[0].idNivel)
            })
            .catch((erro) => setErroNiveis(erro instanceof Error ? erro.message : 'Não foi possível carregar os níveis.'))
            .finally(() => setCarregandoNiveis(false))
    }, [])

    const iniciar = async () => {
        if (!usuarioContexto || idNivelSelecionado === null) return

        setIniciando(true)
        setErroInicio(null)

        try {
            const resultado = await iniciarSimulado(idNivelSelecionado, quantidade)
            setSimuladoIniciado(resultado)
        } catch (erro) {
            setErroInicio(erro instanceof Error ? erro.message : 'Não foi possível iniciar o simulado agora.')
        } finally {
            setIniciando(false)
        }
    }

    if (carregandoNiveis) {
        return (
            <div className={estilos.conteiner}>
                <Carregando texto="Carregando níveis..." />
            </div>
        )
    }

    if (erroNiveis) {
        return (
            <div className={estilos.conteiner}>
                <ErroCarregamento mensagem={erroNiveis} aoTentarNovamente={() => window.location.reload()} />
            </div>
        )
    }

    // TODO: quando a tela de "responder questões" existir, trocar este bloco
    // por navegacao(`/principal/simulados/${simuladoIniciado.idResultado}`)
    if (simuladoIniciado) {
        return (
            <div className={estilos.conteiner}>
                <div className={estilos.cartao}>
                    <span className={estilos.selo}>Simulado iniciado</span>
                    <h1 className={estilos.titulo}>{simuladoIniciado.titulo}</h1>
                    <p className={estilos.texto}>
                        {simuladoIniciado.quantidadeQuestoes} questões
                        {simuladoIniciado.tempoLimite ? ` · tempo limite de ${simuladoIniciado.tempoLimite}` : ''}.
                    </p>
                    <p className={estilos.texto}>
                        A tela de responder as questões ainda está em construção — por enquanto,
                        seu simulado (nº {simuladoIniciado.idResultado}) já está registrado no banco.
                    </p>
                </div>
            </div>
        )
    }

    return (
        <div className={estilos.conteiner}>
            <div className={estilos.cartao}>

                <span className={estilos.selo}>Simulado OBA</span>
                <h1 className={estilos.titulo}>Pronto para testar seus conhecimentos?</h1>
                <p className={estilos.texto}>
                    Monte um simulado com questões de provas anteriores da OBA, treine no
                    seu ritmo e acompanhe sua taxa de acertos ao final.
                </p>

                <div className={estilos.opcoes}>
                    <div className={estilos.opcao}>
                        <HiOutlineAcademicCap size={20} className={estilos.opcaoIcone} />
                        <div>
                            <p className={estilos.opcaoRotulo}>Nível</p>
                            <select
                                className={estilos.opcaoValor}
                                value={idNivelSelecionado ?? ''}
                                onChange={(e) => setIdNivelSelecionado(Number(e.target.value))}
                            >
                                {niveis.map((nivel) => (
                                    <option key={nivel.idNivel} value={nivel.idNivel}>
                                        {nivel.descricao}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className={estilos.opcao}>
                        <HiOutlineClipboardList size={20} className={estilos.opcaoIcone} />
                        <div>
                            <p className={estilos.opcaoRotulo}>Questões</p>
                            <select
                                className={estilos.opcaoValor}
                                value={quantidade}
                                onChange={(e) => setQuantidade(Number(e.target.value) as 10 | 15 | 20)}
                            >
                                <option value={10}>10 questões</option>
                            </select>
                        </div>
                    </div>

                    <div className={estilos.opcao}>
                        <HiOutlineClock size={20} className={estilos.opcaoIcone} />
                        <div>
                            <p className={estilos.opcaoRotulo}>Tempo</p>
                            <p className={estilos.opcaoValor}>Definido automaticamente pelo nível</p>
                        </div>
                    </div>
                </div>

                {erroInicio && <p className={estilos.erro}>{erroInicio}</p>}

                <button className={estilos.botao} onClick={iniciar} disabled={iniciando || idNivelSelecionado === null}>
                    <HiOutlinePlay size={18} />
                    {iniciando ? 'Iniciando...' : 'Iniciar Simulado'}
                </button>

            </div>
        </div>
    )
}