# BetterMode Clone Web Application

This is a **BetterMode Clone** web application built to showcase front-end engineering skills. The application displays a gallery of posts, allows users to view post details, like posts, and interact with posts using a modern tech stack. It integrates **GraphQL** for data fetching and mutation handling and supports session-based authentication.

## Features

- **Post Gallery**: Paginated list of posts with a “Show More” button to load additional posts using the BetterMode API.
- **Post Details**: View post details by clicking on a post, with routing handled by React Router.
- **Like Feature**: Like a post from the gallery or detail view, updating the like count via GraphQL mutations.
- **GraphQL Integration**: All data fetching and mutations are handled via GraphQL using Apollo Client.
- **Session-Based Authentication**: The app uses `sessionStorage` for managing access tokens.
- **Responsive Design**: Built using Tailwind CSS, the UI is clean and responsive.

## Tech Stack

- **Framework**: Vite, React (with Hooks), TypeScript
- **CSS Framework**: Tailwind CSS
- **Routing**: React Router
- **GraphQL Client**: Apollo Client
- **Authentication**: sessionStorage for token management
- **Testing**: Jest and React Testing Library for unit and integration testing

---

## Pre-requisites

Before you start working on this project, ensure that you have completed the following steps:

### 1. **Create a Site**

Start by creating a site on [app.bettermode.com](https://app.bettermode.com). Familiarize yourself with the basic setup and functionality of the platform.

### 2. **Explore the Product**

Engage with the platform by creating posts and customizing blocks to display a post list. This hands-on experience will help you understand the core functionality of the platform and how the post list is displayed and interacted with.

### 3. **Investigate Using Dev Tools**

Use developer tools in your browser (such as Chrome DevTools) to dive deeper into the post list functionality:

- Identify the **GraphQL (GQL) API endpoint** being used to fetch posts.
- Examine the **GraphQL payload structure** to understand the data being sent and received.
- Pay close attention to how **security headers** are configured in requests and responses.
- Investigate how **session management** is handled within the app, particularly how authentication tokens are passed and stored.

These steps will give you a solid understanding of how BetterMode's API and session management work, which will be essential when building this clone application.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Setup](#setup)
- [Usage](#usage)
- [Testing](#testing)
- [File Structure](#file-structure)
- [Authentication](#authentication)
- [Mutations] (#Mutation)
- [Resources] (#Resources)
- [Contributing](#contributing)
- [License](#license)

---

## Installation

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v14+)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Steps

1. **Clone the repository:**

   ```bash
   git clone https://github.com/bprvuyyuru/BettermodeClone.git
   cd bettermode-clone
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Run the development server:**

   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173/`.

---

## Setup

### Frontend Setup

The frontend setup is handled via Vite, and most configurations are present in `vite.config.ts`. Apollo Client is set up in `ApolloClient.tsx` for making GraphQL requests.

---

## Usage

### Authentication Flow

- On the **login page**, the user enters their networkDomian like(basic######.bettermode.io) to get **comunity access token** first after that credentials (username or email and password).
- Upon successful login, an **access token** is returned from the server and stored in **`sessionStorage`**.
- All subsequent requests include the token from **`sessionStorage`** to authenticate the user.

### Posts

- The main page displays a **gallery of posts** fetched via a GraphQL query. Posts are paginated, and users can load more posts by clicking the **“Show More”** button.
- **Post details** are displayed when the user clicks on a post, allowing users to interact with and view additional information.

### Reactions (Likes)

- Users can click on the **like** button to add or remove likes from posts both in the gallery and the detailed post view.
- Reactions are handled using **GraphQL mutations**, which update the server in real time.

---

## Testing

This project includes **unit and integration tests** using **Jest** and **React Testing Library**.

### Running Tests

To run the test suite, use the following command:

```bash
npm run test
```

### Test Setup

Test files are located in the `__tests__` folder under `src`. Each key component and feature has its own test file.

Example:

```bash
src
└── __tests__
    ├── Card.test.tsx       # Test file for the Card component
    ├── Reactions.test.tsx   # Test file for the Reactions component
    └── Login.test.tsx       # Test file for the Login component
```

---

## File Structure

Here’s a breakdown of the project structure:

```
.
├── src
└── index.html              # Main entry HTML file
    ├── __tests__          # Tests files (e.g., Posts.test.tsx, Reactions.test.tsx)
│   │   └── Posts.test.tsx
│   ├── assets              # Static assets (e.g., images, icons)
│   │   └── bm-logo.png
│   ├── components          # Reusable React components
│   │   ├── Card.tsx
│   │   ├── Layout.tsx
│   │   ├── Navbar.tsx
│   │   ├── PostsGrid.tsx
│   │   ├── Reactions.tsx
│   │   └── Spinner.tsx
│   ├── graphql             # Apollo Client queries and mutations
│   │   ├── mutations.ts
│   │   └── queries.ts
│   ├── hooks               # Custom React hooks
│   │   └── useReactions.ts
│   ├── pages               # Page components (Login, Posts, PostDetail)
│   │   ├── Login.tsx
│   │   ├── Posts.tsx
│   │   └── PostDetail.tsx
│   ├── routes              # App routing components
│   │   ├── AppRoutes.tsx
│   │   └── PrivateRoute.tsx
│   ├── types               # TypeScript types and interfaces
│   │   └── index.ts
│   └── App.tsx             # Main application component
│   └── main.tsx            # Entry point for the React app
├── __tests__               # Test folder for unit/integration tests
│   ├── Card.test.tsx
│   ├── Reactions.test.tsx
│   └── Login.test.tsx
├── jest.config.cjs         # Jest configuration for testing
├── tsconfig.jest.json
├── tsconfig.json           # TypeScript configuration
├── package.json            # Dependencies and scripts
└── README.md               # Project README
```

---

## Authentication

### Token Management Using `sessionStorage`

- After a successful login, the access token is stored in `sessionStorage` for secure access.
- Subsequent requests use the token from `sessionStorage` to authenticate the user.

#### Example (`Login.tsx`):

```tsx
// Apollo lazy query for fetching community token
const [getCommunityToken, { loading: tokenLoading }] = useLazyQuery(
  GET_COMMUNITY_TOKEN,
  {
    onCompleted: (data) => {
      setAccessToken(data.tokens.accessToken);
      sessionStorage.setItem("communityToken", data.tokens.accessToken);
      setError("");
    },
    onError: (_err) => {
      setError(
        "Failed to get the community access token. Please check the URL."
      );
    },
  }
);

// Apollo mutation hook for login
const [login, { loading }] = useMutation(LOGIN_MUTATION, {
  onCompleted: (data) => {
    sessionStorage.setItem("accessToken", data.loginNetwork.accessToken);
    // Redirect to the home page after successful login
    navigate("/posts");
  },
  onError: (_err) => {
    setError("Login failed. Please check your credentials.");
  },
});

const handleDomainSubmit = () => {
  if (networkDomain) {
    getCommunityToken({ variables: { networkDomain } });
  } else {
    setError("Please enter a valid community URL.");
  }
};
```

---

## Mutations

GraphQL mutations are used in this application to handle the like and unlike functionality, allowing users to interact with posts. Below are some examples of the mutations used in the app:

#### Example (`Mutations.ts`):

mutation AddReaction($reaction: String!, $postId: ID!) {
addReaction(input: { reaction: $reaction }, postId: $postId) {
status
}
}

## You can see all the queries and mutations related to this App in /graphql folder

---

## Resources

The following resources help you when you get stuck with Bettermode retrieving graphql

-[Bettermode Docs](https://developers.bettermode.com/docs/guide/graphql/authentication/member/): For Authentication with Bettermode -[Bettermode Queries/mutations Docs](https://developers.bettermode.com/docs/graphql/queries/post/) -[Bettermode Playground graphql](https://api.bettermode.com/)

---

## Contributing

We welcome contributions to this project. To contribute:

1. Fork the repository.
2. Create your feature branch (`git checkout -b feature/new-feature`).
3. Commit your changes (`git commit -m 'Add new feature'`).
4. Push to the branch (`git push origin feature/new-feature`).
5. Open a pull request.

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
