import { useContext } from 'react'
import estilos from './AreaAluno.module.css'
import { LayoutContexto } from '../contextos/LayoutContexto'
import { useAsyncData } from '../hooks/useAsyncData'
import { buscarResumoAluno } from '../servicos/areaAlunoServico'
import { Carregando } from '../componentes/estado/Carregando'
import { ErroCarregamento } from '../componentes/estado/ErroCarregamento'
import {
    HiOutlineBookOpen,
    HiOutlineCheckCircle,
    HiOutlineChartPie,
    HiOutlineTrendingUp,
} from 'react-icons/hi'

export function AreaAluno() {
    const { usuarioContexto } = useContext(LayoutContexto)
    const nomeExibicao = usuarioContexto?.nome || 'Aluno'

    const { dado: resumo, estado, erro, recarregar } = useAsyncData(
        () => buscarResumoAluno(usuarioContexto?.id ?? ''),
        [usuarioContexto?.id]
    )

    return (
        <div className={estilos.conteiner}>

            <header className={estilos.cabecalho}>
                <h1 className={estilos.titulo}>Olá, {nomeExibicao}.</h1>
                <p className={estilos.subtitulo}>Aqui está um resumo da sua jornada pela astronomia.</p>
            </header>

            {estado === 'carregando' && (
                <Carregando texto="Carregando seu progresso..." />
            )}

            {estado === 'erro' && (
                <ErroCarregamento
                    mensagem={erro ?? undefined}
                    aoTentarNovamente={recarregar}
                />
            )}

            {estado === 'sucesso' && resumo && (
                <section className={estilos.grade}>

                    {/* Aulas Assistidas */}
                    <div className={estilos.card}>
                        <div className={estilos.cardCabecalho}>
                            <span className={estilos.cardIcone}><HiOutlineBookOpen size={20} /></span>
                            <p className={estilos.cardTitulo}>Contéudos vistos</p>
                        </div>

                        <p className={estilos.cardNumero}>
                            {resumo.aulasAssistidas}
                            <span className={estilos.cardNumeroTotal}> / {resumo.totalAulas}</span>
                        </p>

                        <div className={estilos.barraFundo}>
                            <div
                                className={estilos.barraProgresso}
                                style={{ width: `${(resumo.aulasAssistidas / resumo.totalAulas) * 100}%` }}
                            />
                        </div>

                        <p className={estilos.cardLegenda}>Atualizado com base no seu progresso</p>
                    </div>

                    {/* Questões Feitas */}
                    <div className={estilos.card}>
                        <div className={estilos.cardCabecalho}>
                            <span className={estilos.cardIcone}><HiOutlineCheckCircle size={20} /></span>
                            <p className={estilos.cardTitulo}>Questões Feitas</p>
                        </div>

                        <p className={estilos.cardNumero}>{resumo.questoesFeitas}</p>

                        <div className={estilos.miniGrafico}>
                            {resumo.questoesPorDia.map((altura, i) => (
                                <span key={i} className={estilos.barraMini} style={{ height: `${altura}%` }} />
                            ))}
                        </div>

                        <p className={estilos.cardLegenda}>Questões respondidas nos últimos 7 dias</p>
                    </div>

                    {/* Taxa de Acerto */}
                    <div className={estilos.card}>
                        <div className={estilos.cardCabecalho}>
                            <span className={estilos.cardIcone}><HiOutlineChartPie size={20} /></span>
                            <p className={estilos.cardTitulo}>Taxa de Acerto</p>
                        </div>

                        <div className={estilos.donutConteiner}>
                            <div
                                className={estilos.donut}
                                style={{
                                    background: `conic-gradient(#4747F2 ${resumo.taxaAcerto * 3.6}deg, rgba(255,255,255,0.08) 0deg)`,
                                }}
                            >
                                <div className={estilos.donutMiolo}>{resumo.taxaAcerto}%</div>
                            </div>
                        </div>

                        <p className={estilos.cardLegenda}>Baseado nas questões respondidas</p>
                    </div>

                    {/* Progresso Geral na OBA */}
                    <div className={estilos.card}>
                        <div className={estilos.cardCabecalho}>
                            <span className={estilos.cardIcone}><HiOutlineTrendingUp size={20} /></span>
                            <p className={estilos.cardTitulo}>Progresso Geral na OBA</p>
                        </div>

                        <p className={estilos.cardNumero}>{resumo.progressoGeral}%</p>

                        <div className={estilos.barraFundo}>
                            <div className={estilos.barraProgresso} style={{ width: `${resumo.progressoGeral}%` }} />
                        </div>

                        <p className={estilos.cardLegenda}>Nível 1 concluído · Nível 2 em andamento</p>
                    </div>

                </section>
            )}

        </div>
    )
}
