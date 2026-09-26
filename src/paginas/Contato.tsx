import { Link } from 'react-router-dom'; 
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import estilos from './Contato.module.css'
import { HiOutlineMail, HiOutlineLocationMarker, HiOutlineUser, HiOutlineChatAlt2 } from 'react-icons/hi'
import { ModalMensagem } from '../componentes/ModalMensagem'
import { enviarMensagemContato } from '../servicos/contatoServico'
import { EstrelasFundo } from '../componentes/layout/Estrelasfundo';
import { Rodape } from '../componentes/layout/Rodape';

type FormValues = {
    nome: string
    email: string
    assunto: string
    mensagem: string
}

const contatoSchema = z.object({
    nome: z.string()
        .min(2, 'Mínimo de 2 caracteres.')
        .max(60, 'Máximo de 60 caracteres.'),

    email: z.email({ message: 'Informe um e-mail válido.' }),

    assunto: z.string()
        .min(3, 'Mínimo de 3 caracteres.')
        .max(80, 'Máximo de 80 caracteres.'),

    mensagem: z.string()
        .min(10, 'Escreva pelo menos 10 caracteres.')
        .max(500, 'Máximo de 500 caracteres.'),
})

export function Contato() {
    // Configuração dos itens do menu
    const menuItems = [
        { label: 'Home', path: '/' },
        { label: 'Sobre', path: '/sobre' },
        { label: 'OBA', path: '/oba' },
        { label: 'Contato', path: '/contato' },
    ];

    const [modalVisivel, setModalVisivel] = useState(false)
    const [erroEnvio, setErroEnvio] = useState<string | null>(null)

    const {
        register, handleSubmit, reset, formState: { errors, isSubmitting }
    } = useForm<FormValues>({
        resolver: zodResolver(contatoSchema),
    })

    const enviarMensagem = async (data: FormValues) => {
        setErroEnvio(null)

        try {
            await enviarMensagemContato(data)
            setModalVisivel(true)
            reset()
        } catch (erro) {
            setErroEnvio(
                erro instanceof Error
                    ? erro.message
                    : 'Não foi possível enviar sua mensagem agora. Tente novamente em instantes.'
            )
        }
    }

    return (
                <div className={estilos.conteiner}>
                    <EstrelasFundo />

                <header className={estilos.header}>
                <div className={estilos.headerConteudo}>
                {/* Logo */}
                <div className={estilos.logo}>
                    <Link to="/" className={estilos.logotexto}>
                    Hyperion
                    </Link>
                </div>

                {/* Menu de Navegação */}
                <nav className={estilos.nav}>
                    <ul className={estilos.menu}>
                    {menuItems.map((item, index) => (
                        <li key={index}>
                        <Link to={item.path} className={estilos.animacaomenuhover}>
                            {item.label}
                        </Link>
                        </li>
                    ))}
                    </ul>
                </nav>

                {/* Botão Login */}
                <div className={estilos.login}>
                    <Link to="/login" className={estilos.botaologincadastre}>
                    Login
                    </Link>
                </div>
                </div>
            </header>
            {/* CONTEÚDO PRINCIPAL */}
            <main className={estilos.main}>

                <div className={estilos.textoContato}>
                    <h1 className={estilos.titulo}>
                        Fale com a <span className={estilos.tituloDestaque}>HYPERION</span>
                    </h1>
                    <p className={estilos.paragrafo}>
                        Tem dúvidas, sugestões ou quer contar sua experiência com a
                        plataforma? Preencha o formulário ao lado e vamos te responder o
                        quanto antes.
                    </p>

                    <div className={estilos.infoLista}>
                        <div className={estilos.infoItem}>
                            <span className={estilos.infoIcone}><HiOutlineMail size={20} /></span>
                            <span>hyperionwebapp@gmail.com</span>
                        </div>
                        <div className={estilos.infoItem}>
                            <span className={estilos.infoIcone}><HiOutlineLocationMarker size={20} /></span>
                            <span>Etec de Hortolândia - SP</span>
                        </div>
                    </div>
                </div>

                <form className={estilos.formulario} onSubmit={handleSubmit(enviarMensagem)}>

                    <div className={estilos.linhaCampos}>
                        <div className={estilos.campo}>
                            <label className={estilos.rotulo}>Nome</label>
                            <div className={estilos.campoComIcone}>
                                <HiOutlineUser size={18} className={estilos.campoIcone} />
                                <input
                                    {...register('nome')}
                                    className={estilos.input}
                                    placeholder="Seu nome completo"
                                />
                            </div>
                            {errors.nome && <p className={estilos.erro}>{errors.nome.message}</p>}
                        </div>

                        <div className={estilos.campo}>
                            <label className={estilos.rotulo}>E-mail</label>
                            <div className={estilos.campoComIcone}>
                                <HiOutlineMail size={18} className={estilos.campoIcone} />
                                <input
                                    {...register('email')}
                                    type="email"
                                    className={estilos.input}
                                    placeholder="nome@email.com"
                                />
                            </div>
                            {errors.email && <p className={estilos.erro}>{errors.email.message}</p>}
                        </div>
                    </div>

                    <div className={estilos.campo}>
                        <label className={estilos.rotulo}>Assunto</label>
                        <div className={estilos.campoComIcone}>
                            <HiOutlineChatAlt2 size={18} className={estilos.campoIcone} />
                            <input
                                {...register('assunto')}
                                className={estilos.input}
                                placeholder="Sobre o que você quer falar?"
                            />
                        </div>
                        {errors.assunto && <p className={estilos.erro}>{errors.assunto.message}</p>}
                    </div>

                    <div className={estilos.campo}>
                        <label className={estilos.rotulo}>Mensagem</label>
                        <textarea
                            {...register('mensagem')}
                            className={estilos.textarea}
                            placeholder="Escreva sua mensagem aqui..."
                            rows={5}
                        />
                        {errors.mensagem && <p className={estilos.erro}>{errors.mensagem.message}</p>}
                    </div>

                    <button type="submit" className={estilos.botaoEnviar} disabled={isSubmitting}>
                        {isSubmitting ? 'Enviando...' : 'Enviar mensagem'}
                    </button>

                    {erroEnvio && <p className={estilos.erro}>{erroEnvio}</p>}

                </form>

                
            </main>

            <ModalMensagem
                exibir={modalVisivel}
                ocultar={() => setModalVisivel(false)}
                titulo="Mensagem enviada!"
                texto="Recebemos sua mensagem e vamos te responder em breve. Obrigado por entrar em contato!"
            />

        </div>

        
    )
}
