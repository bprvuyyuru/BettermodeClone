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
  reactions: {
    count: number;
    reaction: string;
  }[];
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
  reactions: {
    count: number;
    reaction: string;
  }[];
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
  reactions: { count: number; reaction: string }[];
  postId: string;
  toggleReaction: (reactionName: string, postId: string) => void;
}

export interface TableboxProps {
  posts: Array<{
    id: string;
    title: string;
    owner: { member: { name: string } };
    space: { name: string };
    publishedAt: string;
    reactions: Array<{ reaction: string; count: number }>;
  }>;
  currentPage: number;
  totalPages: number;
  onNextPage: () => void;
  onPrevPage: () => void;
  onRowClick: (postId: string) => void;
}
