
import React, { useState } from "react"
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { Eye, EyeOff, Loader2,Github } from "lucide-react"

const Register = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [registerData, setRegisterData] = useState({
        name: "",
        email: "",
        password: "",
      });
      const navigate = useNavigate();
    const handleSubmit = async(e) => {

        e.preventDefault();
        try {
            await axios.post("http://localhost:5000/api/auth/register", registerData);
            alert("Registered successfully! Please login.");
            navigate("/login");
          } catch (err) {
            alert(err.response?.data?.message || "Register failed");
          }
      };
  return (
    <div>
      <div className=" w-[100vw] min-h-screen flex flex-col bg-gradient-to-br from-white to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <header className="w-full p-4 flex justify-between items-center">
        <a href="/" className="flex items-center gap-2 text-gray-500 hover:text-black dark:hover:text-white transition-colors">
          ← <span>Back to Home</span>
        </a>
        <button className="text-sm px-3 py-1 border rounded-md">Toggle Theme</button>
      </header>

      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg p-8">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
              PortfolioBuilder
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mt-2">Create your account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                First name
              </label>
              <input
                id="firstName"
                type="text"
                placeholder="John"
                required
                value={registerData.name}
                onChange={(e) => setRegisterData({ ...registerData, name: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-sm text-gray-900 dark:text-white"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="name@example.com"
                required
                value={registerData.email}
                onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-sm text-gray-900 dark:text-white"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  required
                  value={registerData.password}
                  onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-sm text-gray-900 dark:text-white"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <input type="checkbox" id="terms" required className="w-4 h-4 border-gray-300 rounded" />
              <label htmlFor="terms" className="text-sm text-gray-700 dark:text-gray-300">
                I agree to the{" "}
                <a href="/terms" className="text-blue-600 dark:text-blue-400 underline">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="/privacy" className="text-blue-600 dark:text-blue-400 underline">
                  Privacy Policy
                </a>
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white flex justify-center items-center text-sm"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating account...
                </>
              ) : (
                "Create account"
              )}
            </button>
          </form>

          <div className="mt-6 relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white dark:bg-gray-900 px-2 text-gray-500 dark:text-gray-400">
                Or continue with
              </span>
            </div>
          </div>

          <div className="mt-4">
            <button
              type="button"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md flex items-center justify-center text-sm hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <Github />
              GitHub
            </button>
          </div>

          <div className="mt-6 text-center text-sm">
            <p className="text-gray-500 dark:text-gray-400">
              Already have an account?{" "}
              <a href="/login" className="text-blue-600 dark:text-blue-400 underline font-medium">
                Sign in
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}

export default Register
