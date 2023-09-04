import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar p-4 flex justify-between items-center mx-auto border-4 border-red-200 bg-green-100 rounded m-2 ">
      <h1 className="text-blue-400 text-2xl font-bold">Marvel Masters</h1>
      <div>
        <NavLink
          to={"/"}
          className="no-underline text-gray-600 p-4 hover:text-indigo-600 hover:font-bold"
        >
          Home
        </NavLink>
        <NavLink
          to={"/products"}
          className="text-gray-600 p-4 hover:text-indigo-600"
        >
          Products
        </NavLink>

        <NavLink
          to={"/login"}
          className="text-gray-600 p-4 hover:text-indigo-600"
        >
          Login/Register
        </NavLink>
        <NavLink
          to={"/cart"}
          className="text-gray-600 p-4 hover:text-indigo-600"
        >
          🛒
        </NavLink>
      </div>
    </nav>
  );
};
export default Navbar;
