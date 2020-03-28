import React from "react";
import { Link } from "react-router-dom";
const NavBar = () => {
  return (
    <nav className="col-md-2">
      <div className="flex-column bg-secondary" style={{ height: "100" }}>
        <ul className="nav flex-column">
          <Link to="/CreateNewAdmin">Create new Admin</Link>
          <Link to="/LogoutAdmin">Logout</Link>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
