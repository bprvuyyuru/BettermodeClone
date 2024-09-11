export type Reaction = {
  reaction: string;
  count: number;
};

export type ToggleReaction = (
  reactionName: string,
  postId: string,
  reactions: Reaction[]
) => void;

export interface Post {
  id: string;
  title: string;
  owner: {
    member: {
      name: string;
    };
  };
  space: {
    name: string;
  };
  publishedAt: string;
  reactions: Reaction[];
}

export interface PostsData {
  posts: {
    nodes: Post[];
    totalCount: number;
  };
}

export interface PostsVars {
  limit: number;
  offset: number;
}

export interface PostDetail {
  title: string;
  textContent: string;
  owner: {
    member: {
      name: string;
    };
  };
  space: {
    name: string;
  };
  publishedAt: string;
  reactions: Reaction[];
}

export interface PostDetailData {
  post: PostDetail;
}

export interface PostDetailVars {
  id: string;
}

export interface CardProps {
  title: string;
  textContent: string;
  owner: string;
  space: string;
  publishedAt: string;
  reactions: Reaction[];
  postId: string;
  toggleReaction: ToggleReaction;
}

export interface TableboxProps {
  posts: Array<{
    id: string;
    title: string;
    owner: { member: { name: string } };
    space: { name: string };
    publishedAt: string;
    reactions: Reaction[];
  }>;
  onLoadMore: () => void;
  allPostsLoaded: boolean;
  onPostClick: (postId: string) => void;
  toggleReaction: ToggleReaction;
}

export interface ReactionProps {
  reactions: Reaction[];
  postId: string;
  flipStyle?: boolean;
  toggleReaction: ToggleReaction;
}
