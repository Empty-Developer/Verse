export interface Comment {
  id: number;
  created_at: string;
  text: string;
  user_id: string;
  post_id: number;

  profile?: {
    username: string;
    avatar_url: string | null;
  };
}