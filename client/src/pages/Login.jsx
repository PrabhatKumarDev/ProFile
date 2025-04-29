import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [registerData, setRegisterData] = useState({ name: "", email: "", password: "" });
  const [isFlipped, setIsFlipped] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Check if the current path is '/register' and set flip state accordingly
    if (location.pathname === "/register") {
      setIsFlipped(true);
    }
  }, [location.pathname]);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);

    setTimeout(() => {
      navigate(isFlipped ? "/login" : "/register");
    }, 500); // Delay matches your CSS animation duration
  };

  const handleLoginSubmit = async(e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", loginData);
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  const handleRegisterSubmit = async(e) => {
    e.preventDefault();
    try {
        await axios.post("http://localhost:5000/api/auth/register", registerData);
        alert("Registered successfully! Please login.");
        setIsFlipped(false);
        navigate("/login");
      } catch (err) {
        alert(err.response?.data?.message || "Register failed");
      }
  };

  return (
    <div className="w-full h-[100vh] flex items-center justify-center">
      <div className="relative w-[500px] h-[400px] perspective">
        <div className={`card ${isFlipped ? "rotate-y-180" : ""}`}>
          {/* Front Side (Login) */}
          {!isFlipped && (
            <div className="card-inner card-front rounded-lg shadow-lg flex flex-col justify-center items-center">
              <h2 className="text-2xl font-bold mb-4">Login</h2>
              <form
                onSubmit={handleLoginSubmit}
                className="flex flex-col gap-4 w-[80%]"
              >
                <input
                  type="email"
                  placeholder="Email"
                  className="p-2 border border-gray-300 rounded-md"
                  required
                  value={loginData.email}
                  onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                />
                <input
                  type="password"
                  placeholder="Password"
                  className="p-2 border border-gray-300 rounded-md"
                  value={loginData.password}
                  onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                  required
                />
                <button
                  type="submit"
                  className="bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200"
                >
                  Login
                </button>
              </form>
              <button
                onClick={handleFlip}
                className="mt-4 text-blue-500 hover:underline"
              >
                Register
              </button>
            </div>
          )}

          {/* Back Side (Register) */}
          {isFlipped && (
            <div className="card-inner card-back rounded-lg shadow-lg flex flex-col justify-center items-center">
              <h2 className="text-2xl font-bold mb-4">Register</h2>
              <form
                onSubmit={handleRegisterSubmit}
                className="flex flex-col gap-4 w-[80%]"
              >
                <input
                  type="text"
                  placeholder="Name"
                  className="p-2 border border-gray-300 rounded-md"
                  value={registerData.name}
                  onChange={(e) => setRegisterData({ ...registerData, name: e.target.value })}
                  required
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="p-2 border border-gray-300 rounded-md"
                  value={registerData.email}
                  onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                  required
                />
                <input
                  type="password"
                  placeholder="Password"
                  className="p-2 border border-gray-300 rounded-md"
                  value={registerData.password}
                  onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                  required
                />
                <button
                  type="submit"
                  className="bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition duration-200"
                >
                  Register
                </button>
              </form>
              <button
                onClick={handleFlip}
                className="mt-4 text-blue-500 hover:underline"
              >
                Back to Login
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
