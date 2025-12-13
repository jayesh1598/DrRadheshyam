import { supabase } from './supabase/client';

const defaultFaviconUrl = 'https://cdn.builder.io/api/v1/image/assets%2F2e2e8381dd584ea8a16aee5e50efd1c7%2F930bf2b97f2f4b4f8bf28cb96236cf56?format=webp&width=800';

export async function loadAndSetFavicon() {
  try {
    const { data, error } = await supabase
      .from('site_settings')
      .select('setting_value')
      .eq('setting_key', 'favicon')
      .single();

    if (error && error.code !== 'PGRST116') {
      console.error('Error loading favicon:', error);
      return;
    }

    const faviconUrl = data?.setting_value || defaultFaviconUrl;
    updateFavicon(faviconUrl);
  } catch (err) {
    console.error('Error:', err);
  }
}

export function updateFavicon(url: string) {
  let link: HTMLLinkElement | null = document.querySelector('link[rel="icon"]');
  
  if (!link) {
    link = document.createElement('link');
    link.rel = 'icon';
    document.head.appendChild(link);
  }
  
  link.href = url;
  
  // Also set Apple touch icon for mobile devices
  let appleLink: HTMLLinkElement | null = document.querySelector('link[rel="apple-touch-icon"]');
  if (!appleLink) {
    appleLink = document.createElement('link');
    appleLink.rel = 'apple-touch-icon';
    document.head.appendChild(appleLink);
  }
  appleLink.href = url;
}
