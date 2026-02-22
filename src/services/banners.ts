import { supabase } from '@/lib/supabase/client'

export const getBanners = async () => {
  const { data, error } = await supabase
    .from('banners')
    .select('*')
    .eq('active', true)
    .order('sort_order')

  if (error) throw error
  return data
}
