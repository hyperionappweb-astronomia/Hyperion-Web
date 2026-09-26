import { type ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { useAutenticacao } from '../hooks/useAutenticacao'
import { Carregando } from '../componentes/estado/Carregando'

interface RotaProtegidaProps {
    children: ReactNode
}

export function RotaProtegida({ children }: RotaProtegidaProps) {
    const { usuario, carregando } = useAutenticacao()

    if (carregando) {
        return (
            <div className="flex items-center justify-center h-screen w-screen bg-Tomescuro1">
                <Carregando texto="Verificando sua sessão..." />
            </div>
        )
    }

    if (!usuario) {
        return <Navigate to="/login" replace />
    }

    return <>{children}</>
}