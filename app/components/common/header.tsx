const Header = () => {
  return (
    <>
      <header className="bg-gray-800 p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center p-4">
          <h1 className="text-2xl font-bold text-teal-400">Dashboard</h1>
          <div className="flex items-center space-x-4">
            <span className="text-gray-300">Admin</span>
            <div className="w-10 h-10 rounded-full bg-teal-500 flex items-center justify-center">
              <span className="font-bold">A</span>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
