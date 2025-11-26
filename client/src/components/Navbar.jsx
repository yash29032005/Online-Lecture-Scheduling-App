import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FiMaximize } from "react-icons/fi";

const Navbar = ({ setOpen }) => {
  const navigate = useNavigate();
  const { user, setUser } = useAuth();

  const [dropdown, setDropdown] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // LOGOUT
  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/");
  };

  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = () => {
    if (!isFullscreen) {
      document.documentElement.requestFullscreen();
    } else {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      }
    }
    setIsFullscreen(!isFullscreen);
  };

  return (
    <nav
      className="bg-secondary text-white h-[70px] shadow-lg px-6 flex items-center 
    justify-between"
    >
      {/* Mobile Hamburger Button */}
      <button
        className="lg:hidden flex items-center justify-center w-10 h-10 rounded-md"
        onClick={() => setOpen(true)}
      >
        <svg
          className="w-7 h-7"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      <div></div>

      {/* USER DROPDOWN */}
      <div className="relative flex items-center gap-4" ref={dropdownRef}>
        <FiMaximize className="text-2xl" onClick={toggleFullscreen} />
        <button
          onClick={() => setDropdown(!dropdown)}
          className="bg-ternary px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <span className="font-medium">{user?.name || "User"}</span>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-4 w-4 transition-transform ${
              dropdown ? "rotate-180" : ""
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>

        {/* Dropdown Menu */}
        {dropdown && (
          <div className="absolute right-0 mt-2 w-40 bg-ternary border border-ternary rounded-lg shadow-lg z-30">
            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-2 hover:bg-red-600 text-gray-300 hover:text-white rounded-lg"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
