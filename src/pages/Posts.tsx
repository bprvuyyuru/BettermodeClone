import { useState } from "react";
import Tablebox from "../components/Tablebox";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { PostsData, PostsVars } from "../types";
import { GET_POSTS } from "../graphql/queries";
import Spinner from "../components/Spinner";

const Posts = () => {
  const limit = 6; // Number of posts per page
  const [offset, setOffset] = useState(0);
  const navigate = useNavigate();

  // Fetch posts with pagination
  const { loading, error, data } = useQuery<PostsData, PostsVars>(GET_POSTS, {
    variables: { limit, offset },
  });

  if (loading) return <Spinner />;
  if (error) return <p>Error: {error.message}</p>;

  const totalPages = Math.ceil(data!.posts.totalCount / limit);
  const currentPage = offset / limit + 1;

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setOffset(offset + limit);
    }
  };

  const handlePrevPage = () => {
    if (offset > 0) {
      setOffset(offset - limit);
    }
  };

  const handleRowClick = (postId: string) => {
    navigate(`/posts/${postId}`);
  };

  return (
    <div className="flex flex-col justify-center px-[3rem]">
      <div className="flex p-3 items-center gap-8">
        <h1 className="text-2xl font-bold">Posts</h1>
        <p className="text-sm">{data?.posts.totalCount} posts</p>
      </div>

      <Tablebox
        posts={data!.posts.nodes}
        currentPage={currentPage}
        totalPages={totalPages}
        onNextPage={handleNextPage}
        onPrevPage={handlePrevPage}
        onRowClick={handleRowClick}
      />
    </div>
  );
};

export default Posts;
