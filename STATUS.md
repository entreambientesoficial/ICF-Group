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

#### Entrada de Dados (5 campos)
| Campo | Descrição |
|-------|-----------|
| Paredes Externas (m²) | Aplica lógica 18cm Estrutural |
| Paredes Internas (m²) | Aplica lógica 12cm Veda |
| Altura / Pé-Direito (m) | Pé-direito médio da obra |
| Cantos 90° (qty) | Quantidade de cantos estruturais |
| Total de Vãos (qty) | Portas + janelas |

#### Motor de Cálculo (Engenharia ICF)
```
Formas 18cm   = ceil(Área_Ext × 2)
Formas 12cm   = ceil(Área_Int × 2)
Peças Canto   = ceil(((Cantos + Vãos×2) × Altura) / 0,40)
Concreto      = ((Área18 × 0,048) + (Área12 × 0,042)) × 1,05  ← +5% margem
ICFlex (kg)   = (Área18 + Área12) × 2,8
ICFlex sacos  = ceil(kg / 20)
Peso Carga    = (Formas18 × 1,1) + (Formas12 × 0,9) + (Cantos × 1,1)
Aço Ø8mm      = ceil(ceil(mLinear / 0,25) × Altura)  — vertical CA-50
Aço Ø6,3mm    = ceil(ceil(Altura / 0,40) × mLinear)  — horizontal CA-60
Tela FV       = max(1, ceil((somaÁreas × 2) / 50))   — rolos 1×50m
```

#### Memorial Descritivo (exibido após calcular)
- **Cabeçalho** com 3 KPIs: m² Ext. (18cm) | m² Int. (12cm) | m Pé-Direito
- **Logística** (ícone caminhão): Formas 18cm, Formas 12cm, Peças de Canto, Peso Total da Carga
- **Estrutura** (ícone gota): Volume Concreto m³, Aço Ø8mm metros, Aço Ø6,3mm metros
- **Acabamento** (ícone rolo): Sacos ICFlex, Rolos Tela Fibra de Vidro
- **Aviso Técnico** (banner amarelo): referência às normas IPT/DATEC e projeto estrutural
- **Botão "Nova Simulação"**: oculta memorial, reexibe formulário

#### Protocolo de Montagem Anti-Erro (Checklist Oficial)
Redesenhado como documento técnico oficial com fundo azul marinho `#020f22` e bordas verde `#00C2A0`. Organizado em 3 categorias com 6 itens:

**Categoria 1 — Fundamentos Geométricos**
- [ ] Prumo, Nível, Alinhamento e Esquadro conferidos

**Categoria 2 — Padrão de Montagem Iforms**
- [ ] Encaixe Bolinha com Bolinha / Logo com Logo (Sistema Anti-Erro)
- [ ] Montagem Amarrada / Desencontrada
- [ ] Ajustes de gomos respeitando modulação de 12,5 cm

**Categoria 3 — Segurança de Concretagem**
- [ ] Travamento extra em Cantos e Bonecas de vãos
- [ ] Armação de aço posicionada conforme cálculo estrutural

**Comportamentos:**
- Badge no header mostra `X/6 itens` durante o progresso
- Ao concluir todos: badge muda para `✓ Concluído` + mensagem de sucesso em verde
- Estado persistido em `localStorage` (`iforms_protocolo_checklist`)
- Rodapé técnico: referência à Aula 2, Manual Iforms e RT

### Comunidade (`comunidade.html`) ✅
- TopAppBar: back arrow + logo 22px + busca
- Banner ICF Bank (pulsing dot, lançamento 2025)
- Grid bento: 2 post cards + sidebar mentoria + stats
- CTA "nova discussão", especialistas online (indicador verde)
- Footer completo

### Perfil (`perfil.html`) ✅
- TopAppBar: hamburger + "Meu Perfil"
- **Side Drawer** idêntico ao dashboard
- Header com avatar, nome, nível dinâmico, stats
- Grid 3 conquistas/badges (Selo Expert, Homologado, Embaixador)
- Configurações Profissionais: Dados do Credenciado, Notificações toggle
- Bottom Nav: Início | Ferramentas | Comunidade | Perfil ✦

### Offline (`offline.html`) ✅
- Ícone wifi_off animado (pulse)
- Links para as 4 telas principais cacheadas
- Retry button + auto-redirect ao voltar online

---

## Navegação Atual

