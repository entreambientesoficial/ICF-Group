# STATUS DO PROJETO — Iforms Grupo ICF PWA

> Última atualização: 2026-05-06 (Noite - Entrega da Comunidade Real)
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
│       ├── supabase.js      # 🛡️ Core: Auth + Progresso + Mural + Experts
│       └── pwa.js           # Registro SW + Install Prompt
├── index.html               # 🔐 Login Page (Social Auth Google)
├── dashboard.html           # 🏠 Home personalizada com nome/foto do Google
├── aula.html                # 📺 Vídeo Player Premium + Progresso Real-time
├── calculadora.html         # 🧮 Motor de Engenharia v3 (Persistente)
├── comunidade.html          # 👥 Hub Social REAL (Sem dados mock)
├── perfil.html              # 👤 Gestão de Conta
├── STATUS.md                # Controle de Versão
└── ...
```

---

## Evolução das Telas

### Dashboard (`dashboard.html`) ✅
- **Personalização Dinâmica**: Exibe o nome e avatar real do aluno (via Google Auth).
- **Video Hero**: Vídeo de introdução com capa premium e botão de play verde (ID visual ICF).

### Aula (`aula.html`) ✅
- **Player Premium**: Botão de play verde customizado.
- **Progresso Resiliente**: O botão "Marcar como Concluída" agora persiste no Supabase instantaneamente.

### Calculadora (`calculadora.html`) ✅
- **Motor de Engenharia Corrigido**: Implementados coeficientes diferenciados (0.072 e 0.042).
- **Persistência Local (F5)**: O app lembra os dados da última simulação.

### Comunidade Expert (`comunidade.html`) 🚀 [NOVO]
- **Mural 100% Real**: Removidos todos os dados fictícios. Postagens e comentários agora vêm do banco de dados.
- **Identidade Visual**: Posts exibem o avatar e nome real do autor via Google.
- **Diretório Dinâmico**: Busca de profissionais por categoria e região com dados reais de cadastro.
- **Engajamento**: Sistema de curtidas e respostas em tempo real com formatação de data relativa ("há 5 min").

---

## Changelog — Sessão Final 2026-05-06

### Integração Supabase (Fase 1, 2 e 3 Concluídas)
- **[FEAT]** **Comunidade Real**: Implementada a lógica de CRUD (Create, Read, Update, Delete) para discussões e comentários.
- **[FEAT]** **Diretório de Elite**: Ativada a tabela `experts` para cadastro e consulta de profissionais certificados.
- **[SEC]** **RLS Policies**: Configuradas políticas de segurança no Supabase para proteger postagens e dados de usuários.
- **[FIX]** **Scope Isolation**: Resolvido conflito de módulos que impedia o funcionamento de botões `onclick` no HTML.

### UI/UX & Refinamento
- **[CLEAN]** **No Fake Data**: Removida a métrica fixa de "96% Sucesso" para manter integridade visual 100% baseada em fatos.
- **[STYLE]** **Time-Ago Logic**: Implementada função JS para exibir horários de postagem de forma amigável.
- **[FIX]** **Hero Carousel**: Restaurada a animação automática do banner de ecossistema.

---

## Roadmap Atualizado

- [x] Integrar Supabase para Autenticação (Google Login)
- [x] Sincronização de Progresso (Cloud Persistence)
- [x] Correção Crítica: Motor de Cálculo de Concreto
- [x] **Comunidade Real (Mural + Diretório Supabase)**
- [ ] Criar Painel de Admin para o Mentor (Fase 4 - Gerenciamento de Alunos)
- [ ] Inserir perguntas e respostas das Aulas 03 a 05
- [ ] Implementar geração de Certificado PDF (Pós-conclusão do curso)
- [ ] Módulo Offline: Melhorar cache de vídeos para acesso sem internet
