import { supabase } from '@/lib/supabase/client'

export const getUserHighlights = async (verseIds: string[]) => {
  if (!verseIds.length) return []
  const { data, error } = await supabase
    .from('user_highlights')
    .select('*')
    .in('verse_id', verseIds)
  if (error) throw error
  return data
}

export const setHighlight = async (verseId: string, color: string) => {
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return

  const { data, error } = await supabase
    .from('user_highlights')
    .upsert(
      { user_id: user.id, verse_id: verseId, color },
      { onConflict: 'user_id,verse_id' },
    )
    .select()
    .single()
  if (error) throw error
  return data
}

export const removeHighlight = async (verseId: string) => {
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return

  const { error } = await supabase
    .from('user_highlights')
    .delete()
    .eq('user_id', user.id)
    .eq('verse_id', verseId)
  if (error) throw error
}

export const updateReadingProgress = async (
  bookId: string,
  chapter: number,
) => {
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return

  const { error } = await supabase.from('user_reading_progress').upsert(
    {
      user_id: user.id,
      book_id: bookId,
      chapter,
      updated_at: new Date().toISOString(),
    },
    { onConflict: 'user_id' },
  )
  if (error) throw error
}

export const getReadingProgress = async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return null

  const { data, error } = await supabase
    .from('user_reading_progress')
    .select('*, bible_books(*)')
    .eq('user_id', user.id)
    .single()

  if (error && error.code !== 'PGRST116') throw error
  return data
}
