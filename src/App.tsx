import "./App.css";
import client from "./graphql/ApolloClient";
import { ApolloProvider } from "@apollo/client";
import { BrowserRouter } from "react-router-dom";
import Layout from "./components/Layout";
import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Layout>
          <AppRoutes />
        </Layout>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
