import { supabase } from './supabaseClient'

export interface ResumoAluno {
    aulasAssistidas: number
    totalAulas: number
    questoesFeitas: number
    questoesPorDia: number[]
    taxaAcerto: number
    progressoGeral: number
}

export async function buscarResumoAluno(uid: string): Promise<ResumoAluno> {
    // Conteúdos vistos (distintos) pelo aluno
    const { data: acessos, error: erroAcessos } = await supabase
        .from('log_acesso_aluno')
        .select('id_conteudo')
        .eq('id_aluno', uid)
        .not('id_conteudo', 'is', null)

    if (erroAcessos) throw new Error('Não foi possível carregar seu progresso.')
    const aulasAssistidas = new Set(acessos?.map((a) => a.id_conteudo)).size

    // Total de conteúdos cadastrados (todos os níveis, sem filtro por enquanto)
    const { count: totalAulas, error: erroTotal } = await supabase
        .from('conteudo')
        .select('id_conteudo', { count: 'exact', head: true })

    if (erroTotal) throw new Error('Não foi possível carregar seu progresso.')

    // Questões feitas + taxa de acerto
    const { data: respostas, error: erroRespostas } = await supabase
        .from('historico_resposta')
        .select('correta, resultado_simulado!inner(id_aluno, data_inicio)')
        .eq('resultado_simulado.id_aluno', uid)

    if (erroRespostas) throw new Error('Não foi possível carregar seu progresso.')

    const questoesFeitas = respostas?.length ?? 0
    const acertos = respostas?.filter((r) => r.correta).length ?? 0
    const taxaAcerto = questoesFeitas > 0 ? Math.round((acertos / questoesFeitas) * 100) : 0

    // Questões por dia (últimos 7 dias), agrupado pela data de início do
    // simulado ao qual a resposta pertence (aproximação)
    const hoje = new Date()
    const seteDiasAtras = new Date(hoje)
    seteDiasAtras.setDate(hoje.getDate() - 6)
    seteDiasAtras.setHours(0, 0, 0, 0)

    const contagemPorDia: Record<string, number> = {}
    for (let i = 0; i < 7; i++) {
        const dia = new Date(seteDiasAtras)
        dia.setDate(seteDiasAtras.getDate() + i)
        contagemPorDia[dia.toISOString().slice(0, 10)] = 0
    }

    respostas?.forEach((r) => {
        const dataInicio = (r as unknown as { resultado_simulado: { data_inicio: string } })
            .resultado_simulado?.data_inicio
        if (!dataInicio) return
        const chave = dataInicio.slice(0, 10)
        if (chave in contagemPorDia) contagemPorDia[chave] += 1
    })

    const valoresPorDia = Object.values(contagemPorDia)
    const maiorValor = Math.max(1, ...valoresPorDia)
    const questoesPorDia = valoresPorDia.map((v) => Math.round((v / maiorValor) * 100))

    const progressoGeral = (totalAulas ?? 0) > 0 ? Math.round((aulasAssistidas / (totalAulas ?? 1)) * 100) : 0

    return { aulasAssistidas, totalAulas: totalAulas ?? 0, questoesFeitas, questoesPorDia, taxaAcerto, progressoGeral }
}