# STATUS DO PROJETO — Iforms Grupo ICF PWA

> Última atualização: 2026-05-05  
> Responsável: Anderson  
> Projeto: `c:\APP-SITE-SAAS\ICF-GROUP\iforms-pwa\`

---

## Visão Geral

Plataforma de treinamento técnico em construção ICF (Insulated Concrete Forms) desenvolvida como **Progressive Web App (PWA)**. O design das telas foi criado no StitchAI e está em `../stitch_interactive_presentation_app/`.

O app serve como hub de aprendizado, ferramenta técnica e comunidade para engenheiros, arquitetos e construtores do ecossistema **Iforms Grupo ICF**.

---

## Stack Técnica

| Camada       | Tecnologia                        | Motivo                          |
|--------------|-----------------------------------|---------------------------------|
| Dev server   | **Vite 5.x**                      | Fast HMR, multi-page app        |
| CSS          | **Tailwind CSS CDN**              | Prototipagem rápida sem build   |
| Icons        | **Material Symbols (Google CDN)** | Consistência com design Stitch  |
| Font         | **Inter (Google Fonts CDN)**      | Tipografia do design system     |
| JS           | **Vanilla JS**                    | Sem framework, app simples      |
| PWA          | **Service Worker manual**         | Cache-first, offline fallback   |
| Formatador   | **Prettier**                      | Consistência de código          |

> **Nota de evolução:** Tailwind CDN é adequado para desenvolvimento. Para produção, migrar para Tailwind CLI + PostCSS via Vite para eliminar a dependência de CDN e reduzir tamanho do CSS.

---

## Estrutura de Arquivos

```
iforms-pwa/
├── index.html              # Entry point — splash + redirect para dashboard
├── dashboard.html          # Tela 1: Hub central do aluno
├── aula.html               # Tela 2: Aula 1 — Rompendo a Âncora
├── calculadora.html        # Tela 3: Calculadora de materiais ICF
├── comunidade.html         # Tela 4: Fórum e ecossistema da rede
├── offline.html            # Página exibida sem conexão
│
├── manifest.json           # PWA Web App Manifest
├── sw.js                   # Service Worker (cache-first + offline fallback)
│
├── assets/
│   ├── icons/
│   │   ├── icon-192.svg    # Ícone PWA 192px
│   │   ├── icon-512.svg    # Ícone PWA 512px
│   │   └── icon-maskable.svg # Ícone maskable (Android adaptive)
│   └── js/
│       └── pwa.js          # Registro do SW + prompt de instalação A2HS
│
├── vite.config.js          # Configuração do servidor dev e build
├── package.json            # Dependências e scripts npm
├── .gitignore              # Arquivos ignorados pelo git
├── .env.example            # Template de variáveis de ambiente
├── .prettierrc             # Config do formatador de código
└── STATUS.md               # Este arquivo — contexto do projeto
```

---

## Telas Implementadas

### 1. Dashboard (`dashboard.html`) ✅
**Rota:** `/dashboard.html` | **Tema:** Deep Dark `#020817`

| Componente             | Status | Notas                                    |
|------------------------|--------|------------------------------------------|
| TopAppBar (logo + nav) | ✅     | Glass effect, notificação badge          |
| Trust Seal IPT/DATEC   | ✅     | Banner verde informativo                 |
| Welcome + Progress SVG | ✅     | Círculo animado 65%                      |
| Card "Continuar Aula"  | ✅     | Link funcional → `aula.html`             |

| Comunicados            | ✅     | 2 itens com ícone + hover                |
| Módulos de Formação    | ✅     | Grid 4 colunas, módulo 02 ativo/linkado  |
| Verticalidades ICF     | ✅     | ICF Energy, Planejados, Kit Casas        |
| Bottom Navigation      | ✅     | 5 abas com links reais entre páginas     |
| FAB Suporte            | ✅     | Botão flutuante fixo                     |

---

### 2. Aula (`aula.html`) ✅
**Rota:** `/aula.html` | **Tema:** Deep Dark `#020817`

