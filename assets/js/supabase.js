import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

const SUPABASE_URL = 'https://hbcqldrrgrpyufylojtv.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhiY3FsZHJyZ3JweXVmeWxvanR2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgwNzkyNjEsImV4cCI6MjA5MzY1NTI2MX0.Secv9HlJGqawkoKzUi5O9FNM82fNbjK50f0VQJKDOpo'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

// Função para Login com Google
export async function loginWithGoogle() {
    const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
            redirectTo: window.location.origin + window.location.pathname.replace('index.html', 'dashboard.html')
        }
    })
    if (error) console.error('Erro ao logar:', error.message)
}

// Função para Logout
export async function logout() {
    const { error } = await supabase.auth.signOut()
    if (error) console.error('Erro ao deslogar:', error.message)
    localStorage.clear()
    window.location.href = 'index.html'
}

// Função para buscar dados do usuário logado
export async function getUser() {
    const { data: { user } } = await supabase.auth.getUser()
    return user
}

// Função para sincronizar perfil com o banco
export async function syncProfile(user) {
    if (!user) return

    const profileData = {
        id: user.id,
        full_name: user.user_metadata.full_name,
        avatar_url: user.user_metadata.avatar_url,
        updated_at: new Date().toISOString()
    }

    const { error } = await supabase
        .from('profiles')
        .upsert(profileData)

    if (error) console.error('Erro ao sincronizar perfil:', error.message)
    
    // Salva no localStorage para carregamento instantâneo (UX)
    localStorage.setItem('user_name', user.user_metadata.full_name)
    localStorage.setItem('user_photo', user.user_metadata.avatar_url)
}

// Função para buscar o progresso do usuário
export async function getProgress() {
    const user = await getUser()
    if (!user) return []
    
    const { data, error } = await supabase
        .from('user_progress')
        .select('*')
        .eq('user_id', user.id)
    
    if (error) {
        console.error('Erro ao buscar progresso:', error.message)
        return []
    }
    return data
}

// Função para atualizar o progresso de uma aula
export async function updateProgress(lessonId, status) {
    const user = await getUser()
    if (!user) return
    
    // Converte lesson_1, lesson_2 para 1, 2 (caso venha como string)
    const numericId = typeof lessonId === 'string' ? parseInt(lessonId.replace('lesson_', '')) : lessonId;

    try {
        // Busca se já existe um registro para esta aula (manual upsert)
        const { data: existing, error: fetchError } = await supabase
            .from('user_progress')
            .select('lesson_id')
            .eq('user_id', user.id)
            .eq('lesson_id', numericId)
            .maybeSingle()

        if (fetchError) throw fetchError

        let result;
        if (existing) {
            // Se já existe, atualiza apenas o timestamp
            result = await supabase
                .from('user_progress')
                .update({ 
                    updated_at: new Date().toISOString() 
                })
                .eq('user_id', user.id)
                .eq('lesson_id', numericId)
        } else {
            // Se não existe, insere novo (apenas user e lesson)
            result = await supabase
                .from('user_progress')
                .insert({
                    user_id: user.id,
                    lesson_id: numericId,
                    updated_at: new Date().toISOString()
                })
        }
        
        if (result.error) {
            console.error('Erro na operação de progresso:', result.error.message)
            throw result.error
        }
        return true
    } catch (err) {
        console.error('Falha crítica ao atualizar progresso:', err)
        throw err
    }
}
// ── Funções de Comunidade (Dados Reais) ──────────────────────────

// Buscar todos os especialistas credenciados
export async function getExperts(category = '') {
    let query = supabase.from('experts').select('*').order('created_at', { ascending: false })
    if (category) query = query.eq('category', category)
    
    const { data, error } = await query
    if (error) {
        console.error('Erro ao buscar especialistas:', error.message)
        return []
    }
    return data
}

// Cadastrar novo especialista
export async function registerExpert(expertData) {
    const { data, error } = await supabase
        .from('experts')
        .insert([{
            ...expertData,
            created_at: new Date().toISOString()
        }])
    
    if (error) throw error
    return data
}

// Buscar discussões do mural
export async function getDiscussions() {
    const { data, error } = await supabase
        .from('discussions')
        .select('*, profiles(full_name, avatar_url), discussion_comments(count)')
        .order('is_fixed', { ascending: false })
        .order('created_at', { ascending: false })

    if (error) {
        console.error('Erro ao buscar discussões:', error.message)
        return []
    }
    return data
}

// Criar nova discussão
export async function createDiscussion(title, content) {
    const user = await getUser()
    if (!user) throw new Error('Usuário não autenticado')

    const { data, error } = await supabase
        .from('discussions')
        .insert([{
            title,
            content,
            author_id: user.id,
            likes: 0,
            is_fixed: false,
            created_at: new Date().toISOString()
        }])
    
    if (error) throw error
    return data
}

// Buscar comentários de uma discussão
export async function getComments(discussionId) {
    const { data, error } = await supabase
        .from('discussion_comments')
        .select('*, profiles(full_name, avatar_url)')
        .eq('discussion_id', discussionId)
        .order('created_at', { ascending: true })

    if (error) {
        console.error('Erro ao buscar comentários:', error.message)
        return []
    }
    return data
}

// Adicionar comentário
export async function addComment(discussionId, text) {
    const user = await getUser()
    if (!user) throw new Error('Usuário não autenticado')

    const { error } = await supabase
        .from('discussion_comments')
        .insert([{
            discussion_id: discussionId,
            author_id: user.id,
            text,
            created_at: new Date().toISOString()
        }])
    
    if (error) throw error
    return true
}

// Curtir discussão
export async function toggleLikeDiscussion(discussionId, currentLikes) {
    const { error } = await supabase
        .from('discussions')
        .update({ likes: currentLikes + 1 })
        .eq('id', discussionId)
    
    if (error) throw error
    return true
}
