import estilos from './ErroCarregamento.module.css'
import { HiOutlineExclamationCircle, HiOutlineRefresh } from 'react-icons/hi'

interface ErroCarregamentoProps {
    mensagem?: string
    aoTentarNovamente?: () => void
}

export function ErroCarregamento({
    mensagem = 'Não foi possível carregar os dados agora.',
    aoTentarNovamente,
}: ErroCarregamentoProps) {
    return (
        <div className={estilos.conteiner}>
            <span className={estilos.icone}>
                <HiOutlineExclamationCircle size={28} />
            </span>

            <p className={estilos.mensagem}>{mensagem}</p>

            {aoTentarNovamente && (
                <button className={estilos.botao} onClick={aoTentarNovamente}>
                    <HiOutlineRefresh size={16} />
                    Tentar novamente
                </button>
            )}
        </div>
    )
}
