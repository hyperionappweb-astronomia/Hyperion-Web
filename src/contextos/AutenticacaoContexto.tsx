import { createContext, useEffect, useState, type ReactNode } from 'react'
import { supabase } from '../servicos/supabaseClient'
import type { User } from '@supabase/supabase-js'

interface AutenticacaoContextoTipo {
    usuario: User | null
    carregando: boolean
}

export const AutenticacaoContexto = createContext<AutenticacaoContextoTipo | undefined>(undefined)

interface AutenticacaoProviderProps {
    children: ReactNode
}

export function AutenticacaoProvider({ children }: AutenticacaoProviderProps) {
    const [usuario, setUsuario] = useState<User | null>(null)
    const [carregando, setCarregando] = useState(true)

    useEffect(() => {
        supabase.auth.getSession().then(({ data }) => {
            setUsuario(data.session?.user ?? null)
            setCarregando(false)
        })

        const { data: listener } = supabase.auth.onAuthStateChange((_evento, session) => {
            setUsuario(session?.user ?? null)
            setCarregando(false)
        })

        return () => listener.subscription.unsubscribe()
    }, [])

    return (
        <AutenticacaoContexto.Provider value={{ usuario, carregando }}>
            {children}
        </AutenticacaoContexto.Provider>
    )
}