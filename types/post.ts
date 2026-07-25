export interface Post {
  id: number;
  title: string;
  file: string;
  user_id: string;
  cover: string;

  postsLikes: PostLike[];
  comments: {
    id: number;
  }[];

  profile: {
    username: string;
    avatar_url: string | null;
  };
}

interface PostLike {
  id: number;
  post_id: number;
  user_id: string;
}
