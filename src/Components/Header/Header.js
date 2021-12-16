import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../App";
import logo from "../../images/logo.png";
import "./Header.css";

const Header = ({ cart }) => {
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  return (
    <div className="header">
      <img src={logo} alt="" />
      <nav>
        <Link to="/shop">Shop</Link>
        <Link to="/review">Order Review</Link>
        <Link to="/inventory">Manage Inventory</Link>
        <Link to="/cart">
          <FontAwesomeIcon icon={faShoppingCart} />
          <b>{cart.length ? cart.length : ""}</b>
        </Link>
        <Link to="/login">
          <button
            style={{ backgroundColor: "goldenrod" }}
            onClick={() => setLoggedInUser({})}
          >
            {loggedInUser ? "Sign Out" : "Sign In"}
          </button>
        </Link>
      </nav>
    </div>
  );
};

export default Header;
