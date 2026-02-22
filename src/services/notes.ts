import { supabase } from '@/lib/supabase/client'

export type Note = {
  id: string
  user_id: string
  title: string
  content: string
  importance_color: string
  created_at: string
  updated_at: string
}

export const getNotes = async () => {
  const { data, error } = await supabase
    .from('user_notes')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) throw error
  return data as Note[]
}

export const createNote = async (
  note: Pick<Note, 'title' | 'content' | 'importance_color'>,
) => {
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) throw new Error('User not authenticated')

  const { data, error } = await supabase
    .from('user_notes')
    .insert([{ ...note, user_id: user.id }])
    .select()
    .single()

  if (error) throw error
  return data as Note
}

export const updateNote = async (
  id: string,
  note: Partial<Pick<Note, 'title' | 'content' | 'importance_color'>>,
) => {
  const { data, error } = await supabase
    .from('user_notes')
    .update(note)
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return data as Note
}

export const deleteNote = async (id: string) => {
  const { error } = await supabase.from('user_notes').delete().eq('id', id)
  if (error) throw error
}
