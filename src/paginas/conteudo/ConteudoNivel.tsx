import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import estilos from './Conteudo.module.css'
import { HiOutlineArrowLeft, HiOutlineDocumentText } from 'react-icons/hi'
import { useAsyncData } from '../../hooks/useAsyncData'
import { buscarConteudosPorNivel, gerarUrlPdf } from '../../servicos/conteudoServico'
import { Carregando } from '../../componentes/estado/Carregando'
import { ErroCarregamento } from '../../componentes/estado/ErroCarregamento'

export function ConteudoNivel() {
    const { idNivel } = useParams<{ idNivel: string }>()
    const idNivelNumero = Number(idNivel)

    const { dado: conteudos, estado, erro, recarregar } = useAsyncData(
        () => buscarConteudosPorNivel(idNivelNumero),
        [idNivelNumero]
    )

    const [abrindoId, setAbrindoId] = useState<number | null>(null)
    const [erroAbrir, setErroAbrir] = useState<string | null>(null)

    const abrirPdf = async (idConteudo: number, pdfPath: string | null) => {
        if (!pdfPath) return

        setAbrindoId(idConteudo)
        setErroAbrir(null)

        try {
            const url = await gerarUrlPdf(pdfPath)
            window.open(url, '_blank', 'noopener,noreferrer')
        } catch (erro) {
            setErroAbrir(erro instanceof Error ? erro.message : 'Não foi possível abrir este PDF.')
        } finally {
            setAbrindoId(null)
        }
    }

    return (
        <div className={estilos.conteiner}>

            <header className={estilos.cabecalho}>
                <Link to="/principal/conteudo" className={estilos.voltar}>
                    <HiOutlineArrowLeft size={16} /> Voltar aos níveis
                </Link>
                <h1 className={estilos.titulo}>Conteúdos</h1>
                <p className={estilos.subtitulo}>Toque em um conteúdo para abrir o PDF.</p>
            </header>

            {estado === 'carregando' && <Carregando texto="Carregando conteúdos..." />}

            {estado === 'erro' && (
                <ErroCarregamento mensagem={erro ?? undefined} aoTentarNovamente={recarregar} />
            )}

            {estado === 'sucesso' && conteudos && (
                <section className={estilos.grade}>
                    {conteudos.map((item) => (
                        <button
                            key={item.idConteudo}
                            className={estilos.card}
                            onClick={() => abrirPdf(item.idConteudo, item.pdfPath)}
                            disabled={!item.pdfPath || abrindoId === item.idConteudo}
                        >
                            <div className={estilos.cardTopo}>
                                <HiOutlineDocumentText size={22} />
                            </div>
                            <h2 className={estilos.cardTitulo}>{item.nomeConteudo}</h2>
                            {item.materia && <p className={estilos.cardPublico}>{item.materia}</p>}
                            {!item.pdfPath && <p className={estilos.cardLegenda}>PDF ainda não disponível</p>}
                            {abrindoId === item.idConteudo && <p className={estilos.cardLegenda}>Abrindo...</p>}
                        </button>
                    ))}
                </section>
            )}

            {erroAbrir && <p className={estilos.erro}>{erroAbrir}</p>}

        </div>
    )
}