```
index.html → redirect → dashboard.html

dashboard.html
  ├── Drawer → perfil.html, suporte, sobre ICF
  ├── → aula.html?id=1..5 (cards Jornada do Intensivão)
  ├── → calculadora.html (nav "Ferramentas")
  ├── → comunidade.html (nav "Comunidade")
  └── → perfil.html (nav "Perfil")

aula.html?id=X ← back → dashboard.html
  └── playlist lateral → aula.html?id=Y

calculadora.html ← Bottom Nav → dashboard / comunidade / perfil

comunidade.html ← back → dashboard.html

perfil.html ← back → dashboard.html (via nav "Início")
```

---

## PWA — Infraestrutura

- **SW desativado em dev** (localhost, 127.0.0.1, 192.168.x): evita cache interferindo no Vite HMR
- **SW ativo em produção**: cache-first para assets locais, stale-while-revalidate para CDN
- **A2HS prompt**: botão "Instalar" aparece quando `beforeinstallprompt` dispara
- **Banner update**: aparece quando novo SW instalado aguardando ativação
- **Icons**: símbolo geométrico ICF (teal `#01c38e` + fundo navy `#031632`) em 192, 512 e maskable
- **Logo**: `assets/icons/logo.svg` oficial do Grupo ICF — `h-[22px]` nas TopAppBars

---

## Design System

| Token        | Valor      | Uso |
|--------------|------------|-----|
| Primary      | `#00C2A0`  | Verde Iforms — botões, badges, destaques |
| On-Primary   | `#031632`  | Texto sobre botões verdes |
| Background   | `#020817`  | Fundo global (dashboard, aula) |
| Surface      | `#0f172a`  | Cards e painéis |
| Navy (calc)  | `#031632`  | Fundo calculadora |
| Navy profundo| `#020f22`  | Fundo Protocolo Anti-Erro |
| GitHub dark  | `#0A0C10`  | Fundo comunidade |

**Font:** Inter · **Icons:** Material Symbols Outlined · **Spacing:** base 8px

---

## Scripts

```bash
npm run dev          # servidor dev http://localhost:5173
npm run dev:open     # abre browser no dashboard
npm run build        # build → dist/
npm run preview      # preview do build
npm run format       # Prettier em todos os arquivos
```

> **Atenção:** Executar sempre dentro de `iforms-pwa/`, não na raiz `ICF-GROUP/`

---

## Git — Histórico de Commits

```
00cf971  feat: protocolo de montagem anti-erro oficial com 3 categorias e 6 itens
5af3a44  feat: calculadora ICF v3 — orçamento misto 18cm/12cm e memorial profissional
e845ef4  feat: calculadora ICF v2 — memorial descritivo completo de materiais
2ac115b  feat: aula2 material, dynamic lesson badge, fix dashboard cards and restore calculadora
5ebfec2  feat: consolidate navigation, profile expert, and pwa branding
82c664c  feat: complete interactive community hub with dynamic stats and replies
e4725c0  feat: professionalize community hub and activate discussions
de70ad1  feat: premium dashboard optimization, ecosystem grid and PWA 2.0 install modal
e8b1e1f  feat: implement pedagogical flow 2.0 with interactive flashcards and dynamic progress
aa64349  feat: Otimização do Intensivão - Jornada 5 dias e trava pedagógica
```

---

## Changelog — Sessão 2026-05-06 (2ª parte)

### `aula.html`
- **[FIX]** Restaurado conteúdo do `<main>` da calculadora que havia sumido (bug de edição anterior)
- **[FEAT]** Aula 2 liberada: `released: true`, vídeo YouTube e EBOOK 2 com link Google Drive
- **[FEAT]** Título da Aula 2 alterado para "Todas as Etapas da Contrução com Formas de Isopor"
- **[FEAT]** Badge de módulo dinâmico: substituído texto estático "Fundamentos do Mercado" por `Aula 0X` gerado via JS com `padStart(2, '0')` baseado no `?id=` da URL

### `dashboard.html`
- **[FIX]** Card da Aula #02 na Jornada do Intensivão: removido badge "LIVE", borda verde `border-2 border-primary` e estilo ativo hardcoded — card agora segue o mesmo padrão visual do card Aula #01
- **[FIX]** Título do card Aula #02 atualizado para o novo nome da aula
- **[FIX]** Tick de conclusão: corrigido de `opacity: 0.2` (visível mas fraco) para `opacity: 0` (completamente oculto) — ícone aparece apenas quando `lesson_X_completed === 'true'` no localStorage

### `calculadora.html` — v2 → v3