| Componente             | Status | Notas                                          |
|------------------------|--------|------------------------------------------------|
| TopAppBar + back arrow | ✅     | Volta para dashboard                           |
| Player de vídeo        | ✅     | Container 16:9, overlay de play, progress bar  |
| Info da aula + badge   | ✅     | Módulo 1, título, descrição                    |
| Botões de ação         | ✅     | "Marcar Concluída" desabilita após clique      |
| Checklist Anti-Erro    | ✅     | 4 itens, estado persistido no localStorage     |
| Anotações              | ✅     | Auto-save no localStorage com debounce 800ms   |
| Recursos (PDF + Quiz)  | ✅     | Download e link externo                        |
| Progress sidebar       | ✅     | Barra 25%, citação motivacional                |
| Quick Nav sidebar      | ✅     | Links para outras telas                        |
| Bottom Nav (mobile)    | ✅     | 4 abas, "Estudar" ativo                        |

---

### 3. Calculadora (`calculadora.html`) ✅
**Rota:** `/calculadora.html` | **Tema:** Navy `#031632`

| Componente             | Status | Notas                                        |
|------------------------|--------|----------------------------------------------|
| TopAppBar + back arrow | ✅     | Volta para dashboard                         |
| Input área (m²)        | ✅     | Sem setas nativas, foco com borda verde      |
| Toggle 12cm / 18cm     | ✅     | Estado visual com aria-pressed               |
| Botão Calcular         | ✅     | Enter também dispara o cálculo               |
| Resultados animados    | ✅     | slideUp com delay escalonado por card        |
| Validação de input     | ✅     | Borda vermelha se vazio/negativo             |
| Card resumo            | ✅     | Mostra área + tipo selecionado               |
| Fórmulas ICF           | ✅     | Formas ×2, Concreto 0.042/0.048, ICFlex ×2.8|
| Footer links           | ✅     | ICF Energy, Planejados, Kit Casas            |
| Bottom Nav             | ✅     | 4 abas, "Cálculo" ativo                      |

**Fórmulas implementadas:**
- `Formas = ceil(área × 2)` unidades
- `Concreto = área × 0.042` m³ (12cm) ou `× 0.048` m³ (18cm)
- `ICFlex = área × 2.8` kg

---

### 4. Comunidade (`comunidade.html`) ✅
**Rota:** `/comunidade.html` | **Tema:** GitHub Dark `#0A0C10`

| Componente             | Status | Notas                                         |
|------------------------|--------|-----------------------------------------------|
| TopAppBar + busca      | ✅     | Ícone de search, back arrow                   |
| Banner ICF Bank        | ✅     | Gradient, pulsing dot, ícone decorativo       |
| Trust Seal             | ✅     | IPT + DATEC + Caixa Econômica                |
| Post Card 1 (fixado)   | ✅     | Avatar, título, stats (likes/comments/time)   |
| Post Card 2            | ✅     | Like em verde (curtido), animação fadeIn      |
| CTA novo post          | ✅     | Botão dashed border                           |

| Stats da comunidade    | ✅     | Membros, posts, online, satisfação            |
| Footer completo        | ✅     | Soluções + Suporte + Copyright                |
| Bottom Nav             | ✅     | 5 abas, "Comunidade" ativo                    |

---

### 5. Offline (`offline.html`) ✅
| Componente             | Status | Notas                                     |
|------------------------|--------|-------------------------------------------|
| Ícone wifi_off animado | ✅     | Pulse animation                           |
| Lista páginas cacheadas| ✅     | Links para as 4 telas principais          |
| Botão retry            | ✅     | `window.location.reload()`               |
| Auto-redirect online   | ✅     | Event listener `online` → dashboard      |

---

## PWA — Infraestrutura

### Service Worker (`sw.js`)
- **Estratégia local:** Cache-First → busca no cache, fallback para rede, atualiza cache
- **Estratégia CDN:** Stale-While-Revalidate → entrega do cache enquanto atualiza em background
- **Offline fallback:** Retorna `offline.html` para navegação HTML sem rede
- **Cache name:** `iforms-pwa-v1` — incrementar a versão ao fazer breaking changes

### Manifest (`manifest.json`)
- `display: standalone` — abre sem barra do navegador
- `theme_color: #00C2A0` — barra de status verde Iforms
- `start_url: ./dashboard.html`
- Shortcuts: Dashboard e Calculadora
- Ícones: 192px, 512px e maskable

