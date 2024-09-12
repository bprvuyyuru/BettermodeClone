import { render, screen, fireEvent } from "@testing-library/react";
import Card from "../components/Card";
import "@testing-library/jest-dom";

const cardProps = {
  title: "Test Post",
  textContent: "This is a short text.",
  owner: "John Doe",
  space: "Test Space",
  publishedAt: "2023-09-12",
  reactions: [],
  postId: "1",
  toggleReaction: jest.fn(),
};

test("renders Card component with title, owner, and content", () => {
  render(<Card {...cardProps} />);

  // Check if title, owner, and space are rendered
  expect(screen.getByText("Test Post")).toBeInTheDocument();
  expect(screen.getByText("John Doe")).toBeInTheDocument();
  expect(screen.getByText("Posted in Test Space")).toBeInTheDocument();
});

test("shows See More button if text is long", () => {
  const longTextProps = {
    ...cardProps,
    textContent: "A".repeat(1100), // Long text content
  };
  render(<Card {...longTextProps} />);

  // Check that "See More" button is visible for long text
  expect(screen.getByText("See More")).toBeInTheDocument();

  // Click "See More" button and check if it changes to "See Less"
  fireEvent.click(screen.getByText("See More"));
  expect(screen.getByText("See Less")).toBeInTheDocument();
});
