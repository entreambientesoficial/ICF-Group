# STATUS DO PROJETO — Iforms Grupo ICF PWA

> Última atualização: 2026-05-06  
> Projeto: `c:\APP-SITE-SAAS\ICF-GROUP\iforms-pwa\`

---

## Visão Geral

PWA de treinamento técnico em construção ICF (Insulated Concrete Forms). Design original em `../stitch_interactive_presentation_app/`. App funciona como hub de aprendizado, ferramenta técnica e comunidade para engenheiros, arquitetos e construtores do ecossistema **Iforms Grupo ICF**.

---

## Stack Técnica

| Camada     | Tecnologia                        | Notas                              |
|------------|-----------------------------------|------------------------------------|
| Dev server | **Vite 5.x**                      | Multi-page, porta 5173             |
| CSS        | **Tailwind CSS CDN**              | + plugins forms, container-queries |
| Icons      | **Material Symbols (Google CDN)** |                                    |
| Font       | **Inter (Google Fonts CDN)**      |                                    |
| JS         | **Vanilla JS**                    | Sem framework                      |
| PWA        | **Service Worker manual**         | Desativado em localhost/dev        |
| Git        | 10 commits no branch `main`       | Remote: github.com/entreambientesoficial/ICF-Group |

> **Produção futura:** Migrar Tailwind CDN → CLI via Vite. Self-host fonts e icons para offline completo.

---

## Estrutura de Arquivos Atual

```
iforms-pwa/
├── index.html              # Splash screen + redirect → dashboard
├── dashboard.html          # ✅ Tela principal do aluno
├── aula.html               # ✅ Sistema dinâmico de aulas (?id=1..5)
├── calculadora.html        # ✅ Calculadora técnica ICF v3 + Memorial Descritivo
├── comunidade.html         # ✅ Fórum e mentoria
├── perfil.html             # ✅ Perfil + conquistas + gamificação
├── offline.html            # ✅ Fallback sem conexão
│
├── manifest.json           # PWA manifest (theme #00C2A0, standalone)
├── sw.js                   # Service Worker (desativado em dev)
│
├── assets/
│   ├── icons/
│   │   ├── logo.svg        # Logo oficial Grupo ICF (22px nas telas)
│   │   ├── icon-192.svg    # Símbolo ICF teal sobre fundo navy
│   │   ├── icon-512.svg    # Símbolo ICF teal sobre fundo navy
│   │   └── icon-maskable.svg
│   └── js/
│       └── pwa.js          # Registro SW + A2HS prompt + dev guard
│
├── vite.config.js          # Multi-page build, host: true para celular
├── package.json            # scripts: dev, build, preview, format
├── .gitignore
├── .env.example
├── .prettierrc
└── STATUS.md               # Este arquivo
```

---

## Telas Implementadas

### Landing Page (`index.html`) ✅
- **Portal de Elite**: Tela de entrada com imagem de alta autoridade.
- **Identidade Visual**: Jargão "Eeeita glória!" com fonte caligráfica `Caveat`.
- **Call to Action**: Botão "Iniciar Jornada" que redireciona para a Dashboard.
- **Preparação para Login**: Estrutura pronta para substituir o botão por Social Auth (Google).

### Dashboard (`dashboard.html`) ✅
- TopAppBar: logo 22px + menu hamburger
- **Side Drawer** deslizante: perfil do aluno, links Plataforma + Institucional, logout
- Trust Seal IPT/DATEC
- Welcome + progress circle SVG
- Card "Continuar Aula" → `aula.html`
- **Jornada do Intensivão** — 5 cards de aula dinâmicos:
  - Tick de conclusão (`check_circle`) aparece **somente** quando `lesson_X_completed === 'true'` no localStorage (`opacity: 0` quando não concluída, `opacity: 1` quando concluída)
  - Aula #02 corrigida: removido badge "LIVE" e borda verde hardcoded — agora segue o mesmo estilo visual do card da Aula #01
  - Aula #02 exibe título atualizado: "Todas as Etapas da Construção com Formas de Isopor"
- Ecossistema Grupo ICF (grid 12 empresas)
- Bottom Nav: Início ✦ | Ferramentas → calculadora | Comunidade → comunidade | Perfil → perfil

### Sobre o Grupo ICF (`sobre.html`) ✅
- **Página Interna Premium**: Substituiu o link externo para manter o aluno no app.
- **Conteúdo Destilado**: Missão, Visão e Valores com design glassmorphism.
- **Nossa Jornada**: Linha do tempo vertical (2016 - Hoje).
- **Ecossistema**: Vitrine de marcas (Iforms, ICF Bond, Kit Casa, Academia).

### Perfil (`perfil.html`) ✅
- **Dinâmico**: Carrega nome e foto do `localStorage`.
- **Edição**: Botão de editar nome funcional para testes/prototipagem.
- **Logout**: Sistema de encerramento de sessão redirecionando para o Portal.

### Aula (`aula.html`) ✅ — Sistema dinâmico `?id=1..5`
- TopAppBar: back arrow + logo 22px
- Player 16:9 com thumbnail, play overlay e progress bar glow
- **Badge de módulo dinâmico** — substituiu texto estático "Fundamentos do Mercado" por "Aula 01", "Aula 02", etc., gerado pelo JS com base no parâmetro `?id=` (zero-padded via `padStart(2,'0')`)
- **Aula 2 liberada** com:
  - Título: "Todas as Etapas da Contrução com Formas de Isopor"
  - Material: EBOOK 2 com link Google Drive (`1kVym2QvvvDD7XiTuVaBkA6heRM6fnGIn`)
  - `released: true`, vídeo funcional
- Botão "Marcar como Concluída" → persiste `lesson_X_completed` no localStorage
- Flashcards interativos 3D (flip) — quiz Aula 1 com 12 perguntas; Aulas 2-5 aguardando conteúdo
- Anotações com auto-save (debounce 800ms)
- Sidebar: Materiais de Apoio (PDF com link externo), playlist de aulas com status visual
- Aulas 3, 4 e 5: bloqueadas (`released: false`), exibem cadeado e "Em breve"

### Calculadora (`calculadora.html`) ✅ — **v3 — Orçamento Misto Profissional**
- **Orçamento Misto**: Suporte a Paredes Externas (18cm) e Internas (12cm) simultaneamente.
- **Memorial Descritivo**: Relatório técnico completo (Logística, Estrutura, Acabamento).
- **Protocolo Anti-Erro**: Checklist técnico de 6 itens para conferência em obra.
- **Aviso Técnico**: Referência normativa IPT/DATEC integrada.

### Comunidade (`comunidade.html`) ✅
- TopAppBar: back arrow + logo 22px + busca
- Banner ICF Bank (pulsing dot, lançamento 2025)
- Grid bento: 2 post cards + sidebar mentoria + stats
- CTA "nova discussão", especialistas online (indicador verde)

### Offline (`offline.html`) ✅
- Fallback visual para falta de conexão.
- Links rápidos para telas cacheadas.

---

## Navegação Atual

```
index.html → portal de entrada → dashboard.html

