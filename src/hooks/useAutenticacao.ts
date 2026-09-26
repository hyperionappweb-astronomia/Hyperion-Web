import { useContext } from 'react'
import type { AuthError } from '@supabase/supabase-js'
import { supabase } from '../servicos/supabaseClient'
import { AutenticacaoContexto } from '../contextos/AutenticacaoContexto'

export function useAutenticacao() {

  const autenticacaoContexto = useContext(AutenticacaoContexto)

  if (autenticacaoContexto === undefined) {
    throw new Error('Falta o <AutenticacaoProvider> na aplicação!')
  }

  // Garantida sua existência, recupera os dados gerados
  const { usuario, carregando } = autenticacaoContexto

  const criarAutenticacaoUsuario = async (email: string, senha: string): Promise<string> => {
    let retorno = 'sucesso'
    try {
      // Cria a autenticação do usuário no Supabase
      const { error } = await supabase.auth.signUp({ email, password: senha })
      if (error) throw error
    } catch (error) {

      if (ehErroDeAutenticacao(error)) {

        switch (error.code) {
          case 'user_already_exists':
            retorno = `E-mail já utilizado por outra conta. ${error.code}`
            break

          default:
            retorno = `Erro na criação da autenticação do usuário! (${error.code}: ${error.message})`
            break
        }
      } else {
        retorno = `Erro imprevisto! (${error})`
      }
    }
    return retorno
  }


  const validarUsuario = async (email: string, senha: string): Promise<string> => {
    let retorno = 'sucesso'
    try {
      // Verifica se o email e senha informados condizem com um usuário autenticado
      const { error } = await supabase.auth.signInWithPassword({ email, password: senha })
      if (error) throw error
    } catch (error) {

      if (ehErroDeAutenticacao(error)) {

        switch (error.code) {
          default:
            retorno = `Erro na autenticação do usuário! (${error.code}: ${error.message})`
            break
        }
      } else {
        retorno = `Erro imprevisto! (${error})`
      }
    }
    return retorno
  }

  const deslogar = async (): Promise<string> => {
    let retorno = 'sucesso'
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
    } catch (error) {

      if (ehErroDeAutenticacao(error)) {

        switch (error.code) {
          default:
            retorno = `Erro ao deslogar o usuário! (${error.code}: ${error.message})`
            break
        }
      } else {
        retorno = `Erro imprevisto! (${error})`
      }
    }
    return retorno
  }

  return { criarAutenticacaoUsuario, validarUsuario, deslogar, usuario, carregando }
}

// Equivalente ao "error instanceof FirebaseError" do Firebase: o
// AuthError do Supabase também tem .code e .message.
function ehErroDeAutenticacao(error: unknown): error is AuthError {
  return typeof error === 'object' && error !== null && 'code' in error && 'message' in error
}