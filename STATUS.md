# STATUS DO PROJETO - GRUPO ICF

> [!CAUTION]
> # ⚠️ REGRA DE OURO: NÃO ALTERAR O QUE JÁ ESTÁ FUNCIONANDO OU FOI APROVADO! ⚠️
> **QUALQUER PROBLEMA ENCONTRADO É RESULTADO DE MEXER EM ALGO QUE NÃO DEVERIA TER SIDO TOCADO. MANTENHA A ESTABILIDADE DAS TELAS JÁ FINALIZADAS.**
>
> **ATENÇÃO CLAUDE:** O `supabase.js` importa via CDN (`cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm`). NÃO trocar para import npm (`@supabase/supabase-js`) — o browser não resolve bare imports sem o Vite. A mudança quebra o app silenciosamente.

## Histórico de Restauração (07/05/2026)
- **ROLLBACK TOTAL**: O projeto foi revertido para o commit estável `4d62e53` para descartar automações de admin não solicitadas.
- **RESTAURAÇÃO DE CONEXÕES**: Funções críticas de Perfil e Comunidade foram reintegradas ao `supabase.js`.
- **ADMIN DELETADO**: `admin.html` removido definitivamente em 07/05/2026 (tarde). Estava quebrado e sem suporte no `supabase.js`.

# STATUS DO PROJETO — Iforms Grupo ICF PWA

