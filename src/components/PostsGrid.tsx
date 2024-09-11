import { TableboxProps } from "../types";
import Reactions from "./Reactions";

const PostsGrid = ({
  posts,
  onLoadMore,
  allPostsLoaded,
  onPostClick,
  toggleReaction,
}: TableboxProps) => {
  return (
    <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {posts.map((post) => (
        <div
          key={post.id}
          className="bg-white rounded-lg shadow-md p-[1.5rem] flex flex-col gap-3 justify-between cursor-pointer"
        >
          <div
            className="flex flex-col gap-3"
            onClick={() => onPostClick(post.id)}
          >
            <h2 className="text-xl font-semibold text-[#36454F] line-clamp-1">
              {post.title}
            </h2>
            <div className="flex gap-2 py-1">
              <div className="border border-[#36454F] rounded-3xl px-2 flex items-center justify-center gap-1">
                <div className="bg-[#65C61A] rounded-full h-5 w-5 flex items-center justify-center">
                  <span className="text-xs text-white font-normal pb-1">
                    {post.owner.member.name[0]}
                  </span>
                </div>
                {post.owner.member.name}
              </div>
              <p className="text-sm text-gray-700 border border-[#36454F] rounded-3xl p-2">
                {post.space.name}
              </p>
            </div>
            <p className="text-sm text-gray-700 px-2">
              <span className="text-xs text-gray-500">Published At:</span>{" "}
              {new Date(post.publishedAt).toLocaleDateString()}
            </p>
          </div>

          <div className="mt-4">
            <Reactions
              reactions={post.reactions}
              postId={post.id}
              toggleReaction={(reactionName) =>
                toggleReaction(reactionName, post.id, post.reactions)
              }
            />
          </div>
        </div>
      ))}

      {/* Show More Button */}
      {!allPostsLoaded && (
        <div className="flex justify-center items-center mt-4">
          <button
            className="bg-[#65C61A] text-white py-2 px-4 rounded-lg hover:text-[#36454F]"
            onClick={onLoadMore}
          >
            Show More
          </button>
        </div>
      )}
    </div>
  );
};

export default PostsGrid;