### `pwa.js`
- Registro do SW com verificação de atualização a cada 1h
- Banner de "Nova versão disponível" ao detectar SW updated
- Prompt A2HS (Add to Home Screen) com botão flutuante
- Event listener `appinstalled` para remover o botão após instalação

---

## Design System

### Paleta de Cores por Tela

| Tela          | Background | Surface    | Primary    |
|---------------|------------|------------|------------|
| Dashboard     | `#020817`  | `#0f172a`  | `#00C2A0`  |
| Aula          | `#020817`  | `#0f172a`  | `#00C2A0`  |
| Calculadora   | `#031632`  | `#1a2b48`  | `#00C2A0`  |
| Comunidade    | `#0A0C10`  | `#161B22`  | `#00C2A0`  |

### Tipografia
- **Fonte:** Inter (400, 500, 600, 700, 800)
- **h1:** 40px / 700 / -0.02em tracking
- **h2:** 30px / 600 / -0.01em tracking
- **h3:** 24px / 600
- **body-lg:** 18px / 400 / 1.6 line-height
- **body-md:** 16px / 400 / 1.6 line-height
- **label-sm:** 14px / 500 / 0.05em tracking
- **caption:** 12px / 400

### Spacing (base 8px)
`stack-sm: 8px` · `stack-md: 16px` · `stack-lg: 32px` · `gutter: 24px` · `section-gap: 64px`

---

## Navegação entre Telas

```
dashboard.html
  ├── → aula.html          (card "Continuar Aula", módulo 02, "Formação" nav)
  ├── → calculadora.html   ("Projetos" nav)
  └── → comunidade.html    ("Ecossistema" nav)

aula.html
  ├── ← dashboard.html     (back arrow, "Início" nav)
  ├── → calculadora.html   (quick nav sidebar)
  └── → comunidade.html    ("Fórum" nav, quick nav sidebar)

calculadora.html
  └── ← dashboard.html     (back arrow, "Início" nav)

comunidade.html
  ├── ← dashboard.html     (back arrow, "Início" nav)
  └── → calculadora.html   ("Simulador" nav)
```

---

## Scripts Disponíveis

```bash
npm run dev          # Inicia servidor dev (http://localhost:5173)
npm run dev:open     # Inicia e abre o browser no dashboard
npm run build        # Build de produção → pasta dist/
npm run preview      # Preview do build de produção
npm run format       # Formata todos os arquivos com Prettier
npm run format:check # Verifica formatação sem alterar arquivos
```

---

## Roadmap — Próximas Etapas

### Fase 2 — Funcionalidade
- [ ] Sistema de autenticação (login/logout)
- [ ] Player de vídeo real (integração YouTube/Vimeo ou player próprio)
- [ ] Sistema de progresso real (localStorage → API)
- [ ] Download real de PDFs da aula
- [ ] Questionário de fixação (quiz interativo)
- [ ] Tela de Perfil do usuário
- [ ] Notificações push (Web Push API + VAPID)
- [ ] Modo offline completo para conteúdo de aulas

### Fase 3 — Novas Telas
- [ ] `login.html` — Autenticação
- [ ] `perfil.html` — Perfil e configurações do aluno
- [ ] `modulos.html` — Lista completa de módulos e aulas
- [ ] `obras.html` — Gestão de obras (aba "Obras" da comunidade)
- [ ] `manual.html` — Manual técnico ICF (aba "Manual" da calculadora)
- [ ] `notificacoes.html` — Central de notificações

### Fase 4 — Produção
- [ ] Migrar Tailwind CDN → Tailwind CLI via Vite (elimina CDN, CSS otimizado)
- [ ] Migrar ícones CDN → Self-hosted (elimina dependência Google Fonts em offline)
- [ ] Gerar ícones PNG reais (192x192, 512x512) para melhor suporte iOS
- [ ] Adicionar `apple-touch-startup-image` (splash screen iOS)
- [ ] Configurar CI/CD (GitHub Actions → deploy Vercel/Netlify)
- [ ] Adicionar analytics de uso (PostHog ou similar)
- [ ] Testes de Lighthouse PWA (score mínimo 90)

---

## Decisões Técnicas Registradas

