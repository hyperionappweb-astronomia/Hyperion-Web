import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { Home } from '../paginas/Home'
import { Sobre } from '../paginas/Sobre'
import { Login } from '../paginas/Login'
import { Cadastro } from '../paginas/Cadastro'
import { AreaAluno } from '../paginas/AreaAluno'
import { Conteudo } from '../paginas/conteudo/Conteudo'
import { ConteudoNivel } from '../paginas/conteudo/ConteudoNivel'
import { Questoes } from '../paginas/Questoes'
import { Simulados } from '../paginas/Simulados'
import { Oba } from '../paginas/Oba'
import { Contato } from '../paginas/Contato'
import { Configuracoes } from '../paginas/Configuracoes'

import { RotaProtegida } from './RotaProtegida'
import { Principal } from '../componentes/layout/Principal'
import { LayoutPublico } from '../componentes/layout/LayoutPublico'

import { AutenticacaoProvider } from '../contextos/AutenticacaoContexto'

export function Rotas() {
    return (
        <AutenticacaoProvider>
            <BrowserRouter>
                <Routes>

                    {/* SITE PÚBLICO */}

                    <Route element={<LayoutPublico />}>
                        <Route path="/" element={<Home />} />
                        <Route path="/sobre" element={<Sobre />} />
                        <Route path="/oba" element={<Oba />} />
                        <Route path="/contato" element={<Contato />} />
                    </Route>

                    {/* LOGIN E CADASTRO */}

                    <Route path="/login" element={<Login />} />
                    <Route path="/cadastro" element={<Cadastro />} />

                    {/* ÁREA DO ALUNO */}

                    <Route path="/principal" element={ <RotaProtegida><Principal /></RotaProtegida>}>
                        <Route index element={<AreaAluno />} />
                        <Route path="conteudo" element={<Conteudo />} />
                        <Route path="conteudo/:idNivel" element={<ConteudoNivel />} />
                        <Route path="questoes" element={<Questoes />} />
                        <Route path="simulados" element={<Simulados />} />
                        <Route path="configuracoes" element={<Configuracoes />} />
                    </Route>

                </Routes>
            </BrowserRouter>
        </AutenticacaoProvider>
    )
}