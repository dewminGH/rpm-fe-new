import { useEffect, useState } from "react";
import clsx from "clsx";
import { Button } from "~/components";
import { useLogin } from "~/hooks";

const Login = () => {
  // Single state object
  const { login, loading, error } = useLogin();
  const [formData, setFormData] = useState({
    deviceSecret: "",
    username: "",
    password: "",
  });

  useEffect(() => {
    localStorage.clear();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login({
        device_sc: formData.deviceSecret,
        password: formData.password,
        user_name: formData.username,
      });
      // Navigate to dashboard or save user info
    } catch {
      console.error("Login failed");
    }
  };

  return (
    <div className="min-h-[calc(100svh)] bg-gray-900 flex items-center justify-center px-4 flex-col">
      <img src="/bg.png" className="w-[300px] h-fit" />
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 rounded-xl shadow-lg p-8 w-full max-w-md"
      >
        <h2 className="text-3xl font-bold text-gray-200 mb-6 text-center">
          Device Login
        </h2>
        <div className="space-y-6">
          {/* Device Secret */}
          <div>
            <label
              htmlFor="deviceSecret"
              className="block text-gray-400 text-sm font-medium mb-1"
            >
              Device Secret
            </label>
            <input
              type="text"
              id="deviceSecret"
              placeholder="Enter Device Secret"
              value={formData.deviceSecret}
              onChange={handleChange}
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
              value={formData.username}
              onChange={handleChange}
              className={clsx(
                "w-full px-4 py-2 rounded-lg bg-gray-700 text-gray-100 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-400"
              )}
            />
          </div>
          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-gray-400 text-sm font-medium mb-1"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter Password"
              value={formData.password}
              onChange={handleChange}
              className={clsx(
                "w-full px-4 py-2 rounded-lg bg-gray-700 text-gray-100 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-400"
              )}
            />
          </div>
          {/* Login Button */}
          <Button
            type="submit"
            variant="primary"
            className="w-full py-2.5"
            loading={loading}
          >
            Login
          </Button>
        </div>
        <p className="text-red-900 text-sm mt-6 text-center"> {error}</p>
        <p className="text-gray-500 text-sm mt-6 text-center">
          Make sure your device is powered on before login.
        </p>
      </form>
    </div>
  );
};

export default Login;

// /min-h-[calc(100svh_-_104px)]
