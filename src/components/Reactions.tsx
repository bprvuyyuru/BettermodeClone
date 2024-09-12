import { useEffect, useRef, useState } from "react";
import { ReactionProps } from "../types";

const Reactions = ({ reactions, postId, toggleReaction }: ReactionProps) => {
  const allReactions = ["+1", "tada", "heart", "open_mouth"];
  const [showAllReactions, setShowAllReactions] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

  const handleClick = (reaction: string, postId: string) => {
    toggleReaction(reaction, postId, reactions);
    setShowAllReactions(!showAllReactions);
  };

  // Function to handle clicks outside the dropdown
  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node) &&
      buttonRef.current &&
      !buttonRef.current.contains(event.target as Node)
    ) {
      setShowAllReactions(false);
    }
  };

  // Add event listener on mount and remove it on unmount
  useEffect(() => {
    if (showAllReactions) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showAllReactions]);

  return (
    <div className="flex items-center gap-1">
      <div className="flex -space-x-3">
        {reactions.map((reaction, index) => (
          <div
            key={index}
            className="flex items-center justify-center h-10 w-10 bg-[#b3b3b3] odd:bg-gray-300 rounded-full"
          >
            <span className="text-xl">
              {getReactionIcon(reaction.reaction)}
            </span>
          </div>
        ))}
      </div>
      <div className="relative flex items-center gap-1">
        <div
          ref={buttonRef}
          role="button"
          className={`flex items-center justify-center h-10 w-10 ${
            showAllReactions ? "bg-gray-400" : "bg-gray-200"
          }  hover:bg-gray-400 rounded-full cursor-pointer`}
          onClick={() => {
            setShowAllReactions(!showAllReactions);
          }} // Toggle reaction list visibility
        >
          <i className="fas fa-solid fa-plus text-[#36454F]"></i>
        </div>
        {showAllReactions && (
          <div
            ref={dropdownRef}
            role="button"
            className="flex space-x-1 p-1 border border-gray-200 rounded-full absolute left-[3rem]"
          >
            {allReactions.map((reaction) => (
              <div
                key={reaction}
                role="button"
                className="flex items-center justify-center h-10 w-10 bg-gray-100 hover:bg-gray-300 rounded-full cursor-pointer"
                onClick={() => handleClick(reaction, postId)} // Add or remove reaction
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

export default Reactions;
