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

### Lançamento & Conteúdo (08/05)
- **[FEAT]** **Aula 4 Liberada**: Vídeo oficial, material de apoio (Ebook 4) e Quiz técnico integrados.
- **[UX]** **Quiz Inteligente**: Implementada lista de revisão automática ao final do quiz, mostrando exatamente quais questões o aluno errou.
- **[UX]** **Redistribuição de Respostas**: Respostas corretas agora distribuídas entre A, B, C e D para evitar previsibilidade (fuga do padrão "sempre B").
- **[FIX]** **Sinalização do Dashboard**: Corrigida a lógica de labels nos cards das aulas. Agora diferencia claramente o status (CONCLUÍDA) da ação (REVER/ASSISTIR), resolvendo o conflito visual de aulas concluídas que apareciam como "bloqueadas".

### Lançamento & Conteúdo (07/05)
- **[FEAT]** **Aula 3 Liberada**: Vídeo e material de apoio (Ebook 3) integrados e disponíveis no app.
- **[UX]** **Desbloqueio Progressivo**: Atualizada a lógica do Dashboard para permitir acesso à Aula 3.

### Profissionalização & UX (06/05)

---

### 2026-05-08 - Lançamento da Aula 04 & Refinamento Pedagógico
- [x] Liberação oficial da Aula 04 (Vídeo e Ebook).
- [x] Implementação de 12 novas questões de Quiz técnico da Aula 04.
- [x] Limpeza técnica do Quiz: Remoção de prefixos de categoria (ex: "(FUNDAÇÃO)") para interface mais limpa.
- [x] Implementação de feedback de erros no Quiz: Lista dinâmica de questões para revisão.
- [x] Correção de labels de status no `dashboard.html` (Status vs. Ação).
- [x] Adição de classes semânticas (`lesson-status-label`, `lesson-action-label`) para controle preciso via JS.

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

---

## Changelog — 2026-05-08 (Tarde — Migração de Ebooks)

- **[FEAT]** Criada pasta `public/ebooks/` no PWA com os 4 ebooks comprimidos (~3 MB total vs ~288 MB originais).
- **[FIX]** URLs dos ebooks 1, 2 e 3 migradas do Google Drive para arquivos locais (`/ebooks/ebook-N-aula-N.pdf`) — elimina risco de link quebrado por cancelamento ou cota do Drive.
- **[FIX]** Ebook 4 migrado de path relativo fora do PWA (`../material-apoio-ICF/...`) para path local padronizado.
- **[INFRA]** `public/ebooks/*.pdf` adicionado ao `.gitignore` — Ebook 4 original tinha 111 MB (acima do limite de 100 MB do GitHub).
- **[CLEANUP]** Arquivo órfão `calculadora.html_fixed_script.html` removido da raiz do PWA.
- **[PENDENTE]** Upload dos ebooks comprimidos no Supabase Storage (bucket `ebooks`, público) aguardando resolução de incidente técnico no Supabase. Após upload, atualizar URLs em `aula.html` para `https://hbcqldrrgrpyufylojtv.supabase.co/storage/v1/object/public/ebooks/ebook-N-aula-N.pdf`.

---

---

## Changelog — 2026-05-08 (Noite — UX, Certificado & Calculadora Piscina)

### Dashboard (`dashboard.html`)
- **[FIX]** Removida trava progressiva da Aula 4 — todas as aulas lançadas (1-4) agora acessíveis a qualquer usuário sem dependência de progresso anterior.
- **[FIX]** Removido badge NOVO que aparecia como retângulo verde entre "DIA 4" e "ASSISTIR AULA" após unlock.

### Perfil (`perfil.html`)
- **[FEAT]** Adicionado editor de nome inline ao lado do nome no perfil (lápis de edição). Permite corrigir o nome que sairá no certificado sem depender do Google Auth.
- **[FEAT]** Adicionado botão CTA de Certificado na tela de Perfil — exibe estado bloqueado até 5/5 aulas concluídas; ao completar, ativa link para `certificado.html`.
- **[FIX]** Removido lápis de edição não-funcional do avatar.

### Certificado (`certificado.html`) — NOVA TELA
- **[FEAT]** Nova tela de certificado A4 paisagem com design ICF (triângulos navy + faixa teal, logo SVG, tipografia Dancing Script).
- **[FEAT]** Nome do aluno e data de conclusão preenchidos dinamicamente via Supabase.
- **[FEAT]** Guarda authwall: redireciona para login se não autenticado; exibe estado bloqueado se progresso < 5/5.
- **[FEAT]** Botão "Imprimir / Salvar PDF" via `window.print()` com `@page { size: A4 landscape; margin: 0; }`.
- **[INFRA]** `certificado.html` adicionado ao rollup inputs do `vite.config.js`.

