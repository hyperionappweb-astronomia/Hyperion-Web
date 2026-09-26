import estilos from './Principal.module.css'
import { useContext } from 'react'
import { Menu } from './Menu'
import { Outlet } from 'react-router-dom'
import { LayoutContexto } from '../../contextos/LayoutContexto'


export function Principal() {
    const { menuAbertoContexto } = useContext(LayoutContexto)

    return (
        <div className={estilos.layoutWrapper}>
            <Menu />
            <div className={estilos.conteudoPrincipal}>
                <Outlet />
            </div>
        </div>
    )
}