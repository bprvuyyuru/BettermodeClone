import { useQuery } from "@apollo/client";
import { PostsData, PostsVars } from "../types";
import { GET_POSTS } from "../graphql/queries";
import Spinner from "../components/Spinner";
import useReactions from "../hooks/useReactions";
import { useLocation, useNavigate } from "react-router-dom";
import PostsGrid from "../components/PostsGrid";
import { useEffect } from "react";

const Posts = () => {
  let limit = 6; // Number of posts per page
  const navigate = useNavigate();
  const location = useLocation();

  // Fetch posts with pagination
  const { loading, error, data, fetchMore, refetch } = useQuery<
    PostsData,
    PostsVars
  >(GET_POSTS, {
    variables: { limit, offset: 0 },
  });

  const { toggleReaction } = useReactions(
    fetchMore,
    null,
    false,
    data?.posts.nodes.length
  );

  useEffect(() => {
    if (location.state?.refetch) {
      refetch();
    }
  }, [location.state, refetch]);

  const handleLoadMore = () => {
    fetchMore({
      variables: {
        offset: data?.posts.nodes.length,
      },
      updateQuery: (prevResult, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prevResult;

        // Merge the new posts with the existing ones
        return {
          ...prevResult,
          posts: {
            ...prevResult.posts,
            nodes: [...prevResult.posts.nodes, ...fetchMoreResult.posts.nodes],
            totalCount: fetchMoreResult.posts.totalCount,
          },
        };
      },
    });
  };

  if (loading) return <Spinner />;
  if (error) return <p>Error: {error.message}</p>;

  const handlePostClick = (postId: string) => {
    navigate(`/posts/${postId}`);
  };
  const allPostsLoaded = data!.posts.nodes.length >= data!.posts.totalCount;

  return (
    <div className="flex flex-col justify-center px-[3rem]">
      <div className="flex p-3 items-center gap-8">
        <h1 className="text-2xl font-bold">Posts</h1>
        <p className="text-sm">
          {data!.posts.nodes.length} / {data?.posts.totalCount} posts
        </p>
      </div>

      <PostsGrid
        posts={data!.posts.nodes}
        onLoadMore={handleLoadMore}
        allPostsLoaded={allPostsLoaded}
        onPostClick={handlePostClick}
        toggleReaction={toggleReaction}
      />
    </div>
  );
};

export default Posts;
