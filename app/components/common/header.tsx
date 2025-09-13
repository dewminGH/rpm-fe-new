import { useLocation, useNavigate } from "react-router";

const Header = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  if (!pathname.includes("/dashboard")) {
    return null;
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    navigate("/");
  };

  return (
    <header className="bg-gray-800 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Left side: Title */}
        <h1 className="text-2xl font-bold text-teal-400">Dashboard</h1>

        {/* Right side */}
        <div className="flex items-center space-x-10">
          {/* User info */}
          <div className="flex items-center space-x-3">
            <span className="text-gray-300">
              {localStorage.getItem("username")?.toLocaleLowerCase()}
            </span>
            <div className="w-10 h-10 rounded-full bg-teal-500 flex items-center justify-center">
              <span className="font-bold text-gray-900">
                {localStorage
                  .getItem("username")
                  ?.toLocaleLowerCase()
                  .charAt(0)}
              </span>
            </div>
          </div>

          {/* Logout button */}
          <button
            onClick={handleLogout}
            className="bg-red-900 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium shadow-md transition-colors cursor-pointer"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