dashboard.html
  ├── Drawer → perfil.html, sobre.html, suporte, termos
  ├── → aula.html?id=1..5
  ├── → calculadora.html
  ├── → comunidade.html
  └── → perfil.html
```

---

## PWA — Infraestrutura

- **SW ativo em produção**: cache-first para assets locais.
- **Manifest**: theme #00C2A0, standalone mode.
- **Icons**: Símbolo ICF teal/navy oficial.
- **A2HS**: Prompt de instalação customizado na dashboard.

---

## Design System

| Token        | Valor      | Uso |
|--------------|------------|-----|
| Primary      | `#00C2A0`  | Verde Iforms |
| On-Primary   | `#031632`  | Texto sobre verde |
| Background   | `#020817`  | Fundo global |
| Surface      | `#0f172a`  | Cards |
| Navy profundo| `#020f22`  | Fundo técnico |

---

## Estratégia de Banco de Dados (Decidido)

| Item | Decisão | Motivo |
|------|---------|--------|
| Tecnologia | **Supabase (PostgreSQL)** | Portabilidade total. O cliente pode migrar para AWS/Self-host no futuro sem "lock-in". |
| Gestão | **Múltiplas Organizações** | Criação de uma Org dedicada ao Grupo ICF para facilitar o Handover. |
| Entrega | **Transferência de Ownership** | O mentor será convidado como Owner da Org ao final do projeto. |

---

## Changelog — Sessão 2026-05-06 (3ª parte)

### Portal e Branding
- **[NEW]** `index.html`: Criado portal de entrada com branding "Eeeita glória!".
- **[NEW]** `sobre.html`: Criada página interna de autoridade institucional.
- **[FIX]** Branding: Grafia do jargão corrigida para "Eeeita glória!" em todo o app.

### Menu e Suporte
- **[FEAT]** Suporte Técnico: Integrado WhatsApp (11 96307-9436) com mensagem automática.
- **[FEAT]** Termos e Privacidade: Links oficiais integrados para conformidade legal.
- **[FEAT]** Sistema Homologado: Link direto para a página técnica do Iforms (DATEC 045).

### Experiência do Usuário (UX)
- **[FEAT]** Perfil e Dashboard agora refletem o nome e foto do usuário salvos localmente.
- **[FEAT]** Botão de "Sair da Conta" funcional em todos os menus.

---

## Roadmap Atualizado

- [ ] Integrar Supabase para Autenticação (Fase 2)
- [ ] Criar Painel de Admin para o Mentor (Fase 2)
- [ ] Inserir perguntas e respostas da Aula 03 e 04 (Aguardando liberação)
- [ ] Implementar geração automática de Certificado PDF (Fase Final)
