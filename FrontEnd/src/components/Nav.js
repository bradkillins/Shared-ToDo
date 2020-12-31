import React from "react";
import { Link } from "react-router-dom";

const Nav = (props) => {
  let loginOut;
  if (!props.currentUser) {
    loginOut = (
      <Link to="/login" className="navLink">
        Login
      </Link>
    );
  } else {
    loginOut = (
      <Link to="/" className="navLink">
        Logout
      </Link>
    );
  }
  return (
    <nav className="nav">
      <div className="logo">Shared Todos</div>
      <div className="navLinks">
        {loginOut}
        <Link to="/signup" className="navLink">
          Sign Up
        </Link>
      </div>
    </nav>
  );
};

export default Nav;
