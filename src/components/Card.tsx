import { useState } from "react";
import { CardProps } from "../types";

const Card = ({
  title,
  textContent,
  owner,
  space,
  publishedAt,
  reactions,
  postId,
  toggleReaction,
}: CardProps) => {
  const [showAllReactions, setShowAllReactions] = useState(false);
  const allReactions = ["+1", "tada", "heart", "open_mouth"];
  const [showMore, setShowMore] = useState(false);
  const formattedContent = textContent?.replace(/\n/g, "<br/>");
  const charLimit = 1000;
  const isLongText = textContent.length > charLimit;

  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

  const handleToggleReaction = (reaction: string, postId: string) => {
    toggleReaction(reaction, postId);
    setShowAllReactions(!showAllReactions);
  };

  return (
    <div className="bg-white shadow-md rounded-3xl p-10 w-[80vw] mx-auto">
      <div className="flex justify-between">
        <div className="flex items-start">
          <div className="bg-[#65C61A]  rounded-full h-16 w-16 flex items-center justify-center">
            <span className="text-4xl text-white font-bold pb-2">
              {owner[0]}
            </span>
          </div>
          <div className="ml-6">
            <p className="text-[#36454F] text-xl font-semibold">{owner}</p>
            <p className="text-[#36454F] text-sm">{publishedAt}</p>
            <p className="text-gray-500 text-sm">Posted in {space}</p>
          </div>
        </div>
        <div className="flex gap-4">
          <div className="flex items-center justify-center h-12 w-12 bg-gray-200 hover:bg-gray-300 rounded-full cursor-pointer">
            <i className="fas fa-solid fa-bell text-[#36454F]"></i>
          </div>
          <div className="flex items-center justify-center h-12 w-12 bg-gray-200 hover:bg-gray-300 rounded-full cursor-pointer">
            <i className="fas fa-solid fa-share text-[#36454F]"></i>
          </div>
        </div>
      </div>

      <div className="mt-2 p-5">
        <h2 className="text-xl font-semibold">{title}</h2>
        <article
          className={`text-[#36454F] mt-2 text-md leading-relaxed ${
            showMore ? "" : "line-clamp-6"
          }`}
          dangerouslySetInnerHTML={{
            __html: formattedContent || "nothing to show",
          }}
        ></article>
        {isLongText && (
          <button
            onClick={toggleShowMore}
            className="mt-2 text-blue-400 hover:underline text-sm"
          >
            {showMore ? "See Less" : "See More"}
          </button>
        )}
      </div>

      <div className="flex items-center mt-4 space-x-2">
        {reactions.map((reaction, index) => (
          <div
            key={index}
            className="flex items-center justify-center h-12 w-12 bg-gray-200 rounded-full"
          >
            <span className="text-2xl">
              {getReactionIcon(reaction.reaction)}
            </span>
          </div>
        ))}
        <div
          className="flex items-center justify-center h-12 w-12 bg-gray-200 hover:bg-gray-300 rounded-full cursor-pointer"
          onClick={() => setShowAllReactions(!showAllReactions)} // Toggle reaction list visibility
        >
          <i className="fas fa-solid fa-plus text-[#36454F]"></i>
        </div>

        {showAllReactions && (
          <div className="flex space-x-1 p-1 border border-gray-200 rounded-full">
            {allReactions.map((reaction) => (
              <div
                key={reaction}
                className="flex items-center justify-center h-12 w-12 bg-gray-100 hover:bg-gray-300 rounded-full cursor-pointer"
                onClick={() => handleToggleReaction(reaction, postId)} // Add or remove reaction
              >
                <span className="text-2xl">{getReactionIcon(reaction)}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const getReactionIcon = (reaction: string): string => {
  switch (reaction) {
    case "+1":
      return "👍";
    case "tada":
      return "🎉";
    case "heart":
      return "❤️";
    case "open_mouth":
      return "😮";
    default:
      return "❓";
  }
};

export default Card;
