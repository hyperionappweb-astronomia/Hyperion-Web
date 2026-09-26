import { Outlet } from 'react-router-dom'
import estilos from './LayoutPublico.module.css'
import { Rodape } from './Rodape'

export function LayoutPublico() {
    return (
        <div className={estilos.layout}>
            <Outlet />
            <Rodape />
        </div>
    )
}