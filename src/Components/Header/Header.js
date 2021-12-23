/* eslint-disable no-unused-vars */
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../App";
import logo from "../../images/logo.png";
import "./Header.css";

const Header = ({ cart }) => {
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const [user, setUser] = useState([]);
  useEffect(() => {
    fetch("https://ema-john-client.herokuapp.com/user")
      .then((res) => res.json())
      .then((data) => setUser(data));
  }, []);

  return (
    <div className="header">
      <img src={logo} alt="" />
      <nav>
        <Link to="/shop">Shop</Link>
        <Link to="/review">Order Review</Link>
        <Link to="/inventory">Manage Inventory</Link>
        <Link to="/cart">
          <FontAwesomeIcon icon={faShoppingCart} />
          <b>{cart.length ? cart.length : 0}</b>
        </Link>
        <Link to="/login">
          <button style={{ backgroundColor: "green" }}>
            <span>
              {loggedInUser ? loggedInUser.name || "LOGIN/SIGNIN" : "Login"}
            </span>
          </button>
        </Link>
      </nav>
    </div>
  );
};

export default Header;