**v2 (intermediária):**
- Adicionados inputs: Área de Vãos, Altura, Cantos, Total de Vãos
- Novo motor de cálculo: Área Real, Formas Retas/Canto, Concreto +5%, ICFlex em sacos, Peso da Carga, Aço Ø8mm/Ø6,3mm, Tela Fibra de Vidro
- Interface: formulário oculta ao calcular, exibe Memorial Descritivo em 3 seções
- Botão "Nova Simulação"
- Checklist renomeado para Protocolo Anti-Erro (4 itens Aula 2)

**v3 (atual):**
- **Removido** o toggle 12cm/18cm — substituído por dois campos dedicados de área
- **Novo campo:** Paredes Externas (m²) → aplica 18cm Estrutural
- **Novo campo:** Paredes Internas (m²) → aplica 12cm Veda
- Motor de cálculo misto: fórmulas separadas por tipo de forma
- Memorial atualizado: 3 KPIs no cabeçalho + 4 linhas de Logística (18cm, 12cm, Canto, Peso)
- Aviso técnico IPT/DATEC no rodapé do memorial

**Protocolo de Montagem Anti-Erro (atualização final):**
- Redesenhado visualmente: fundo `#020f22`, bordas `#00C2A0`, cada item com subtítulo explicativo
- Reorganizado em 3 categorias com 6 itens totais
- Mensagem de sucesso ao concluir todos os itens
- Rodapé técnico com referência à Aula 2, Manual Iforms e RT

---

## Roadmap — Próximas Etapas

### Conteúdo das Aulas
- [ ] Liberar Aula 3 quando o vídeo estiver disponível (`released: true`)
- [ ] Adicionar flashcards (quiz) para as Aulas 2 a 5
- [ ] Adicionar materiais de apoio (EBOOK 3, 4, 5) à medida que forem gerados

### Fase 2 — Funcionalidade
- [ ] Player de vídeo real (YouTube embed já ativo) — considerar playlist automática
- [ ] Sistema de autenticação (login/logout real)
- [ ] Progresso real via API (hoje só localStorage)
- [ ] Notificações push (Web Push API + VAPID)

### Fase 3 — Novas Telas
- [ ] `login.html` — autenticação
- [ ] `modulos.html` — lista completa de módulos e aulas
- [ ] `manual.html` — manual técnico ICF
- [ ] `obras.html` — gestão de obras com histórico de simulações

### Fase 4 — Produção
- [ ] Tailwind CDN → CLI (CSS otimizado, sem CDN)
- [ ] Self-host fonts + icons (offline completo)
- [ ] Ícones PNG reais para iOS
- [ ] CI/CD (GitHub Actions + Vercel/Netlify)
- [ ] Lighthouse PWA score ≥ 90

---

## Decisões Técnicas

| Data       | Decisão                                | Motivo                                     |
|------------|----------------------------------------|--------------------------------------------|
| 2026-05-05 | Tailwind via CDN                       | Velocidade de prototipagem                 |
| 2026-05-05 | Service Worker manual                  | Simplicidade, sem dependência extra        |
| 2026-05-05 | Vanilla JS                             | App simples, sem reatividade necessária    |
| 2026-05-05 | Multi-page app                         | Compatível com design Stitch, sem router   |
| 2026-05-05 | localStorage para progresso/notas      | Offline-first, sem backend ainda           |
| 2026-05-05 | SW desativado em localhost             | Evita cache quebrar HMR do Vite            |
| 2026-05-06 | Logo oficial SVG em h-[22px]           | Tamanho ideal após testes visuais          |
| 2026-05-06 | Side Drawer unificado em todas telas   | Navegação institucional centralizada       |
| 2026-05-06 | Badge de módulo dinâmico via JS        | Elimina texto hardcoded por tela           |
| 2026-05-06 | Calculadora com dois campos de área    | Suporte a orçamento misto 18cm + 12cm      |
| 2026-05-06 | Memorial Descritivo oculta formulário  | UX de relatório: foco no resultado         |
| 2026-05-06 | Protocolo Anti-Erro em 3 categorias    | Facilita conferência sequencial no canteiro|

---

## Limitações Conhecidas

| Item | Impacto | Solução futura |
|------|---------|----------------|
| CDN-first | 1ª visita requer internet | Self-host na Fase 4 |
| Sem backend | Dados mockados | API REST na Fase 2 |
| Aulas 3-5 bloqueadas | Conteúdo limitado | Liberar conforme vídeos ficam prontos |
| iOS SW limitado | Cache parcial no Safari | Meta tags específicas |
| Aço calculado por estimativa | Não substitui projeto estrutural | Aviso técnico exibido no memorial |
