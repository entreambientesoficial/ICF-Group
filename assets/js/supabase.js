import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

const SUPABASE_URL = 'https://hbcqldrrgrpyufylojtv.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhiY3FsZHJyZ3JweXVmeWxvanR2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgwNzkyNjEsImV4cCI6MjA5MzY1NTI2MX0.Secv9HlJGqawkoKzUi5O9FNM82fNbjK50f0VQJKDOpo'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

// --- AUTH & PROFILE ---
export async function loginWithGoogle() {
    const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
            redirectTo: window.location.origin + window.location.pathname.replace('index.html', 'dashboard.html')
        }
    })
    if (error) console.error('Erro ao logar:', error.message)
}

export async function logout() {
    const { error } = await supabase.auth.signOut()
    if (error) console.error('Erro ao deslogar:', error.message)
    localStorage.clear()
    window.location.href = 'index.html'
}

export async function getUser() {
    const { data: { user } } = await supabase.auth.getUser()
    return user
}

export async function syncProfile(user) {
    if (!user) return
    const profileData = {
        id: user.id,
        full_name: user.user_metadata.full_name,
        avatar_url: user.user_metadata.avatar_url,
        updated_at: new Date().toISOString()
    }
    await supabase.from('profiles').upsert(profileData)
    localStorage.setItem('user_name', user.user_metadata.full_name)
    localStorage.setItem('user_photo', user.user_metadata.avatar_url)
}

// --- PROGRESS ---
export async function getProgress() {
    const user = await getUser()
    if (!user) return []
    const { data, error } = await supabase.from('user_progress').select('*').eq('user_id', user.id)
    return data || []
}

export async function updateProgress(lessonId, status) {
    const user = await getUser()
    if (!user) return
    const numericId = typeof lessonId === 'string' ? parseInt(lessonId.replace('lesson_', '')) : lessonId;
    const { data: existing } = await supabase.from('user_progress').select('lesson_id').eq('user_id', user.id).eq('lesson_id', numericId).maybeSingle()
    if (existing) {
        await supabase.from('user_progress').update({ updated_at: new Date().toISOString() }).eq('user_id', user.id).eq('lesson_id', numericId)
    } else {
        await supabase.from('user_progress').insert({ user_id: user.id, lesson_id: numericId, updated_at: new Date().toISOString() })
    }
    return true
}

// --- ADMIN ---
export async function getBatches() {
    const { data } = await supabase.from('batches').select('*').order('created_at', { ascending: false });
    return data || [];
}
export async function updateLessonAdmin(id, lessonData) {
    await supabase.from('lessons').update(lessonData).eq('id', id);
}
export async function updateBatchAdmin(id, batchData) {
    await supabase.from('batches').update(batchData).eq('id', id);
}
export async function createBatch(name, status) {
    await supabase.from('batches').insert([{ name, status, created_at: new Date().toISOString() }]);
}

// --- COMUNIDADE & EXPERTS ---
export async function getExperts(category = '') {
    let query = supabase.from('experts').select('*').order('created_at', { ascending: false })
    if (category) query = query.eq('category', category)
    const { data } = await query
    return data || []
}

export async function registerExpert(expertData) {
    await supabase.from('experts').insert([{ ...expertData, created_at: new Date().toISOString() }])
}

export async function getDiscussions() {
    const { data } = await supabase.from('discussions').select('*, profiles(full_name, avatar_url), discussion_comments(count)').order('is_fixed', { ascending: false }).order('created_at', { ascending: false })
    return data || []
}

export async function createDiscussion(title, content) {
    const user = await getUser()
    if (!user) throw new Error('Não autenticado')
    await supabase.from('discussions').insert([{ title, content, author_id: user.id, likes: 0, is_fixed: false, created_at: new Date().toISOString() }])
}

export async function getComments(discussionId) {
    const { data } = await supabase.from('discussion_comments').select('*, profiles(full_name, avatar_url)').eq('discussion_id', discussionId).order('created_at', { ascending: true })
    return data || []
}

export async function addComment(discussionId, text) {
    const user = await getUser()
    if (!user) throw new Error('Não autenticado')
    await supabase.from('discussion_comments').insert([{ discussion_id: discussionId, author_id: user.id, text, created_at: new Date().toISOString() }])
}

export async function toggleLikeDiscussion(discussionId, currentLikes) {
    await supabase.from('discussions').update({ likes: currentLikes + 1 }).eq('id', discussionId)
}

// --- PERFIL & STATS ---
export async function getUserExpertData() {
    const user = await getUser()
    if (!user) return null
    const { data } = await supabase.from('experts').select('*').eq('full_name', user.user_metadata.full_name).maybeSingle()
    return data
}

export async function getUserStats() {
    const user = await getUser()
    if (!user) return { discussions: 0, comments: 0, total: 0 }
    const [discussions, comments] = await Promise.all([
        supabase.from('discussions').select('id', { count: 'exact', head: true }).eq('author_id', user.id),
        supabase.from('discussion_comments').select('id', { count: 'exact', head: true }).eq('author_id', user.id)
    ])
    return { discussions: discussions.count || 0, comments: comments.count || 0, total: (discussions.count || 0) + (comments.count || 0) }
}
