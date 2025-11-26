import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import axiosClient from "../utils/AxiosClient";

const AuthPage = () => {
  const { setUser } = useAuth();
  const [tab, setTab] = useState("login");

  const [role, setRole] = useState("admin");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const result = await axiosClient.post(
        `${import.meta.env.VITE_API_URL}/api/auth/login`,
        { email, password, role }
      );

      const token = result.data.token;
      const user = result.data.user;

      localStorage.setItem("token", token);
      setUser(user);

      toast.success(result.data.message);

      if (user.role === "admin") navigate("/admin");
      else if (user.role === "instructor") navigate("/instructor");
      else navigate("/");

      setEmail("");
      setPassword("");
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const result = await axiosClient.post(
        `${import.meta.env.VITE_API_URL}/api/auth/register`,
        { name, email, password, role: "instructor" }
      );

      toast.success(result.data.message);

      setName("");
      setEmail("");
      setPassword("");
      setTab("login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-b from-primary to-secondary p-4">
      <div className="bg-primary backdrop-blur-lg shadow-xl rounded-2xl p-10 w-full max-w-md border border-gray-700">
        <div className="flex justify-center mb-4">
          <div className="bg-secondary p-4 rounded-full shadow-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-white"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 1.75L1.75 6v12L12 22.25 22.25 18V6z" />
            </svg>
          </div>
        </div>

        <h2 className="text-center text-2xl font-bold text-white mb-2">OLS</h2>
        <p className="text-center text-grey mb-6">
          {tab === "login" ? "Sign in to your account" : "Instructor Sign Up"}
        </p>

        <div className="flex mb-6 bg-secondary rounded-xl overflow-hidden">
          <button
            className={`w-1/2 py-2 font-semibold ${
              tab === "login" ? "bg-ternary text-white" : "text-grey"
            }`}
            onClick={() => setTab("login")}
          >
            Login
          </button>

          <button
            className={`w-1/2 py-2 font-semibold ${
              tab === "signup" ? "bg-ternary text-white" : "text-grey"
            }`}
            onClick={() => setTab("signup")}
          >
            Instructor Sign Up
          </button>
        </div>

        {tab === "login" && (
          <form onSubmit={handleLogin}>
            <label className="text-grey">Email</label>
            <input
              type="email"
              className="w-full p-3 rounded-lg bg-secondary text-white mb-4"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <label className="text-grey">Password</label>
            <input
              type="password"
              className="w-full p-3 rounded-lg bg-secondary text-white mb-6"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <label className="text-grey block mb-2">Login As</label>
            <div className="flex gap-4 mb-4">
              <button
                type="button"
                onClick={() => setRole("admin")}
                className={`flex-1 py-2 rounded-lg ${
                  role === "admin"
                    ? "bg-ternary text-white"
                    : "bg-secondary text-white"
                }`}
              >
                Admin
              </button>

              <button
                type="button"
                onClick={() => setRole("instructor")}
                className={`flex-1 py-2 rounded-lg ${
                  role === "instructor"
                    ? "bg-ternary text-white"
                    : "bg-secondary text-white"
                }`}
              >
                Instructor
              </button>
            </div>

            <button className="w-full bg-ternary hover:bg-secondary text-white p-3 rounded-lg font-semibold">
              Log In
            </button>
          </form>
        )}

        {tab === "signup" && (
          <form onSubmit={handleSignup}>
            <label className="text-grey">Full Name</label>
            <input
              type="text"
              className="w-full p-3 rounded-lg bg-secondary text-white mb-4"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <label className="text-grey">Email</label>
            <input
              type="email"
              className="w-full p-3 rounded-lg bg-secondary text-white mb-4"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <label className="text-grey">Password</label>
            <input
              type="password"
              className="w-full p-3 rounded-lg bg-secondary text-white mb-6"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button className="w-full bg-ternary hover:bg-secondary text-white p-3 rounded-lg font-semibold">
              Create Instructor Account
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default AuthPage;
