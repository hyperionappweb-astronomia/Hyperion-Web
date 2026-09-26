
import { supabase } from './supabaseClient'

export async function atualizarPerfil(uid: string, dados: { nome: string }): Promise<void> {
    const { error: erroAuth } = await supabase.auth.updateUser({ data: { nome: dados.nome } })
    if (erroAuth) throw new Error(traduzirErroPerfil(erroAuth.message))

    const { error: erroTabela } = await supabase
        .from('aluno')
        .update({ nome: dados.nome })
        .eq('id_aluno', uid)
    if (erroTabela) throw new Error(traduzirErroPerfil(erroTabela.message))
}

export async function atualizarSenha(email: string, senhaAtual: string, novaSenha: string): Promise<void> {
    const { error: erroConfirmacao } = await supabase.auth.signInWithPassword({ email, password: senhaAtual })
    if (erroConfirmacao) throw new Error('Senha atual incorreta.')

    const { error: erroTroca } = await supabase.auth.updateUser({ password: novaSenha })
    if (erroTroca) throw new Error(traduzirErroPerfil(erroTroca.message))
}

function traduzirErroPerfil(mensagem: string): string {
    const mapa: Record<string, string> = {
        'Password should be at least 6 characters': 'A senha deve ter no mínimo 6 caracteres.',
        'New password should be different from the old password.': 'A nova senha deve ser diferente da atual.',
    }
    return mapa[mensagem] ?? mensagem
}