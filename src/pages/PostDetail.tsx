import { useMutation, useQuery } from "@apollo/client";
import { useNavigate, useParams } from "react-router-dom";
import { PostDetailData, PostDetailVars } from "../types";
import {
  ADD_REACTION_MUTATION,
  GET_POST_DETAILS,
  REMOVE_REACTION_MUTATION,
} from "../graphql/mutations";
import Card from "../components/Card";
import { formatDistanceToNow } from "date-fns";
import Spinner from "../components/Spinner";

const PostDetail = () => {
  const { id } = useParams<{ id: any }>();
  const navigate = useNavigate();
  const [addReaction] = useMutation(ADD_REACTION_MUTATION);
  const [removeReaction] = useMutation(REMOVE_REACTION_MUTATION);

  // Fetch post details using the ID
  const { loading, error, data } = useQuery<PostDetailData, PostDetailVars>(
    GET_POST_DETAILS,
    {
      variables: { id },
    }
  );

  if (loading) return <Spinner />;
  if (error) return <p>Error: {error.message}</p>;

  const post = data?.post;
  const reactions = post?.reactions || [];

  /// Handle adding or removing reactions
  const toggleReaction = async (reactionName: string, postId: string) => {
    const existingReaction = reactions.find((r) => r.reaction === reactionName);

    if (existingReaction) {
      // Remove reaction if it exists
      await removeReaction({
        variables: {
          reaction: reactionName,
          postId,
        },
        refetchQueries: [
          {
            query: GET_POST_DETAILS,
            variables: { id: postId },
          },
        ],
      });
    } else {
      // Add reaction if it doesn't exist
      await addReaction({
        variables: {
          reaction: reactionName,
          postId,
        },
        refetchQueries: [
          {
            query: GET_POST_DETAILS,
            variables: { id: postId },
          },
        ],
      });
    }
  };

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
          toggleReaction={toggleReaction}
        />
      )}
    </div>
  );
};

export default PostDetail;
