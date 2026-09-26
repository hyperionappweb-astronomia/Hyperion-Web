import { supabase } from './supabaseClient'

export interface NivelConteudo {
    idNivel: number
    numero: number
    descricao: string
    bloqueado: boolean
}

export async function buscarNiveis(): Promise<NivelConteudo[]> {
    const { data: niveis, error: erroNiveis } = await supabase
        .from('nivel')
        .select('id_nivel, descricao, codigo_nivel')
        .order('codigo_nivel')

    if (erroNiveis) throw new Error('Não foi possível carregar os níveis.')

    // Descobre quais níveis já têm pelo menos um conteúdo cadastrado, para
    // marcar os demais como "Em breve" automaticamente.
    const { data: conteudos, error: erroConteudos } = await supabase
        .from('conteudo')
        .select('id_nivel')

    if (erroConteudos) throw new Error('Não foi possível carregar os níveis.')

    const niveisComConteudo = new Set(conteudos?.map((c) => c.id_nivel))

    return (niveis ?? []).map((nivel) => ({
        idNivel: nivel.id_nivel,
        numero: Number(nivel.codigo_nivel),
        descricao: nivel.descricao,
        bloqueado: !niveisComConteudo.has(nivel.id_nivel),
    }))
}

export interface ConteudoItem {
    idConteudo: number
    nomeConteudo: string
    materia: string | null
    imagem: string | null
    pdfPath: string | null
}

export async function buscarConteudosPorNivel(idNivel: number): Promise<ConteudoItem[]> {
    const { data, error } = await supabase
        .from('conteudo')
        .select('id_conteudo, nome_conteudo, materia, imagem, pdf_path')
        .eq('id_nivel', idNivel)
        .order('materia', { ascending: true })
        .order('nome_conteudo', { ascending: true })

    if (error) throw new Error('Não foi possível carregar os conteúdos deste nível.')

    return (data ?? []).map((c) => ({
        idConteudo: c.id_conteudo,
        nomeConteudo: c.nome_conteudo,
        materia: c.materia,
        imagem: c.imagem,
        pdfPath: c.pdf_path,
    }))
}

// O bucket "conteudos" é privado, então cada PDF precisa de uma URL
// assinada (temporária) para ser aberto. 
export async function gerarUrlPdf(pdfPath: string): Promise<string> {
    const { data, error } = await supabase.storage
        .from('conteudos')
        .createSignedUrl(pdfPath, 60 * 5) // válida por 5 minutos

    if (error || !data?.signedUrl) throw new Error('Não foi possível abrir este PDF agora.')

    return data.signedUrl
}