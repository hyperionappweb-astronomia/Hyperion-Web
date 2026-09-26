import { Link } from 'react-router-dom'
import estilos from './Conteudo.module.css'
import { HiOutlineLockClosed } from 'react-icons/hi'
import { useAsyncData } from '../../hooks/useAsyncData'
import { buscarNiveis } from '../../servicos/conteudoServico'
import { Carregando } from '../../componentes/estado/Carregando'
import { ErroCarregamento } from '../../componentes/estado/ErroCarregamento'


//EM FASE DE TESTE;
export function Conteudo() {
    const { dado: niveis, estado, erro, recarregar } = useAsyncData(buscarNiveis, [])

    return (
        <div className={estilos.conteiner}>

            <header className={estilos.cabecalho}>
                <h1 className={estilos.titulo}>Conteúdo</h1>
                <p className={estilos.subtitulo}>Escolha um nível da OBA para começar a estudar.</p>
            </header>

            {estado === 'carregando' && (
                <Carregando texto="Carregando os níveis..." />
            )}

            {estado === 'erro' && (
                <ErroCarregamento mensagem={erro ?? undefined} aoTentarNovamente={recarregar} />
            )}

            {estado === 'sucesso' && niveis && (
                <section className={estilos.grade}>
                    {niveis.map((nivel) => {
                        const conteudoCard = (
                            <>
                                <div className={estilos.cardTopo}>
                                    <span className={estilos.numero}>{nivel.numero}</span>
                                    {nivel.bloqueado && (
                                        <span className={estilos.badge}>
                                            <HiOutlineLockClosed size={12} />
                                            Em breve
                                        </span>
                                    )}
                                </div>

                                <h2 className={estilos.cardTitulo}>Nível {nivel.numero}</h2>
                                <p className={estilos.cardPublico}>{nivel.descricao}</p>
                            </>
                        )

                        return nivel.bloqueado ? (
                            <div key={nivel.idNivel} className={estilos.card}>
                                {conteudoCard}
                            </div>
                        ) : (
                            <Link
                                key={nivel.idNivel}
                                to={`/principal/conteudo/${nivel.idNivel}`}
                                className={estilos.card}
                            >
                                {conteudoCard}
                            </Link>
                        )
                    })}
                </section>
            )}

        </div>
    )
}