### Calculadora (`calculadora.html`) — Refatoração Piscina
- **[REFACTOR]** Separação completa dos modos Obra e Piscina: formulários independentes, motor de cálculo independente, memorial independente.
- **[FEAT]** Formulário Piscina com 3 dimensões (Comprimento × Largura × Profundidade) e BDI editável (padrão 40%).
- **[FEAT]** Seção "Custos Unitários" colapsável (`<details>`) com 13 campos editáveis extraídos da planilha do especialista — sem valores fixos no código.
- **[FEAT]** Memorial Piscina em 4 blocos: Estrutura ICF / Estanqueidade / Mão de Obra / Equipamentos + resumo financeiro com divisor BDI.
- **[FIX]** Fator financeiro da Piscina ajustado de 0.65 para 0.60 (margem sugestiva de 40%, conforme vídeo da aula).
- **[FEAT]** Botões "Alterar" e "Nova Simulação" em ambos os memorials (Obra e Piscina). "Alterar" retorna ao formulário mantendo os dados; "Nova Simulação" limpa tudo.
- **[FIX]** `calcularICF()` (modo Obra) limpo de referências a piscina (`isPiscina`, `KIT_PISCINA`, `custoEstrutura` piscina).

---

---

## Changelog — 2026-05-08 (Tarde/Noite — Ebooks, PWA, Calculadora ICF)

### Ebooks & Supabase Storage
- **[FEAT]** Upload dos 4 ebooks no bucket `ebooks` (público) do Supabase Storage com nomes padronizados (`EBOOK-AULA-1.pdf` a `EBOOK-AULA-4.pdf`).
- **[FIX]** URLs dos ebooks em `aula.html` atualizadas para os links públicos do Supabase Storage (`hbcqldrrgrpyufylojtv.supabase.co/storage/v1/object/public/ebooks/`).
- **[FIX]** Click handler do "Material de Apoio" em `aula.html` agora faz `fetch HEAD` antes de abrir — exibe alerta amigável se o arquivo não estiver disponível, evitando abertura de link externo indesejado.

### PWA — Correção de Trava na Tela de Logo
- **[FIX]** `manifest.json`: `start_url` alterado de `./dashboard.html` para `./` — PWA instalado no celular agora inicia pelo `index.html`, que usa `getSession()` (localStorage, sem rede) para redirecionar instantaneamente ao dashboard se já autenticado. Elimina trava na tela de logo ao abrir pelo ícone.

### Títulos das Aulas
- **[FIX]** Aula 3: "Tudo sobre preço e custos de obra com as Formas de Isopor"
- **[FIX]** Aula 4: "O passo a passo para ganhar a partir de 15k por mês com as Formas de Isopor"
- **[FIX]** Aula 5: "Avançando 4 anos em 3 meses com a Construção das Formas de isopor"

### Calculadora (`calculadora.html`) — Estimativa Financeira ICF
- **[FEAT]** Sub-toggle `CUB / ICF` dentro da aba Obras — permite escolher o modo de estimativa financeira sem sair da tela.
- **[FEAT]** Modo ICF: campos de preço unitário editáveis por material (Forma 18cm, 12cm, Canto, Concreto, Aço, ICFlex) com margem configurável. Preços salvos em `localStorage`.
- **[FEAT]** Memorial modo ICF: tabela linha a linha (quantidade × preço = subtotal) + linha "Reboco/Emboço: R$ 0,00 — substituído pelo ICFlex".
- **[FIX]** Coeficientes de concreto corrigidos para o sistema Iforms: 0,125 m³/m² (18cm) e 0,075 m³/m² (12cm).
- **[FIX]** Aço no modo ICF: calculado por 3,5 kg/m² × área total × R$/kg (campo único, em vez de metros por bitola).
- **[FIX]** Estimativa Financeira movida para o topo do formulário (antes da Geometria da Obra).
- **[FIX]** Cards informativos "Estrutural (18cm)" e "Vedação (12cm)" normalizados — mesmo estilo neutro nos dois, sem aparência de seleção.
- **[FIX]** Todos os campos de preço (ICF e Piscina) removidos os valores padrão — campos abrem vazios com placeholder orientativo. Validação bloqueia cálculo e abre o accordion se algum preço estiver em branco.

---

## Changelog — 2026-05-08 (Noite 2 — Calculadora ICF Unificada & Comunidade)

### Calculadora (`calculadora.html`) — Unificação do Modo Financeiro

