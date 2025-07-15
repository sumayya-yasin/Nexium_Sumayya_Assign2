import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

export const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey);

export interface Summary {
  id: string;
  url: string;
  summary: string;
  urdu: string;
  created_at: string;
}

export async function saveSummary(
  url: string,
  summary: string,
  urdu: string
) {

  const { data, error } = await supabaseAdmin
    .from("summaries")
    .insert([{ url, summary, urdu: urdu }])
    .select();

  if (error) throw error;
  return data?.[0];
}