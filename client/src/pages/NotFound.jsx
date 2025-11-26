import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <>
      <div className="bg-black text-white h-screen flex flex-col items-center justify-center text-3xl">
        <span className="text-[100px] font-extrabold font-serif">404</span>Page
        Not Found
        <Link
          to="/"
          className="mt-4 inline-block px-4 py-2 bg-secondary text-lg hover:bg-ternary rounded-lg"
        >
          Go to Dashboard
        </Link>
      </div>
    </>
  );
};

export default NotFound;