- **[REFACTOR]** Removido o sub-toggle `CUB / ICF` do formulário. O simulador agora é exclusivamente ICF — sem modo alternativo.
- **[FEAT]** Preços unitários ICF sempre visíveis como accordion `<details>` (antes ficava oculto no modo CUB). Campos abrem **sempre vazios** — localStorage não restaura mais preços nem CUB.
- **[FEAT]** Campo "Referência de Mercado CUB" (opcional) adicionado abaixo da margem de lucro. Serve apenas como comparativo — não afeta o cálculo ICF.
- **[FEAT]** Memorial unificado: sempre exibe estudo ICF (linha a linha com R$ 0,00 onde o campo não foi preenchido). Card "Referência Convencional (CUB)" aparece somente se o usuário preencheu o campo CUB.
- **[FIX]** Corrigido `ReferenceError` que impedia o botão "Gerar Memorial Descritivo" de funcionar: `icfPrices` era referenciado antes de ser declarado (temporal dead zone do `const`).
- **[FIX]** Adicionado `mt-4` ao botão "Gerar Memorial Descritivo" — espaçamento faltante entre o campo de vãos e o botão.
- **[FIX]** Campos de preços ICF e campo CUB nunca mais pré-preenchidos: removidos saves e restores de `localStorage` para esses valores.
- **[FIX]** Label "Referência de Mercado (opcional)" → **"Referência de Mercado CUB"**.

### Comunidade (`comunidade.html`)

- **[FEAT]** Card "Montadores" substituído por **"Experts"** com ícone `engineering` (capacete de obra) do Material Symbols.
- **[FIX]** `<select>` do modal de cadastro atualizado: opção "Montadores" → "Experts".

---

## Changelog — 2026-05-08 (Noite 3 — Referência CUB)

### Calculadora (`calculadora.html`) — Campo de Área para CUB

- **[FEAT]** Seção "Referência de Mercado CUB" agora tem dois campos lado a lado: **CUB do Estado (R$/m²)** e **Área Construída (m²)** — o usuário informa a área real da obra em vez de usar proxy de paredes.
- **[FIX]** Cálculo do comparativo CUB corrigido: `CUB × 1,3 × área construída` (antes usava `somaAreas ÷ 2`, que era impreciso).
- **[FIX]** Card "Referência Convencional (CUB)" no memorial só aparece se **ambos** os campos (CUB e área) estiverem preenchidos.

---

---

## Changelog — 2026-05-09 — Lançamento da Aula 05

### Aula 05 (`aula.html`)
- **[FEAT]** Aula 5 liberada: `released: true`, vídeo oficial integrado (`ssg7Cj3Pr1g`).
- **[FEAT]** Quiz Aula 5 adicionado — 12 questões técnicas sobre ecossistema ICF, perfis Expert, RI ICF, certificação e visão 2028.
- **[FEAT]** Material de Apoio: EBOOK-AULA-5 referenciado (`./material-apoio-ICF/EBOOK-AULA-5.pdf`).
- **[PENDENTE]** EBOOK-AULA-5 precisa ser uploaded no Supabase Storage (bucket `ebooks`) e URL atualizada para padrão `hbcqldrrgrpyufylojtv.supabase.co/...` — pasta `material-apoio-ICF/` está fora do `iforms-pwa/`.

### Dashboard (`dashboard.html`)
- **[FEAT]** Lógica de bloqueio da Aula 5 atualizada: desbloqueia quando Aula 4 é concluída (`i === 5 && !lesson4Completed`).
- **[FEAT]** Badge NOVO adicionado ao card da Aula 5: aparece quando Aula 4 concluída e Aula 5 ainda não.

---

## Roadmap Atualizado
- [x] Sincronização de Progresso (Cloud Persistence)
- [x] Módulo Financeiro (Viabilidade) na Calculadora.
- [x] Auditoria de Código e Estabilização.
- [x] Liberação da Aula 04 e Quiz técnico (Limpo e Redistribuído).
- [x] Feedback de erros detalhado no Quiz.
- [x] Migração de Ebooks para arquivos locais comprimidos.
- [x] Desbloqueio de Aulas 1-4 sem trava progressiva.
- [x] Editor de nome no Perfil (para uso no certificado).
- [x] Certificado de conclusão (`certificado.html`) — A4 landscape, print/PDF.
- [x] Calculadora Piscina: motor separado, custos editáveis, memorial próprio.
- [x] Liberação da Aula 05 (vídeo, quiz, ebook) — conteúdo completo integrado.
- [ ] Upload do EBOOK-AULA-5 no Supabase Storage e atualização da URL em `aula.html`.
- [ ] Teste do Certificado com 5/5 aulas concluídas (fluxo completo agora possível).
- [ ] Refinamento Financeiro: Base de cálculo da área da laje para CUB.
- [ ] Painel Administrativo do Mentor (V2 estável, com módulo JS separado e auth via Supabase).
- [ ] Módulo Offline: Melhorar cache de vídeos para acesso sem internet.
