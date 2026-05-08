import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

const SUPABASE_URL = 'https://hbcqldrrgrpyufylojtv.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhiY3FsZHJyZ3JweXVmeWxvanR2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgwNzkyNjEsImV4cCI6MjA5MzY1NTI2MX0.Secv9HlJGqawkoKzUi5O9FNM82fNbjK50f0VQJKDOpo'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

// --- AUTH & PROFILE ---
export async function loginWithGoogle() {
    const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
            redirectTo: window.location.origin + '/'
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
    const { data } = await supabase.from('user_progress').select('*').eq('user_id', user.id)
    return data || []
}

export async function updateProgress(lessonId) {
    const user = await getUser()
    if (!user) return
    const numericId = typeof lessonId === 'string' ? parseInt(lessonId.replace('lesson_', '')) : lessonId;
    await supabase.from('user_progress').upsert(
        { user_id: user.id, lesson_id: numericId, completed: true, updated_at: new Date().toISOString() },
        { onConflict: 'user_id,lesson_id' }
    )
    return true
}

export function computeLevel(completedCount, totalLessons = 5) {
    const pct = (completedCount / totalLessons) * 100
    if (pct >= 100) return 'Expert'
    if (pct >= 30)  return 'Intermediário'
    return 'Iniciante'
}

// --- COMUNIDADE & EXPERTS ---
export async function getExperts(category = '') {
    let query = supabase.from('experts').select('*').order('created_at', { ascending: false })
    if (category) query = query.eq('category', category)
    const { data } = await query
    return data || []
}

export async function registerExpert(expertData) {
    const user = await getUser()
    if (!user) throw new Error('Não autenticado')
    await supabase.from('experts').insert([{ ...expertData, user_id: user.id, created_at: new Date().toISOString() }])
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
    const user = await getUser()
    if (!user) return
    const key = `liked_${discussionId}_${user.id}`
    if (localStorage.getItem(key)) return
    await supabase.from('discussions').update({ likes: currentLikes + 1 }).eq('id', discussionId)
    localStorage.setItem(key, '1')
}

// --- PERFIL & STATS ---
export async function getUserExpertData() {
    const user = await getUser()
    if (!user) return null
    const { data } = await supabase.from('experts').select('*').eq('user_id', user.id).maybeSingle()
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
