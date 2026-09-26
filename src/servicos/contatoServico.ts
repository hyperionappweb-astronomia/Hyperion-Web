import { supabase } from './supabaseClient'

interface EnviarMensagemContatoParams {
    nome: string
    email: string
    assunto: string
    mensagem: string
}

export async function enviarMensagemContato(dados: EnviarMensagemContatoParams): Promise<void> {
    const { error } = await supabase.from('mensagem_contato').insert({
        nome: dados.nome,
        email: dados.email,
        assunto: dados.assunto,
        mensagem: dados.mensagem,
    })

    if (error) {
        throw new Error('Não foi possível enviar sua mensagem agora. Tente novamente em instantes.')
    }
}