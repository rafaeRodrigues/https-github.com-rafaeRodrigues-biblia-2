import { supabase } from '@/lib/supabase/client'

export async function getSocialLinks() {
  try {
    const { data, error } = await supabase
      .from('app_config')
      .select('key, value')
      .in('key', ['spotify_url', 'instagram_url', 'social_links'])

    if (error) {
      console.error('Error fetching social links', error)
      return null
    }

    const result: { instagram?: string; spotify?: string; maps?: string } = {}

    // Process old social_links first as fallback
    const socialLinksRow = data?.find((item) => item.key === 'social_links')
    if (
      socialLinksRow &&
      typeof socialLinksRow.value === 'object' &&
      socialLinksRow.value !== null
    ) {
      const val = socialLinksRow.value as Record<string, string>
      if (val.instagram) result.instagram = val.instagram
      if (val.spotify) result.spotify = val.spotify
      if (val.maps) result.maps = val.maps
    }

    // Override with individual specific URLs
    const instagramRow = data?.find((item) => item.key === 'instagram_url')
    if (
      instagramRow &&
      typeof instagramRow.value === 'object' &&
      instagramRow.value !== null
    ) {
      const val = instagramRow.value as Record<string, string>
      if (val.url) result.instagram = val.url
    }

    const spotifyRow = data?.find((item) => item.key === 'spotify_url')
    if (
      spotifyRow &&
      typeof spotifyRow.value === 'object' &&
      spotifyRow.value !== null
    ) {
      const val = spotifyRow.value as Record<string, string>
      if (val.url) result.spotify = val.url
    }

    return result
  } catch (e) {
    console.error('Error fetching config', e)
    return null
  }
}
