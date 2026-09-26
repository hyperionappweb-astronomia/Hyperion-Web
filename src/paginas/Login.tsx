import estilos from './Login.module.css'
import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { LayoutContexto } from '../contextos/LayoutContexto'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { entrar } from '../servicos/autenticacao'
import { HiOutlineMail, HiOutlineLockClosed } from 'react-icons/hi'
import Mascote from '../assets/image/MascoteHyP.png'
import {EstrelasFundo} from '../componentes/layout/Estrelasfundo'

type FormValues = {
    email: string
    senha: string
}

const loginSchema = z.object({
    email: z.string().email({ message: 'Informe um e-mail válido.' }),
    senha: z.string().min(6, { message: 'Informe uma senha com 6 caracteres.' }),
})

export function Login() {
    const { setUsuarioContexto } = useContext(LayoutContexto)
    const {
        register, handleSubmit, formState: { errors, isSubmitting }
    } = useForm<FormValues>({
        resolver: zodResolver(loginSchema),
    })
    const navegacao = useNavigate()
    const [erroLogin, setErroLogin] = useState<string | null>(null)

    const autenticarUsuario = async (data: FormValues) => {
        setErroLogin(null)

        try {
            const usuario = await entrar({ email: data.email, senha: data.senha })
            setUsuarioContexto(usuario)
            navegacao('/principal')
        } catch (erro) {
            setErroLogin(
                erro instanceof Error ? erro.message : 'Não foi possível entrar. Tente novamente.'
            )
        }
    }

    return (
        <div className={estilos.conteiner}>
            <EstrelasFundo />
            {/* Esferas de luz ao fundo para dar profundidade ao vidro */}
            <div className={estilos.orbeRoxo} />
            <div className={estilos.orbeAzul} />

            {/* Placa Única Liquid Glass */}
            <div className={estilos.cardGlass}>
                
                {/* Painel esquerdo: Formulário */}
                <div className={estilos.painelEsquerdo}>
                    <h1 className={estilos.titulo}>Faça Login</h1>
                    <p className={estilos.subtitulo}>Bem-vindo de volta! Acesse sua conta.</p>

                    <form onSubmit={handleSubmit(autenticarUsuario)} className={estilos.formulario}>
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

                        {erroLogin && <p className={estilos.mensagem}>{erroLogin}</p>}

                        <button type="submit" className={estilos.botao} disabled={isSubmitting}>
                            {isSubmitting ? 'Entrando...' : 'Entrar'}
                        </button>
                    </form>

                    <p className={estilos.separador}>ou continue com</p>

                    <div className={estilos.botoesExtras}>
                        <button className={estilos.botaoExterno}>
                            <svg width="16" height="16" viewBox="0 0 24 24">
                                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
                                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                            </svg>
                            Google
                        </button>
                        <button className={estilos.botaoExterno}>Outro</button>
                    </div>

                    <p className={estilos.novoUsuario}>
                        Não tem conta?{' '}
                        <button onClick={() => navegacao('/cadastro')} className={estilos.linkCadastro}>
                            Cadastre-se
                        </button>
                    </p>
                </div>

                {/* Painel direito: Mascote Integrado */}
                <div className={estilos.painelDireito}>
                    <div className={estilos.glowMascote} />
                    <img src={Mascote} alt="Mascote" className={estilos.imagemMascote} />
                </div>

            </div>
        </div>
    )
}