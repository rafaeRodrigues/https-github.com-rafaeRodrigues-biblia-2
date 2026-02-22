import { supabase } from '@/lib/supabase/client'

export const getBibleVerses = async () => {
  const { data, error } = await supabase
    .from('bible_verses')
    .select(
      `
      id, text, chapter, verse,
      bible_books ( name )
    `,
    )
    .order('chapter')
    .order('verse')

  if (error) throw error
  return data
}
