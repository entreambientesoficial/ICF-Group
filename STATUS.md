# STATUS DO PROJETO — Iforms Grupo ICF PWA

> Última atualização: 2026-05-06 (Noite - Profissionalização e Ecossistema)
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

### Profissionalização & UX
- **[FEAT]** **Perfil Dinâmico**: Integração das funções `getUserStats` e `getUserExpertData` para exibir dados reais de engajamento do aluno.
- **[FIX]** **Ecosystem Links**: Correção de todos os links 404 nos cards do Dashboard, apontando para as URLs oficiais do ecossistema Grupo ICF.
- **[CLEAN]** **Interface Minimalista**: Removida a seção "Dados do Credenciado" e otimizado o toggle de notificações (corrigida a lógica de cores e estado inicial).
- **[FIX]** **Suporte Técnico**: Redirecionamento do botão de suporte diretamente para o WhatsApp oficial, removendo fluxos desnecessários.

---

## Roadmap Atualizado

- [x] Integrar Supabase para Autenticação (Google Login)
- [x] Sincronização de Progresso (Cloud Persistence)
- [x] Correção Crítica: Motor de Cálculo de Concreto
- [x] Comunidade Real (Mural + Diretório Supabase)
- [x] Perfil Dinâmico com Estatísticas de Engajamento
- [x] Ativação Total do Ecossistema (Links Reais)
- [ ] Criar Painel de Admin para o Mentor (Fase 4 - Gerenciamento de Alunos)
- [ ] Inserir perguntas e respostas das Aulas 03 a 05
- [ ] Implementar geração de Certificado PDF (Pós-conclusão do curso)
- [ ] Módulo Offline: Melhorar cache de vídeos para acesso sem internet
