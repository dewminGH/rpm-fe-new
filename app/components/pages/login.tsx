import clsx from "clsx";
import { Button } from "~/components";

const Login = () => {
  return (
    <div className="min-h-[calc(100svh_-_104px)] bg-gray-900 flex items-center justify-center px-4 flex-col">
      <img src="/bg.png" className="w-[300px] h-fit" />
      <div className="bg-gray-800 rounded-xl shadow-lg p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-gray-200 mb-6 text-center">
          Device Login
        </h2>
        <form className="space-y-6">
          {/* Device Secret */}
          <div>
            <label
              htmlFor="deviceSecret"
              className="block text-gray-400 text-sm font-medium mb-1"
            >
              Device Secret
            </label>
            <input
              type="password"
              id="deviceSecret"
              placeholder="Enter Device Secret"
              className={clsx(
                "w-full px-4 py-2 rounded-lg bg-gray-700 text-gray-100 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-400"
              )}
            />
          </div>
          {/* Username */}
          <div>
            <label
              htmlFor="username"
              className="block text-gray-400 text-sm font-medium mb-1"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              placeholder="Enter Username"
              className={clsx(
                "w-full px-4 py-2 rounded-lg bg-gray-700 text-gray-100 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-400"
              )}
            />
          </div>
          {/* Login Button */}
          <Button variant="primary" className="w-full py-2.5">
            Login
          </Button>
        </form>
        <p className="text-gray-500 text-sm mt-6 text-center">
          Make sure your device is powered on before login.
        </p>
      </div>
    </div>
  );
};

export default Login;
