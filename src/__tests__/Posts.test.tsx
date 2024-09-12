import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import { MemoryRouter } from "react-router-dom";
import Posts from "../pages/Posts";
import { GET_POSTS } from "../graphql/queries";

const mocks = [
  {
    request: {
      query: GET_POSTS,
      variables: {
        limit: 6,
        offset: 0,
      },
    },
    result: {
      data: {
        posts: {
          nodes: [
            {
              id: "1",
              title: "Post 1",
              owner: { member: { name: "Owner 1" } },
              space: { name: "Space 1" },
              publishedAt: "2023-09-12",
              reactions: [],
            },
          ],
          totalCount: 1,
        },
      },
    },
  },
];

test("renders posts and loads data from GraphQL", async () => {
  render(
    <MemoryRouter>
      <MockedProvider mocks={mocks} addTypename={false}>
        <Posts />
      </MockedProvider>
    </MemoryRouter>
  );

  // Check if the spinner is in the document
  expect(screen.getByTestId("spinner")).toBeInTheDocument();

  // Wait for the spinner to disappear
  await waitFor(() =>
    expect(screen.queryByTestId("spinner")).not.toBeInTheDocument()
  );

  // Check that the post is rendered
  expect(screen.getByText("Post 1")).toBeInTheDocument();
  expect(screen.getByText("Owner 1")).toBeInTheDocument();
  expect(screen.getByText("Space 1")).toBeInTheDocument();
});
