import { supabase } from "@/lib/supabase";
import { Book } from "@/types/book";
/**
 * @description
 * fetches all books from the supabase "library" table,
 * ordered alphabetically by title
 * Also provides helper utilities for resolving file URLs
 * for book covers and PDFs
 */

/**
 * @description
 * retrieves the full list of books from supabase database
 * @async
 * @function getBooks
 * @returns {Promise<Book[]>} array of books sorted by title
 * @throws {Error} throws supabase error if request fails
 */
export async function getBooks(): Promise<Book[]> {
  const { data, error } = await supabase
    .from("library")
    .select("*")
    .order("title");

  if (error) throw error;

  return data as Book[];
}

export function getCoverUrl(url: string) {
  return url;
}

export function getPdfUrl(url: string) {
  return url;
}
