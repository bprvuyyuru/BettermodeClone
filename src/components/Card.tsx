import { useState } from "react";
import { CardProps } from "../types";
import Reactions from "./Reactions";

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
  const [showMore, setShowMore] = useState(false);
  const formattedContent = textContent?.replace(/\n/g, "<br/>");
  const charLimit = 1000;
  const isLongText = textContent.length > charLimit;

  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

  return (
    <div className="bg-white shadow-md rounded-3xl p-8 sm:p-10 w-[90vw] sm:w-[80vw] md:w-[60vw] lg:w-[65vw] mx-auto">
      <div className="flex justify-between">
        <div className="flex items-start">
          <div className="bg-[#65C61A] rounded-full h-12 w-12 sm:h-16 sm:w-16 flex items-center justify-center">
            <span className="text-3xl sm:text-4xl text-white font-bold pb-1 sm:pb-2">
              {owner[0]}
            </span>
          </div>
          <div className="ml-4 sm:ml-6">
            <p className="text-[#36454F] text-lg sm:text-xl font-semibold">
              {owner}
            </p>
            <p className="text-[#36454F] text-xs sm:text-sm">{publishedAt}</p>
            <p className="text-gray-500 text-xs sm:text-sm">
              Posted in {space}
            </p>
          </div>
        </div>
        <div className="flex gap-4">
          <div className="flex items-center justify-center h-10 w-10 sm:h-12 sm:w-12 bg-gray-200 hover:bg-gray-300 rounded-full cursor-pointer">
            <i className="fas fa-solid fa-bell text-[#36454F]"></i>
          </div>
          <div className="flex items-center justify-center h-10 w-10 sm:h-12 sm:w-12 bg-gray-200 hover:bg-gray-300 rounded-full cursor-pointer">
            <i className="fas fa-solid fa-share text-[#36454F]"></i>
          </div>
        </div>
      </div>

      <div className="mt-2 p-3 sm:p-5">
        <h2 className="text-lg sm:text-xl font-semibold">{title}</h2>
        <article
          className={`text-[#36454F] mt-2 text-sm sm:text-md leading-relaxed ${
            showMore ? "" : "line-clamp-6"
          }`}
          dangerouslySetInnerHTML={{
            __html: formattedContent || "nothing to show",
          }}
        ></article>
        {isLongText && (
          <button
            onClick={toggleShowMore}
            className="mt-2 text-blue-400 hover:underline text-xs sm:text-sm"
          >
            {showMore ? "See Less" : "See More"}
          </button>
        )}
      </div>
      <Reactions
        reactions={reactions}
        postId={postId}
        toggleReaction={toggleReaction}
      />
    </div>
  );
};

export default Card;
