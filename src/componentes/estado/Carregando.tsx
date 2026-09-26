import estilos from './Carregando.module.css'

interface CarregandoProps {
    texto?: string
}

export function Carregando({ texto = 'Carregando...' }: CarregandoProps) {
    return (
        <div className={estilos.conteiner}>
            <span className={estilos.spinner} />
            <p className={estilos.texto}>{texto}</p>
        </div>
    )
}
