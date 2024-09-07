import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const token = sessionStorage.getItem("accessToken");

  const handleLogout = () => {
    sessionStorage.removeItem("accessToken");
    navigate("/login");
  };

  return (
    <nav className="bg-blue-500 p-4 flex justify-between items-center">
      <div className="text-white text-lg font-semibold">BetterMode</div>

      {token && (
        <button
          onClick={handleLogout}
          className="bg-white text-blue-500 font-semibold py-2 px-4 rounded hover:bg-blue-100"
        >
          Logout
        </button>
      )}
    </nav>
  );
};

export default Navbar;
