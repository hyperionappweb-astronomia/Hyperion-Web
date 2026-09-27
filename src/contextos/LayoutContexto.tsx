import { createContext, useEffect, useState } from 'react'
import { type ReactNode } from 'react';
import { obterUsuarioAtual, ouvirMudancasDeSessao, type UsuarioAutenticado } from '../servicos/autenticacao'

interface LayoutProviderProps {
    children: ReactNode
}

interface LayoutTipoContexto {
    menuAbertoContexto: boolean
    usuarioContexto: UsuarioAutenticado | null
    carregandoUsuarioContexto: boolean
    setMenuAbertoContexto: (menu: boolean) => void
    setUsuarioContexto: (usuario: UsuarioAutenticado | null) => void
}

export const LayoutContexto = createContext<LayoutTipoContexto>({
    menuAbertoContexto: false,
    usuarioContexto: null,
    carregandoUsuarioContexto: true,
    setMenuAbertoContexto: () => { },
    setUsuarioContexto: () => { }
})

export const LayoutProvider = ({ children }: LayoutProviderProps) => {

    const [menuAbertoContexto, setMenuAbertoContexto] = useState(false)
    const [usuarioContexto, setUsuarioContexto] = useState<UsuarioAutenticado | null>(null)
    const [carregandoUsuarioContexto, setCarregandoUsuarioContexto] = useState(true)

    // Verifica se já existe uma sessão válida assim que a aplicação carrega
    // (usuário continua logado depois de um F5, por exemplo).
    useEffect(() => {
        obterUsuarioAtual()
            .then(setUsuarioContexto)
            .finally(() => setCarregandoUsuarioContexto(false))

        // Escuta mudanças de sessão a partir daqui: login, logout, token
        // expirado, login feito em outra aba
        const cancelarInscricao = ouvirMudancasDeSessao((usuario) => {
            setUsuarioContexto(usuario)
            setCarregandoUsuarioContexto(false)
        })

        return () => cancelarInscricao()
    }, [])

    return (
        <LayoutContexto.Provider value={{
            menuAbertoContexto,
            setMenuAbertoContexto,
            usuarioContexto,
            carregandoUsuarioContexto,
            setUsuarioContexto,
        }}>
            {children}
        </LayoutContexto.Provider>
    )
}