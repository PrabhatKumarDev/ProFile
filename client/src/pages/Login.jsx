import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Eye, EyeOff, Github, Loader2, ArrowLeft } from "lucide-react";
import axios from "axios";

const Login = () => {
  const [loginData, setLoginData] = useState({ email: "", password: "" }); 
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        loginData
      );
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className=" w-full min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-gray-200 dark:from-gray-900 dark:to-gray-800">
      <header className="w-full p-4 flex justify-between items-center">
        <a
          href="/"
          className="flex items-center gap-2 text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors"
        >
          <ArrowLeft size={18} />
          <span>Back to Home</span>
        </a>
        <button className="text-sm px-3 py-1 rounded-md border dark:border-gray-600">
          Toggle Theme
        </button>
      </header>

      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-white dark:bg-gray-900 border dark:border-gray-700 rounded-xl shadow-lg overflow-hidden">
            <div className="p-8">
              <div className="text-center mb-6">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                  PortfolioBuilder
                </h1>
                <p className="text-gray-500 dark:text-gray-400 mt-2">
                  Sign in to your account
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1">
                  <label htmlFor="email" className="block text-sm font-medium">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    placeholder="name@example.com"
                    value={loginData.email}
                    onChange={(e) =>
                      setLoginData({ ...loginData, email: e.target.value })
                    }
                    className="w-full p-2 border rounded-md bg-gray-100 dark:bg-gray-800 dark:border-gray-700"
                  />
                </div>

                <div className="space-y-1">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      required
                      placeholder="••••••••"
                      value={loginData.password}
                      onChange={(e) =>
                        setLoginData({
                          ...loginData,
                          password: e.target.value,
                        })
                      }
                      className="w-full p-2 border rounded-md bg-gray-100 dark:bg-gray-800 dark:border-gray-700"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute top-1/2 right-2 -translate-y-1/2 text-gray-500 dark:text-gray-300"
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300 dark:border-gray-600"
                    />
                    Remember me
                  </label>
                  <a
                    href="/forgot-password"
                    className="text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    Forgot password?
                  </a>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full  text-white bg-blue-600 hover:bg-blue-700 py-2 rounded-md  dark:text-white  transition"
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center">
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Signing in...
                    </span>
                  ) : (
                    "Sign in"
                  )}
                </button>
              </form>

              <div className="my-6 relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300 dark:border-gray-700" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white dark:bg-gray-900 px-2 text-gray-500 dark:text-gray-400">
                    Or continue with
                  </span>
                </div>
              </div>

              <button
                type="button"
                className="w-full flex items-center justify-center border border-gray-300 dark:border-gray-600 py-2 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 transition"
              >
                <Github className="mr-2 h-4 w-4" />
                GitHub
              </button>

              <p className="text-sm text-center mt-6 text-gray-500 dark:text-gray-400">
                Don&apos;t have an account?{" "}
                <a
                  href="/register"
                  className="text-blue-600  dark:text-blue-400 hover:underline font-medium"
                >
                  Sign up
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
