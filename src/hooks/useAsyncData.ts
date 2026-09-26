import { useCallback, useEffect, useState, type DependencyList } from 'react'

export type EstadoAssincrono = 'ocioso' | 'carregando' | 'sucesso' | 'erro'

interface UseAsyncDataResultado<T> {
    dado: T | null
    estado: EstadoAssincrono
    erro: string | null
    recarregar: () => void
}

/** * Hook padrão para buscar dados assíncronos (hoje simulados, amanhã vindos
 * do Firebase). Centraliza os estados de carregando/sucesso/erro para que
 * toda tela que consome uma API siga o mesmo padrão, com o mesmo
 * comportamento de "tentar novamente".
 *
 * Uso:
 *
 *      const { dado, estado, erro, recarregar } = useAsyncData(
 *          () => buscarResumoAluno(uid),
 *          [uid]
 *      )
 */
export function useAsyncData<T>(
    carregar: () => Promise<T>,
    dependencias: DependencyList = []
): UseAsyncDataResultado<T> {
    const [dado, setDado] = useState<T | null>(null)
    const [estado, setEstado] = useState<EstadoAssincrono>('ocioso')
    const [erro, setErro] = useState<string | null>(null)
    const [tentativa, setTentativa] = useState(0)

    const recarregar = useCallback(() => {
        setTentativa((valorAtual) => valorAtual + 1)
    }, [])

    useEffect(() => {
        let cancelado = false

        async function executar() {
            setEstado('carregando')
            setErro(null)

            try {
                const resultado = await carregar()

                if (!cancelado) {
                    setDado(resultado)
                    setEstado('sucesso')
                }
            } catch (erroCapturado) {
                if (!cancelado) {
                    const mensagem = erroCapturado instanceof Error
                        ? erroCapturado.message
                        : 'Não foi possível carregar os dados. Tente novamente.'

                    setErro(mensagem)
                    setEstado('erro')
                }
            }
        }

        executar()

        return () => {
            cancelado = true
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [...dependencias, tentativa])

    return { dado, estado, erro, recarregar }
}
