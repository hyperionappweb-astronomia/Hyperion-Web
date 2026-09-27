# Hyperion — Web

Plataforma web de estudos de astronomia para alunos que se preparam para a
**OBA (Olimpíada Brasileira de Astronomia e Astronáutica)**. Permite estudar
conteúdos por nível, praticar questões avulsas e fazer simulados cronometrados
com correção automática.

---

## Stack

- **Vite** + **React** + **TypeScript**
- **Tailwind CSS** (com CSS Modules — cada componente tem seu próprio
  `Nome.module.css` usando `@apply`)
- **React Router** (rotas aninhadas, com grupos protegidos)
- **React Hook Form** + **Zod** (formulários e validação)
- **Supabase** (autenticação, banco de dados, storage e funções de backend)

---

## Como rodar

```bash
npm install
npm run dev
```

### Variáveis de ambiente (`.env` na raiz do projeto)

```
VITE_SUPABASE_URL=https://SEU-PROJETO.supabase.co
VITE_SUPABASE_ANON_KEY=sua-chave-publica-aqui
```

Sem aspas em volta dos valores, sem espaço depois do `=`. O arquivo `.env`
precisa estar na raiz do projeto (do lado do `package.json`), não dentro de
`src/`. Depois de editar o `.env`, reinicie o `npm run dev` — variáveis de
ambiente só são lidas quando o Vite inicia.

---

## Estrutura de pastas

```
src/
├── componentes/
│   └── layout/
│       ├── Outlet.tsx        # Layout público (Home/Sobre/Oba/Contato): fundo estrelado + rodapé
│       ├── Layout.module.css
│       ├── Principal.tsx     # Layout da área logada: Menu lateral + Outlet + Rodapé
│       ├── Principal.module.css
│       ├── Menu.tsx          # Menu lateral da área logada (retrátil)
│       ├── EstrelasFundo.tsx # Canvas de estrelas animadas, usado como fundo
│       └── Rodape.tsx        # Rodapé com topo em "bolhas", reaproveitado em toda a área pública e logada
├── paginas/
│   ├── Home.tsx, Sobre.tsx, Oba.tsx, Contato.tsx    # Páginas públicas
│   ├── Login.tsx, Cadastro.tsx                       # Fora do Layout (sem header/rodapé)
│   ├── AreaAluno.tsx, Configuracoes.tsx               # Área logada
│   └── conteudo/
│       ├── Conteudo.tsx       # Lista os níveis da OBA
│       └── ConteudoNivel.tsx  # Lista os PDFs de um nível específico
├── contextos/
│   └── LayoutContexto.tsx    # Contexto único: usuário logado, loading da sessão, estado do menu lateral
├── servicos/
│   ├── supabaseClient.ts     # Cliente Supabase (usa as env vars acima)
│   ├── autenticacao.ts       # entrar, cadastrar, sair, obterUsuarioAtual, ouvirMudancasDeSessao
│   ├── perfilServico.ts      # atualizarPerfil, atualizarSenha (reautentica antes de trocar senha)
│   ├── conteudoServico.ts    # buscarNiveis, buscarConteudosPorNivel, gerarUrlPdf
│   ├── simuladosServico.ts   # listarNiveis, iniciarSimulado
│   └── contatoServico.ts     # enviarMensagemContato
└── rotas/
    ├── Rotas.tsx             # Definição de todas as rotas
    └── RotaPrivada.tsx       # Guarda de rota (redireciona para /login se não autenticado)
```

### Como as rotas são organizadas

- **Públicas** (`/`, `/sobre`, `/oba`, `/contato`): dentro do `<Layout>` (via
  `Outlet.tsx`), que dá o fundo estrelado, o header com o menu de navegação e
  o rodapé.
- **Login e Cadastro** (`/login`, `/cadastro`): fora do `Layout`, sem
  header/rodapé.
- **Área logada** (`/principal/...`): dentro do `<Principal>`, protegida por
  `RotaProtegida`/`RotaPrivada` (redireciona para `/login` se não houver
  sessão válida). Tem seu próprio Menu lateral e Rodapé.

---

## Backend (Supabase)

O projeto usa o **mesmo backend Supabase** que o app mobile — um único banco
de dados Postgres compartilhado entre as duas plataformas.

### Autenticação

Usa o **Supabase Auth** (e-mail + senha). Ao cadastrar um usuário
(`supabase.auth.signUp`), uma trigger no banco (`on_auth_user_created`) cria
automaticamente a linha correspondente na tabela `aluno`, copiando o nome
enviado no cadastro (`user_metadata.nome`).

> Se a confirmação de e-mail estiver ativada no painel do Supabase
> (Authentication → Providers → Email), o cadastro não loga a pessoa
> automaticamente — ela precisa clicar no link de confirmação primeiro.

### Tabelas principais

| Tabela | Para que serve |
|---|---|
| `nivel` | Os 4 níveis da OBA (descrição, código) |
| `aluno` | Perfil do aluno (nome), ligado 1-para-1 com `auth.users` |
| `conteudo` | Materiais de estudo por nível (nome, matéria, caminho do PDF) |
| `questao` | Banco de questões (enunciado, alternativas, gabarito, nível, divisão Astronomia/Astronáutica) — o **gabarito nunca é exposto** ao front-end via permissões de coluna |
| `simulado` | Um simulado montado (título, nível, quantidade de questões, tempo limite) |
| `simulado_compostopor_questao` | Quais questões pertencem a qual simulado |
| `resultado_simulado` | Uma tentativa de simulado de um aluno (status, pontuação, tempo gasto) |
| `historico_resposta` | Cada resposta dada dentro de uma tentativa |
| `log_acesso_aluno` | Registro de quais conteúdos o aluno já abriu (usado para calcular progresso) |
| `mensagem_contato` | Mensagens enviadas pelo formulário de Contato (não exige login) |

Todas as tabelas têm **Row Level Security (RLS)** ativado: cada aluno só
enxerga e edita os próprios dados; conteúdo e questões são de leitura pública
(para usuários logados), sem permissão de escrita pelo app.

### Funções no banco (RPC)

Chamadas com `supabase.rpc(...)`, executam lógica sensível **no servidor**
(nunca no front-end), justamente para impedir que alguém veja o gabarito ou
manipule o resultado:

- **`criar_simulado_aleatorio(p_id_nivel, p_quantidade)`** — sorteia as
  questões (mínimo 3 de Astronáutica + 7 de Astronomia) e cria o simulado.
- **`salvar_resposta_simulado(p_id_resultado, p_id_questao, p_alternativa)`**
  — salva/atualiza uma resposta durante o simulado.
- **`finalizar_simulado(p_id_resultado, p_respostas)`** — corrige todas as
  respostas de uma vez e calcula a pontuação final.
- **`verificar_resposta_questao(p_id_questao, p_alternativa)`** — usada no
  modo de questões avulsas (fora de simulado), corrige uma resposta na hora.

### Storage (arquivos)

- Bucket **`conteudos`** (privado): os PDFs de estudo. O front-end nunca usa
  a URL direta — sempre gera uma **URL assinada temporária**
  (`createSignedUrl`, válida por alguns minutos) para exibir o PDF.
- Bucket **`questoes`** (privado): imagens usadas dentro dos enunciados das
  questões, também acessadas via URL assinada.
