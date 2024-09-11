import { useMutation } from "@apollo/client";
import {
  ADD_REACTION_MUTATION,
  REMOVE_REACTION_MUTATION,
} from "../graphql/mutations";

const useReactions = (
  fetchMore: any,
  refetch: any,
  isDetailView: boolean,
  currentPostsLength?: number
) => {
  const [addReaction] = useMutation(ADD_REACTION_MUTATION);
  const [removeReaction] = useMutation(REMOVE_REACTION_MUTATION);

  // Define the function to toggle the reaction
  const toggleReaction = async (
    reactionName: string,
    postId: string,
    reactions: any[]
  ) => {
    const existingReaction = reactions.find((r) => r.reaction === reactionName);

    if (existingReaction) {
      // Remove reaction if it exists
      try {
        await removeReaction({
          variables: { reaction: reactionName, postId },
        });
      } catch (error) {
        console.error("Error removing reaction:", error);
      }
    } else {
      // Add reaction if it doesn't exist
      try {
        await addReaction({
          variables: { reaction: reactionName, postId },
        });
      } catch (error) {
        console.error("Error adding reaction:", error);
      }
    }

    // If it's the detail view, refetch only the single post
    if (isDetailView) {
      try {
        await refetch();
      } catch (error) {
        console.error("Error refetching post details:", error);
      }
    } else {
      // For the posts list view, fetch more to update the reactions
      try {
        await fetchMore({
          variables: { offset: 0, limit: currentPostsLength },
          updateQuery: (prevResult: any, { fetchMoreResult }: any) => {
            if (!fetchMoreResult) return prevResult;
            return {
              ...prevResult,
              posts: {
                ...prevResult.posts,
                nodes: fetchMoreResult.posts.nodes, // Update the posts list
                totalCount: fetchMoreResult.posts.totalCount,
              },
            };
          },
        });
      } catch (error) {
        console.error("Error fetching more posts:", error);
      }
    }
  };

  return { toggleReaction };
};

export default useReactions;