> Última atualização: 2026-05-07 (Tarde - Auditoria de Código)
> Projeto: `c:\APP-SITE-SAAS\ICF-GROUP\iforms-pwa\`

---

## Visão Geral

PWA de treinamento técnico em construção ICF (Insulated Concrete Forms). O app evoluiu de um protótipo estático para um **SaaS completo e dinâmico**, com integração total ao **Supabase** para persistência de progresso, diretório de especialistas e mural de discussões em tempo real.

---

## Stack Técnica

| Camada     | Tecnologia                        | Notas                              |
|------------|-----------------------------------|------------------------------------|
| Backend    | **Supabase (PostgreSQL)**         | Auth + DB Progress + Community Hub |
| Dev server | **Vite 5.x**                      | Multi-page, porta 5173             |
| CSS        | **Tailwind CSS CDN**              | + plugins forms, container-queries |
| Icons      | **Material Symbols (Google CDN)** |                                    |
| Font       | **Inter (Google Fonts CDN)**      |                                    |
| JS         | **Vanilla JS (ES Modules)**       | Módulos isolados para Supabase     |
| PWA        | **Service Worker manual**         | Offline-first e Installable        |

---

## Estrutura de Arquivos Atual

```
iforms-pwa/
├── assets/
│   └── js/
│       ├── supabase.js      # 🛡️ Core: Auth + Progresso + Mural + Experts + Stats
│       └── pwa.js           # Registro SW + Install Prompt
├── index.html               # 🔐 Login Page (Social Auth Google)
├── dashboard.html           # 🏠 Home personalizada com Ecossistema Real
├── aula.html                # 📺 Vídeo Player Premium + Progresso Real-time
├── calculadora.html         # 🧮 Motor de Engenharia v3 (Persistente)
├── comunidade.html          # 👥 Hub Social REAL (Mural + Diretório)
├── perfil.html              # 👤 Perfil Dinâmico + Estatísticas Reais
├── STATUS.md                # Controle de Versão
└── ...
```

---

## Evolução das Telas

### Dashboard (`dashboard.html`) ✅
- **Personalização Dinâmica**: Exibe o nome e avatar real do aluno.
- **Ecossistema Conectado**: Cards convertidos em links reais para as empresas do Grupo ICF (Iforms, Construtora, Projetos, etc.), eliminando placeholders e erros 404.

### Perfil (`perfil.html`) ✅
- **Dashboard do Usuário**: Exibe estatísticas reais (Postagens e Comentários) puxadas do banco.
- **Progresso Real**: Barra de progresso do curso baseada na contagem real de aulas concluídas no Supabase.
- **UX Simplificada**: Remoção de elementos redundantes e otimização do suporte via link direto para WhatsApp oficial.

### Aula (`aula.html`) ✅
- **Player Premium**: Botão de play verde customizado.
- **Progresso Resiliente**: O botão "Marcar como Concluída" agora persiste no Supabase instantaneamente.

### Calculadora (`calculadora.html`) ✅
- **Motor de Engenharia Corrigido**: Coeficientes técnicos (0.072 e 0.042) aplicados.
- **Persistência Local (F5)**: O app lembra os dados da última simulação.

---

## Changelog — Sessão 06/05 (Final)

### Lançamento & Conteúdo (07/05)
- **[FEAT]** **Aula 3 Liberada**: Vídeo e material de apoio (Ebook 3) integrados e disponíveis no app.
- **[UX]** **Desbloqueio Progressivo**: Atualizada a lógica do Dashboard para permitir acesso à Aula 3.

### Profissionalização & UX (06/05)

---

### 2026-05-07 - Lançamento da Aula 03 & Calculadora de Negócios
- [x] Liberação oficial da Aula 03 (Vídeo e Ebook).
- [x] Implementação de 12 novas questões de Quiz técnico da Aula 03.
- [x] Evolução da `calculadora.html` para ferramenta de negócios:
    - Ajuste de terminologia técnica: "Paredes Estruturais (18cm)" e "Paredes de Vedação (12cm)".
    - Adição de parâmetros CUB e BDI com correção para "Resultado Bruto Estimado (BDI)".
    - Módulo de Estudo de Viabilidade Financeira (Custo Obra Cinza + Preço de Venda).
    - Módulo de Superestrutura: Cálculo de Vigotas, EPS de laje e Concreto de capa.
    - Nota Técnica de Execução: Inclusão do "Corte em J" no memorial.
    - Persistência de CUB local e salvamento no Supabase (`calculation_history`).
- [x] Design Premium do Memorial Descritivo para "Print and Send" (Relatório Executivo em nova janela).

### Estabilidade & Refatoração do Perfil (07/05 - Manhã)
- [x] **Correção Crítica de Sintaxe**: Resolvido erro de declaração duplicada (`sideName`) que travava o script do `perfil.html`.
- [x] **Restauração do Perfil**: Re-implementação da função `editProfile()` com integração real ao Supabase (`auth.updateUser`) para alteração de nome.
- [x] **Sincronização Global de Níveis**: Unificação dos termos "Iniciante", "Intermediário" e "Expert" em todas as sidebars do app (`dashboard`, `calculadora`, `perfil`).
- [x] **Ajuste de Fluxo**: Corrigida a estrutura HTML do modal de logout para garantir UX premium e sem quebras de layout.

---

## Auditoria de Código — 07/05/2026 (Tarde)

Auditoria completa realizada por desenvolvedor sênior após incidente com painel admin do Gemini.

### Problemas Encontrados e Corrigidos ✅

| Severidade | Problema | Arquivo | Ação |
|------------|----------|---------|------|
| CRÍTICO | Funções admin orphaned (`getBatches`, `updateLessonAdmin`, etc.) | `supabase.js` | Removidas |
| CRÍTICO | `toggleLikeDiscussion` sem controle de duplicatas | `supabase.js` | Dedup via `localStorage` |
| GRAVE | `perfil.html` ausente no build de produção | `vite.config.js` | Adicionado ao rollup |
| GRAVE | Service Worker com `CACHE_NAME` desatualizado (`v1`) | `sw.js` | Bumped para `v2` |
| MODERADO | `getUserExpertData` buscava expert por nome em vez de `user_id` | `supabase.js` | Corrigido + coluna `user_id` adicionada no banco |
| MODERADO | `registerExpert` não vinculava o expert ao usuário autenticado | `supabase.js` | Corrigido para incluir `user_id` no insert |
| BAIXO | Variáveis órfãs (`error`, `status`) declaradas mas não usadas | `supabase.js` | Limpas |
| UX | Botão FAB de suporte flutuante sem ação no Dashboard | `dashboard.html` | Removido |
| ARQUIVO | `admin.html` quebrado (importava funções deletadas) | raiz | Deletado |

### Problemas NÃO Alterados (funcionando, baixo risco)

| Item | Motivo para manter |
|------|-------------------|
| `supabase.js` importa via CDN jsDelivr | **NÃO trocar para npm** — browser não resolve bare imports sem Vite. CDN é a abordagem correta para este projeto. |
| `updateProgress` faz 2 queries (select + insert/update) | Funciona corretamente. Upsert seria mais elegante mas requer confirmar constraint única no banco. |

### Estado do Banco de Dados (mapeado em 07/05/2026)

Tabelas ativas e em uso pelo app:
- `profiles` — auth, nome, avatar, nível, batch_id
- `user_progress` — progresso por aula (user_id + lesson_id + updated_at)
- `discussions` + `discussion_comments` — mural da comunidade
- `experts` — diretório de especialistas (**agora com coluna `user_id`**)
- `calculation_history` — histórico da calculadora

Tabelas criadas pelo Gemini (existem no banco, não usadas pelo app):
- `batches` — sistema de turmas do admin (inativo). `profiles.batch_id` aponta para ela.
- `lessons` — aulas gerenciadas pelo banco (inativo). App usa conteúdo hardcoded no HTML.

---

## Roadmap Atualizado
- [x] Sincronização de Progresso (Cloud Persistence)
- [x] Módulo Financeiro (Viabilidade) na Calculadora.
- [x] Auditoria de Código e Estabilização.
- [ ] Refinamento Financeiro: Utilizar Área da Laje como base principal para CUB (Aguardando Aulas 04/05).
- [ ] Geração de Certificado em PDF (Próximo Módulo).
- [ ] Conteúdo e Quiz das Aulas 04 e 05.
- [ ] Painel Administrativo do Mentor (reescrever do zero, com módulo JS separado e auth via Supabase).
- [ ] Módulo Offline: Melhorar cache de vídeos para acesso sem internet.
