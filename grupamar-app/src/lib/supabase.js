import { createClient } from '@supabase/supabase-js';

// Usaremos variables de entorno, por ahora configuradas con placeholders
const rawUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const isValidUrl = rawUrl && (rawUrl.startsWith('http://') || rawUrl.startsWith('https://'));

const supabaseUrl = isValidUrl ? rawUrl : 'https://tu-proyecto.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'tu-anon-key';

if (!isValidUrl) {
  console.warn('WARNING: NEXT_PUBLIC_SUPABASE_URL is not configured or is not a valid HTTP/HTTPS URL. Falling back to placeholder URL.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

