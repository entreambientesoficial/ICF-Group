# STATUS DO PROJETO — Iforms Grupo ICF PWA

> Última atualização: 2026-05-06 (Final do Dia)
> Projeto: `c:\APP-SITE-SAAS\ICF-GROUP\iforms-pwa\`

---

## Visão Geral

PWA de treinamento técnico em construção ICF (Insulated Concrete Forms). O app foi profissionalizado com integração completa ao **Supabase** para persistência de dados e autenticação oficial, garantindo que o progresso do aluno seja salvo na nuvem.

---

## Stack Técnica

| Camada     | Tecnologia                        | Notas                              |
|------------|-----------------------------------|------------------------------------|
| Backend    | **Supabase (PostgreSQL)**         | Auth + DB Progress Tracking        |
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
│       ├── supabase.js      # 🛡️ Core: Auth Google + Sincronização de Progresso
│       └── pwa.js           # Registro SW + Install Prompt
├── index.html               # 🔐 Login Page (Social Auth Google)
├── dashboard.html           # 🏠 Home personalizada com nome/foto do Google
├── aula.html                # 📺 Vídeo Player Premium + Progresso Real-time
├── calculadora.html         # 🧮 Motor de Engenharia v3 (Corrigido)
├── comunidade.html          # 👥 Hub Social
├── perfil.html              # 👤 Gestão de Conta
├── STATUS.md                # Controle de Versão
└── ...
```

---

## Evolução das Telas

### Dashboard (`dashboard.html`) ✅
- **Personalização Dinâmica**: Exibe o nome e avatar real do aluno (via Google Auth).
- **Video Hero**: Vídeo de introdução com capa premium e botão de play verde (ID visual ICF).
- **Hierarchy Refinement**: Selo de confiança IPT/DATEC movido para o rodapé para limpar o topo da página.

### Aula (`aula.html`) ✅
- **Player Premium**: Botão de play verde customizado (sem o vermelho do YouTube inicial).
- **Progresso Resiliente**: O botão "Marcar como Concluída" agora persiste no Supabase instantaneamente.
- **Auto-Sync**: Barra de progresso do módulo e ícones da playlist atualizam sem recarregar a página.
- **Simplificação**: Removida a seção de anotações para maior foco no vídeo.

### Calculadora (`calculadora.html`) ✅
- **Estabilização Crítica**: Resolvido erro de corrupção de script.
- **Sincronia de Dados**: Inputs e motor de cálculo reconectados.
- **Memorial Descritivo**: Gerando relatórios técnicos 100% funcionais.

---

## Changelog — Sessão Final 2026-05-06

### Integração Supabase (Fase 1 e 2 Concluídas)
- **[FEAT]** **Social Login**: Implementado login via Google no `index.html`.
- **[FEAT]** **Progress Persistence**: Sincronização automática de aulas concluídas com a tabela `user_progress`.
- **[FIX]** **Schema Resilience**: Lógica de progresso adaptada para funcionar mesmo sem a coluna `status` (baseada em registro de presença).

### UI/UX & Refinamento
- **[STYLE]** **Botão Concluído**: Novo estilo cinza premium (mais visível e elegante).
- **[STYLE]** **Font Size**: Ajustada a tipografia da saudação para evitar poluição visual.
- **[FIX]** **Modal de Sucesso**: Corrigido o disparo do alerta de conclusão de aula.

---

## Roadmap Atualizado

- [x] Integrar Supabase para Autenticação (Google Login)
- [x] Sincronização de Progresso (Cloud Persistence)
- [ ] Criar Painel de Admin para o Mentor (Fase 3 - Gerenciamento de Alunos)
- [ ] Inserir perguntas e respostas das Aulas 03 a 05 (Aguardando liberação de conteúdo)
- [ ] Implementar geração de Certificado PDF (Pós-conclusão do curso)
