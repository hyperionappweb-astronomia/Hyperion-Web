import { supabase } from './supabaseClient'

export interface Nivel {
    idNivel: number
    descricao: string
    codigoNivel: string
}

export interface SimuladoIniciado {
    idResultado: number
    idSimulado: number
    titulo: string
    quantidadeQuestoes: number
    tempoLimite: string | null
}

export async function listarNiveis(): Promise<Nivel[]> {
    const { data, error } = await supabase
        .from('nivel')
        .select('id_nivel, descricao, codigo_nivel')
        .order('codigo_nivel')

    if (error) throw new Error('Não foi possível carregar os níveis.')

    return (data ?? []).map((n) => ({
        idNivel: n.id_nivel,
        descricao: n.descricao,
        codigoNivel: n.codigo_nivel,
    }))
}

export async function iniciarSimulado(idNivel: number, quantidade: 10 | 15 | 20): Promise<SimuladoIniciado> {
    // 1) Sorteia as questões e cria a linha em "simulado" (via RPC do banco)
    const { data: idSimulado, error: erroCriar } = await supabase.rpc('criar_simulado_aleatorio', {
        p_id_nivel: idNivel,
        p_quantidade: quantidade,
    })
    if (erroCriar) throw new Error(traduzirErroSimulado(erroCriar.message))

    // 2) Registra a tentativa do aluno (id_aluno é preenchido sozinho pelo
    //    banco, via default auth.uid() na definição da tabela)
    const { data: resultado, error: erroResultado } = await supabase
        .from('resultado_simulado')
        .insert({ id_simulado: idSimulado })
        .select('id_resultado, id_simulado')
        .single()
    if (erroResultado) throw new Error(traduzirErroSimulado(erroResultado.message))

    // 3) Busca os detalhes do simulado recém-criado, só pra exibir na tela
    const { data: simulado, error: erroSimulado } = await supabase
        .from('simulado')
        .select('titulo, quantidade_questoes, tempo_limite')
        .eq('id_simulado', idSimulado)
        .single()
    if (erroSimulado) throw new Error(traduzirErroSimulado(erroSimulado.message))

    return {
        idResultado: resultado.id_resultado,
        idSimulado: resultado.id_simulado,
        titulo: simulado.titulo,
        quantidadeQuestoes: simulado.quantidade_questoes,
        tempoLimite: simulado.tempo_limite,
    }
}

function traduzirErroSimulado(mensagem: string): string {
    const mapa: Record<string, string> = {
        'Não há questões suficientes neste nível (mínimo 3 de Astronáutica e 7 de Astronomia)':
            'Este nível ainda não tem questões suficientes cadastradas para montar um simulado.',
    }
    return mapa[mensagem] ?? mensagem
}