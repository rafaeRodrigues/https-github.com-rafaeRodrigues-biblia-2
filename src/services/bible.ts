import { supabase } from '@/lib/supabase/client'

export type BibleBook = {
  id: string
  name: string
  abbreviation: string
  testament: string
  chapters_count: number
  sort_order: number
}

export type BibleVerse = {
  id: string
  book_id: string
  chapter: number
  verse: number
  text: string
}

export const getBibleBooks = async () => {
  const { data, error } = await supabase
    .from('bible_books')
    .select('*')
    .order('sort_order')

  if (error) throw error
  return data as BibleBook[]
}

export const getBibleBook = async (id: string) => {
  const { data, error } = await supabase
    .from('bible_books')
    .select('*')
    .eq('id', id)
    .single()

  if (error) throw error
  return data as BibleBook
}

export const getChapterVerses = async (bookId: string, chapter: number) => {
  const { data, error } = await supabase
    .from('bible_verses')
    .select('*')
    .eq('book_id', bookId)
    .eq('chapter', chapter)
    .order('verse')

  if (error) throw error
  return data as BibleVerse[]
}
