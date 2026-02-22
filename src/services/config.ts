import { supabase } from '@/lib/supabase/client'

export async function getSocialLinks() {
  try {
    const { data, error } = await supabase
      .from('app_config')
      .select('value')
      .eq('key', 'social_links')
      .single()

    if (error) {
      if (error.code !== 'PGRST116') {
        console.error('Error fetching social links', error)
      }
      return null
    }

    return data?.value as {
      instagram?: string
      spotify?: string
      maps?: string
    } | null
  } catch (e) {
    console.error('Error fetching config', e)
    return null
  }
}
