import { useQuery } from "@apollo/client";
import { useNavigate, useParams } from "react-router-dom";
import { PostDetailData, PostDetailVars } from "../types";
import { GET_POST_DETAILS } from "../graphql/queries";
import Card from "../components/Card";
import { formatDistanceToNow } from "date-fns";
import Spinner from "../components/Spinner";
import useReactions from "../hooks/useReactions";

const PostDetail = () => {
  const { id } = useParams<{ id: any }>();
  const navigate = useNavigate();

  // Fetch post details using the ID
  const { loading, error, data, refetch } = useQuery<
    PostDetailData,
    PostDetailVars
  >(GET_POST_DETAILS, {
    variables: { id },
  });

  const { toggleReaction } = useReactions(null, refetch, true);

  if (loading) return <Spinner />;
  if (error) return <p>Error: {error.message}</p>;

  const post = data?.post;
  const reactions = post?.reactions || [];

  const timeAgo = post?.publishedAt
    ? formatDistanceToNow(new Date(post.publishedAt), { addSuffix: true })
    : "Unknown date";

  return (
    <div className="container mx-auto h-auto">
      <div
        className="flex items-center justify-center h-12 w-12 bg-gray-100 hover:bg-gray-600 rounded-full cursor-pointer"
        onClick={() => navigate(-1)}
      >
        <i className="fas fa-solid fa-arrow-left"></i>
      </div>
      {post && (
        <Card
          title={post?.title || "Untitled"}
          textContent={post?.textContent || "No content available"}
          owner={post?.owner?.member?.name || "Anonymous"}
          space={post?.space?.name || "Unknown"}
          publishedAt={timeAgo}
          reactions={reactions}
          postId={id}
          toggleReaction={(reactionName) =>
            toggleReaction(reactionName, id, reactions)
          }
        />
      )}
    </div>
  );
};

export default PostDetail;
