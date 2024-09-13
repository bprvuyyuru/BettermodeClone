import { useLazyQuery, useMutation } from "@apollo/client";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LOGIN_MUTATION } from "../graphql/mutations";
import { GET_COMMUNITY_TOKEN } from "../graphql/queries";

const Login = () => {
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [networkDomain, setNetworkDomain] = useState("");
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

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

  const handleLoginSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    login({ variables: { usernameOrEmail, password } });
  };

  return (
    <div className="flex flex-col gap-2 justify-center items-center p-[5vw] sm:p-[3vw] md:p-[2vw] lg:p-[2vw]">
      <div className="bg-white shadow-md rounded-3xl w-[80vw] sm:w-[60vw] md:w-[40vw] lg:w-[30vw] p-[4vw] sm:p-[3vw] md:p-[2vw] lg:p-[1.5vw]">
        <h1 className="text-4xl font-bold text-center">Hello !</h1>
        <h2 className="text-sm m-2 text-center">Sign into your Account</h2>
      </div>
      {!accessToken ? (
        <div className="bg-white shadow-md rounded-3xl w-[80vw] sm:w-[60vw] md:w-[40vw] lg:w-[30vw] p-[4vw] sm:p-[3vw] md:p-[2vw] lg:p-[1.5vw] flex flex-col gap-4 items-center justify-between">
          <h1 className="text-2xl text-center">
            Enter Community Network Domain
          </h1>
          <div className="flex flex-col mt-6 gap-6 items-center">
            <div className="flex items-center border rounded-3xl bg-[#36454F]">
              <i className="fas fa-solid fa-link text-[#D3D3D3] pl-6"></i>
              <input
                id="CommunityURL"
                type="text"
                placeholder="Community URL"
                value={networkDomain}
                onChange={(e) => setNetworkDomain(e.target.value)}
                className="text-sm w-[50vw] sm:w-[40vw] md:w-[18vw] py-3 px-6 text-white leading-relaxed bg-transparent rounded-br-3xl rounded-tr-3xl focus:outline-none"
                required
              />
            </div>
            <button
              onClick={handleDomainSubmit}
              className="bg-[#65C61A] hover:text-[#36454F] cursor-pointer text-white w-[30vw] sm:w-[20vw] md:w-[8vw] font-bold py-3 px-4 rounded-3xl"
              disabled={tokenLoading}
            >
              {tokenLoading ? "Fetching..." : "Go"}
            </button>
          </div>
          {error && <p className="text-red-500">{error}</p>}
        </div>
      ) : (
        <div>
          <form
            className="bg-white shadow-md rounded-3xl w-[80vw] sm:w-[60vw] md:w-[40vw] lg:w-[30vw] py-[4vw] sm:py-[3vw] md:py-[2vw] flex flex-col justify-center items-center gap-[7vh]"
            onSubmit={handleLoginSubmit}
          >
            <div className="flex flex-col gap-4 items-center justify-between">
              <div className="flex items-center border rounded-3xl bg-[#36454F]">
                <i className="fas fa-solid fa-envelope text-[#D3D3D3] pl-6"></i>
                <input
                  id="usernameOrEmail"
                  type="text"
                  placeholder="Username or E-Mail"
                  value={usernameOrEmail}
                  onChange={(e) => setUsernameOrEmail(e.target.value)}
                  className="shadow text-sm w-[50vw] sm:w-[40vw] md:w-[18vw] py-3 px-6 text-white leading-relaxed bg-transparent rounded-br-3xl rounded-tr-3xl focus:outline-none"
                  required
                />
              </div>
              <div className="flex items-center border rounded-3xl bg-[#36454F]">
                <i className="fas fa-solid fa-lock text-[#D3D3D3] pl-6"></i>
                <input
                  id="password"
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="shadow text-sm w-[50vw] sm:w-[40vw] md:w-[18vw] py-3 px-6 text-white leading-relaxed bg-transparent rounded-br-3xl rounded-tr-3xl focus:outline-none"
                  required
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="bg-[#65C61A] hover:text-[#36454F] cursor-pointer text-white font-bold py-3 px-8 rounded-3xl"
                disabled={loading}
              >
                {loading ? "Logging in..." : "Log in"}
              </button>
            </div>
            {error && <p className="text-red-500">{error}</p>}
          </form>
        </div>
      )}
    </div>
  );
};

export default Login;
