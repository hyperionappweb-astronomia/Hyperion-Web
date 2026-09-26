import { supabase } from './supabaseClient'
import type { User } from '@supabase/supabase-js'

export interface UsuarioAutenticado {
    id: string
    nome: string
    email: string
}

interface EntrarParams {
    email: string
    senha: string
}

interface CadastrarParams {
    nome: string
    email: string
    senha: string
}

function mapearUsuario(user: User): UsuarioAutenticado {
    return {
        id: user.id,
        email: user.email ?? '',
        nome: (user.user_metadata?.nome as string | undefined) ?? user.email?.split('@')[0] ?? 'Usuário',
    }
}

function traduzirErro(mensagem: string): string {
    const mapa: Record<string, string> = {
        'Invalid login credentials': 'E-mail ou senha incorretos.',
        'User already registered': 'Já existe uma conta cadastrada com este e-mail.',
        'Email not confirmed': 'Confirme seu e-mail antes de entrar. Verifique sua caixa de entrada.',
        'Password should be at least 6 characters': 'A senha deve ter no mínimo 6 caracteres.',
        'Unable to validate email address: invalid format': 'Informe um e-mail válido.',
        'Email rate limit exceeded': 'Muitas tentativas seguidas. Aguarde um momento e tente novamente.',
    }
    return mapa[mensagem] ?? mensagem
}

export async function entrar({ email, senha }: EntrarParams): Promise<UsuarioAutenticado> {
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password: senha,
    })

    if (error) throw new Error(traduzirErro(error.message))
    if (!data.user) throw new Error('Não foi possível entrar. Tente novamente.')

    return mapearUsuario(data.user)
}

export async function cadastrar({ nome, email, senha }: CadastrarParams): Promise<UsuarioAutenticado> {
    const { data, error } = await supabase.auth.signUp({
        email,
        password: senha,
        options: {
            data: { nome },
        },
    })

    if (error) throw new Error(traduzirErro(error.message))
    if (!data.user) throw new Error('Não foi possível criar sua conta. Tente novamente.')

    return mapearUsuario(data.user)
}

export async function sair(): Promise<void> {
    const { error } = await supabase.auth.signOut()
    if (error) throw new Error(traduzirErro(error.message))
}

export async function obterUsuarioAtual(): Promise<UsuarioAutenticado | null> {
    const { data } = await supabase.auth.getSession()
    const user = data.session?.user
    return user ? mapearUsuario(user) : null
}

export function ouvirMudancasDeSessao(callback: (usuario: UsuarioAutenticado | null) => void): () => void {
    const { data: listener } = supabase.auth.onAuthStateChange((_evento, session) => {
        callback(session?.user ? mapearUsuario(session.user) : null)
    })

    return () => listener.subscription.unsubscribe()
}