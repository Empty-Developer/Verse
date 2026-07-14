import { supabase } from "@/lib/supabase";
import { Post } from "@/types/post";
/**
 * @TODO
 * 1 - need create a new function
 * 2 - create us function one take
 */
export async function getPosts(): Promise<Post[]> {
  const {data, error} = await supabase
    .from('posts')
    .select('*')
    .order('title')

    if (error) throw error;
    
    return data as Post[];
}

export function getCoverUrl(url: string) {
  return url;
}

export function getPdfUrl(url: string) {
  return url;
}