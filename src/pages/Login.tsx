import { useMutation } from "@apollo/client";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LOGIN_MUTATION } from "../graphql/mutations";

const Login = () => {
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

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

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    login({ variables: { usernameOrEmail, password } });
  };

  return (
    <div className="flex justify-center items-center p-[8vw]">
      <form
        className="bg-white shadow-md rounded-3xl w-[25vw] h-[61vh] p-[2vw] flex flex-col justify-center items-center gap-[7vh]"
        onSubmit={handleSubmit}
      >
        <div>
          <h1 className="text-3xl font-bold text-center">Hello !</h1>
          <h2 className="text-sm m-2 text-center">Sign into your Account</h2>
          {error && <p className="text-red-500">{error}</p>}
        </div>

        <div className="flex flex-col gap-4 items-center justify-between">
          <div className="flex items-center border rounded-3xl bg-[#36454F]">
            <i className="fas fa-solid fa-envelope text-[#D3D3D3] pl-6"></i>
            <input
              id="usernameOrEmail"
              type="text"
              placeholder="Username or E-Mail"
              value={usernameOrEmail}
              onChange={(e) => setUsernameOrEmail(e.target.value)}
              className="shadow text-sm w-[16vw] py-3 px-6 text-white rounded-3xl leading-relaxed bg-transparent focus:outline-none"
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
              className="shadow text-sm w-[16vw] py-3 px-6 text-white rounded-3xl leading-relaxed bg-transparent focus:outline-none"
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
      </form>
    </div>
  );
};

export default Login;
