import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div>
      <nav>
        <NavLink to="/">Homepage</NavLink>
        <NavLink to="/users/login">Login</NavLink>
        <NavLink to="/users/register">Register</NavLink>
      </nav>
    </div>
  );
};

export default Navbar;
