import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import Reactions from "../components/Reactions";
import { Reaction } from "../types";

// Mock props for the Reactions component
const mockReactions: Reaction[] = [
  { reaction: "+1", count: 1 },
  { reaction: "heart", count: 1 },
];

const mockToggleReaction = jest.fn();

const setup = () => {
  render(
    <Reactions
      reactions={mockReactions}
      postId="1"
      toggleReaction={mockToggleReaction}
    />
  );
};

describe("Reactions component", () => {
  it("renders reactions with their counts", () => {
    setup();

    // Check if reactions are displayed with the correct count
    expect(screen.getByText("👍")).toBeInTheDocument();
    expect(screen.getByText("❤️")).toBeInTheDocument();
  });

  it("shows additional reactions when the add button is clicked", () => {
    setup();

    // Click the "add reaction" button (now properly labeled with role="button")
    const addButton = screen.getByRole("button");
    fireEvent.click(addButton);

    // Check if additional reactions are displayed
    expect(screen.getByText("🎉")).toBeInTheDocument(); // "tada"
    expect(screen.getByText("😮")).toBeInTheDocument(); // "open_mouth"
  });

  it("calls toggleReaction when a reaction is clicked", () => {
    setup();

    // Click the "+1" reaction button
    const reactionButton = screen.getByText("👍");
    fireEvent.click(reactionButton);
  });

  it("closes the dropdown when clicking outside", () => {
    setup();

    // Click the "add reaction" button
    const addButton = screen.getByRole("button");
    fireEvent.click(addButton);

    // Check if additional reactions are displayed
    expect(screen.getByText("🎉")).toBeInTheDocument();

    // Click outside the dropdown (simulate clicking outside)
    fireEvent.mouseDown(document);

    // Check that additional reactions are hidden
    expect(screen.queryByText("🎉")).not.toBeInTheDocument();
  });
});
