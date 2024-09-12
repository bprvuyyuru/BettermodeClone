import { useNavigate } from "react-router-dom";
import logo from "../assets/bm-logo.png";

const Navbar = () => {
  const navigate = useNavigate();
  const token = sessionStorage.getItem("accessToken");

  const handleLogout = () => {
    sessionStorage.removeItem("accessToken");
    navigate("/login");
  };

  return (
    <nav className="p-[4vw] sm:p-[3vw] md:p-[2vw] lg:p-[1vw] flex justify-between items-center w-screen">
      <div className="flex justify-between gap-4 items-center">
        <img src={logo} alt="Website Logo" className="h-6"></img>
        <span className="text-[#36454F] text-md sm:text-lg md:text-xl lg:text-2xl font-semibold">
          BetterMode
        </span>
      </div>
      {token && (
        <button
          onClick={handleLogout}
          className="bg-[#36454F] text-white font-semibold py-2 px-4 sm:px-6 rounded-3xl hover:bg-[#36454F]-100 cursor-pointer text-sm sm:text-md lg:text-lg"
        >
          Log out
        </button>
      )}
    </nav>
  );
};

export default Navbar;
