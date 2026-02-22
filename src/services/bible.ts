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
  const { data, error } = await supabase.functions.invoke('biblia', {
    body: { action: 'getBooks' },
  })

  if (error) throw error
  if (data?.error) throw new Error(data.error)
  return data as BibleBook[]
}

export const getBibleBook = async (id: string) => {
  const { data, error } = await supabase.functions.invoke('biblia', {
    body: { action: 'getBook', bookId: id },
  })

  if (error) throw error
  if (data?.error) throw new Error(data.error)
  return data as BibleBook
}

export const getChapterVerses = async (bookId: string, chapter: number) => {
  const { data, error } = await supabase.functions.invoke('biblia', {
    body: { action: 'getVerses', bookId, chapter },
  })

  if (error) throw error
  if (data?.error) throw new Error(data.error)
  return data as BibleVerse[]
}
