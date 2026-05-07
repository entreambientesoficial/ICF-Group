# STATUS DO PROJETO - GRUPO ICF

> [!CAUTION]
> # ⚠️ REGRA DE OURO: NÃO ALTERAR O QUE JÁ ESTÁ FUNCIONANDO OU FOI APROVADO! ⚠️
> **QUALQUER PROBLEMA ENCONTRADO É RESULTADO DE MEXER EM ALGO QUE NÃO DEVERIA TER SIDO TOCADO. MANTENHA A ESTABILIDADE DAS TELAS JÁ FINALIZADAS.**

## Histórico de Restauração (07/05/2026)
- **ROLLBACK TOTAL**: O projeto foi revertido para o commit estável `4d62e53` para descartar automações de admin não solicitadas.
- **RESTAURAÇÃO DE CONEXÕES**: Funções críticas de Perfil e Comunidade foram reintegradas ao `supabase.js`.
- **ADMIN ORIGINAL**: Mantido o arquivo `admin.html` com a adição apenas do campo PDF.

# STATUS DO PROJETO — Iforms Grupo ICF PWA

> Última atualização: 2026-05-07 (Manhã - Lançamento Aula 3)
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

## Roadmap Atualizado
- [x] Sincronização de Progresso (Cloud Persistence)
- [x] Módulo Financeiro (Viabilidade) na Calculadora.
- [ ] Refinamento Financeiro: Utilizar Área da Laje como base principal para CUB (Aguardando Aulas 04/05).
- [ ] Geração de Certificado em PDF (Próximo Módulo).
- [ ] Conteúdo e Quiz das Aulas 04 e 05.
- [ ] Painel Administrativo do Mentor.
- [ ] Módulo Offline: Melhorar cache de vídeos para acesso sem internet.