| Data       | Decisão                                   | Motivo                                          |
|------------|-------------------------------------------|-------------------------------------------------|
| 2026-05-05 | Tailwind via CDN (não CLI)                | Velocidade de prototipagem, sem build step      |
| 2026-05-05 | Service Worker manual (não workbox)       | Simplicidade, sem dependência extra             |
| 2026-05-05 | Vanilla JS (sem React/Vue)                | App simples, sem necessidade de reatividade     |
| 2026-05-05 | Multi-page app (não SPA)                  | Compatível com design Stitch, sem router        |
| 2026-05-05 | localStorage para anotações e checklist   | Offline-first, sem backend ainda                |
| 2026-05-05 | Ícones SVG no manifest                    | Sem ferramenta de geração de PNG disponível     |

---

## Problemas Conhecidos / Limitações Atuais

| Item | Descrição | Impacto | Solução Futura |
|------|-----------|---------|----------------|
| CDN-first | App depende de internet para carregar Tailwind/Fonts na 1ª visita | Médio | Migrar para self-hosted em Fase 4 |
| Imagens placeholders | Avatares e thumbnails vêm do Google Cloud (URLs Stitch) | Baixo | Substituir por assets próprios |
| Sem backend | Dados são mockados, sem persistência real | Alto | Integrar API REST na Fase 2 |
| iOS SW limitado | Safari tem suporte parcial a Service Workers | Baixo | Adicionar meta tags específicas iOS |
| Ícones SVG | Alguns navegadores preferem PNG no manifest | Baixo | Gerar PNGs na Fase 4 |

---

## Referências do Projeto

- **Design original:** `../stitch_interactive_presentation_app/`
- **Design system:** `../stitch_interactive_presentation_app/academic_precision/DESIGN.md`
- **Tela dashboard:** `../stitch_interactive_presentation_app/dashboard_iforms/code.html`
- **Tela aula:** `../stitch_interactive_presentation_app/aula_1_rompendo_a_ncora/code.html`
- **Tela calculadora:** `../stitch_interactive_presentation_app/calculadora_t_cnica_iforms/code.html`
---

## Atualizações Recentes — Otimização do Intensivão (Maio/2026)

### 1. Gestão de Conteúdo Dinâmica ✅
- **Jornada de 5 Dias:** Implementação do objeto `lessons` centralizado com os links oficiais do YouTube e thumbnails reais para todo o evento.
- **Sincronização Dashboard/Aula:** Os títulos e status agora são lidos da mesma fonte de dados, garantindo consistência total.

### 2. Trava Pedagógica & Progresso ✅
- **Desbloqueio Sequencial:** Implementada lógica de "cadeado". A Aula 2 só é liberada para clique após a Aula 1 ser marcada como concluída no sistema.
- **Persistência de Dados:** Uso de `localStorage` para salvar o estado de conclusão de cada aula, permitindo que o aluno feche o app e retorne de onde parou.
- **Progresso Dinâmico:** O Dashboard agora calcula automaticamente a porcentagem (0%, 20%, 40%...) com base nas ações reais do aluno, abandonando os valores estáticos de 65%.

### 3. Refinamento de UI/UX (Aesthetics) ✅
- **Modal de Sucesso Premium:** Substituição do `alert()` padrão por um modal customizado com a identidade visual ICF, fundo em blur e animações fluidas.
- **Limpeza de Interface:** Remoção de textos redundantes e ajuste de hierarquia visual para focar no conteúdo de vídeo e nos materiais de apoio.
- **Otimização de Títulos:** Ajuste de tamanhos de fonte (3xl/5xl) e encurtamento de textos para evitar quebras de linha em telas mobile, mantendo a imponência visual.
- **Segurança de Código:** Implementação de IDs específicos (`mainLessonTitle`) para evitar que scripts dinâmicos sobrescrevam títulos de outros componentes como o Checklist.

### 4. Próximos Passos (Atualizado)
- [x] Lógica de progresso real (localStorage)
- [x] Integração com links reais do YouTube
- [x] Sistema de trava sequencial
- [ ] **Fase 3:** Implementação do Fluxo de Login (`login.html`)
- [ ] **Fase 3:** Criação da página de Perfil do Aluno (`perfil.html`)

