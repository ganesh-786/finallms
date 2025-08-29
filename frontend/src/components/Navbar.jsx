import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="bg-white shadow flex items-center justify-between px-6 py-3">
      <a href="/" className="text-xl font-bold text-blue-700">
        FinalLMS
      </a>
      <div>
        {!user && (
          <>
            <a href="/login" className="text-blue-600 mx-2 hover:underline">
              Login
            </a>
            <a href="/register" className="text-blue-600 mx-2 hover:underline">
              Register
            </a>
          </>
        )}
        {user && (
          <>
            <span className="mr-4 text-gray-700">
              Hello, {user.username} ({user.role})
            </span>
            <a href="/dashboard" className="text-blue-600 mx-2 hover:underline">
              Dashboard
            </a>
            {(user.role === "admin" || user.role === "manager") && (
              <a href="/manage" className="text-blue-600 mx-2 hover:underline">
                Manage Courses
              </a>
            )}
            <button
              onClick={logout}
              className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 ml-2"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
