import React from "react";
import { Link } from "react-router-dom";
import "./index.css";

const Nav = (props) => (
  <nav className="nav">
    <div className="logo">Shared Todos</div>
    <div className="navLinks">
      <Link to="/login" className="navLink">
        Login
      </Link>
      <Link to="/signup" className="navLink">
        Sign Up
      </Link>
    </div>
  </nav>
);

export default Nav;
