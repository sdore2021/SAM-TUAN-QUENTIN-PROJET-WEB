import React from "react";
import { Link } from "react-router-dom";
const NavBar = ({ user, isAdmin }) => {
  return (
    <nav className="light-blue lighten-1" role="navigation">
      <div className="nav-wrapper container">
        <Link to="/" className="brand-logo">
          Food
        </Link>

        <ul className="right">
          {!isAdmin && (
            <React.Fragment>
              <li>
                <Link to="/">Shop</Link>
              </li>

              <li>
                <Link to="/cart">My cart</Link>
              </li>
              <li>
                <Link to="/cart">
                  <i className="material-icons">shopping_cart</i>
                </Link>
              </li>
            </React.Fragment>
          )}
          <li>
            <Link to="/LoginAdmin">Login</Link>
          </li>
          <li>
            <Link to="/CreateNewAdmin">Register</Link>
          </li>
          <li>
            <Link to="/LogoutAdmin">Logout</Link>
          </li>
          <li>{user && user.name}</li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
