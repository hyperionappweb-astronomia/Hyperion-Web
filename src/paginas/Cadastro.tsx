import estilos from './Cadastro.module.css'
import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { ModalMensagem } from '../componentes/ModalMensagem'
import { LayoutContexto } from '../contextos/LayoutContexto'
import { cadastrar } from '../servicos/autenticacao'
import { HiOutlineMail, HiOutlineLockClosed } from 'react-icons/hi'
import { FiUser } from 'react-icons/fi'
import Mascote from '../assets/image/MascoteHyP.png'
import { EstrelasFundo } from '../componentes/layout/Estrelasfundo'

type FormValues = {
    nome: string
    email: string
    senha: string
}

const cadastroSchema = z.object({
    nome: z.string()
        .min(2, 'Mínimo de 2 caracteres.')
        .max(25, 'Máximo de 25 caracteres.'),

    email: z.string().email({ message: 'Informe um e-mail válido.' }),

    senha: z.string()
        .min(6, { message: 'Informe uma senha com no mínimo 6 caracteres.' })
})

export function Cadastro() {
    const { setUsuarioContexto } = useContext(LayoutContexto)

    const [modalMensagemVisivel, setModalMensagemVisivel] = useState(false)
    const [modalMensagemTitulo, setModalMensagemTitulo] = useState('')
    const [modalMensagemTexto, setModalMensagemTexto] = useState('')
    const [erroCadastro, setErroCadastro] = useState<string | null>(null)

    const {
        register, handleSubmit, formState: { errors, isSubmitting }
    } = useForm<FormValues>({
        resolver: zodResolver(cadastroSchema)
    })

    const navegacao = useNavigate()

    const adicionarUsuario = async (data: FormValues) => {
        setErroCadastro(null)

        try {
            const usuario = await cadastrar({
                nome: data.nome,
                email: data.email,
                senha: data.senha,
            })

            setUsuarioContexto(usuario)
            setModalMensagemTexto(`Seja bem-vindo(a), ${usuario.nome}!`)
            exibirModal()
        } catch (erro) {
            setErroCadastro(
                erro instanceof Error ? erro.message : 'Não foi possível criar sua conta. Tente novamente.'
            )
        }
    }

    const exibirModal = () => {
        setModalMensagemTitulo('Novo Usuário')
        setModalMensagemVisivel(true)
    }

    const ocultarModal = () => {
        setModalMensagemVisivel(false)
        navegacao('/principal')
    }

    return (
        <div className={estilos.conteiner}>
            <EstrelasFundo />
            {/* Esferas luminosas para efeito Glass */}
            <div className={estilos.orbeRoxo} />
            <div className={estilos.orbeAzul} />

            {/* Placa Única Liquid Glass */}
            <div className={estilos.cardGlass}>
                
                {/* LADO ESQUERDO: Mascote */}
                <div className={estilos.painelEsquerdo}>
                    <div className={estilos.glowMascote} />
                    <img src={Mascote} alt="Mascote" className={estilos.imagemMascote} />
                </div>

                {/* LADO DIREITO: Formulário de Cadastro */}
                <div className={estilos.painelDireito}>
                    <h1 className={estilos.titulo}>Cadastre-se</h1>
                    <p className={estilos.subtitulo}>Crie sua conta para começar.</p>

                    <form className={estilos.formulario} onSubmit={handleSubmit(adicionarUsuario)}>
                        
                        <label className={estilos.label}>Nome</label>
                        <div className={estilos.campoInputContainer}>
                            <FiUser className={estilos.campoIcone} />
                            <input
                                {...register('nome')}
                                className={estilos.campo}
                                placeholder="Seu nome completo"
                            />
                        </div>
                        {errors.nome && <p className={estilos.mensagem}>{errors.nome.message}</p>}

                        <label className={estilos.label}>E-mail</label>
                        <div className={estilos.campoInputContainer}>
                            <HiOutlineMail className={estilos.campoIcone} />
                            <input
                                {...register('email')}
                                type="email"
                                placeholder="nome@gmail.com"
                                className={estilos.campo}
                            />
                        </div>
                        {errors.email && <p className={estilos.mensagem}>{errors.email.message}</p>}

                        <label className={estilos.label}>Senha</label>
                        <div className={estilos.campoInputContainer}>
                            <HiOutlineLockClosed className={estilos.campoIcone} />
                            <input
                                {...register('senha')}
                                type="password"
                                placeholder="••••••••"
                                className={estilos.campo}
                            />
                        </div>
                        {errors.senha && <p className={estilos.mensagem}>{errors.senha.message}</p>}

                        {erroCadastro && <p className={estilos.mensagem}>{erroCadastro}</p>}

                        <button
                            type="submit"
                            className={estilos.botao}
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Cadastrando...' : 'Cadastrar'}
                        </button>

                        <p className={estilos.separador}>ou continue com</p>

                        <div className={estilos.botoesExtras}>
                            <button className={estilos.botaoExterno} type="button">
                                <svg width="16" height="16" viewBox="0 0 24 24">
                                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
                                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                                </svg>
                                Google
                            </button>
                        </div>
                    </form>

                    <p className={estilos.jaPossuiConta}>
                        Já tem uma conta?{' '}
                        <button onClick={() => navegacao('/login')} className={estilos.linkLogin}>
                            Faça Login
                        </button>
                    </p>
                </div>
            </div>

            <ModalMensagem
                exibir={modalMensagemVisivel}
                ocultar={() => ocultarModal()}
                titulo={modalMensagemTitulo}
                texto={modalMensagemTexto}
            />
        </div>
    )
}