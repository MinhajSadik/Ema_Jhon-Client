import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../App";
import logo from "../../images/logo.png";
import "./Header.css";
const Header = () => {
  // eslint-disable-next-line no-unused-vars
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  return (
    <div className="header">
      <img src={logo} alt="" />
      <nav>
        <Link to="/shop">Shop</Link>
        <Link to="/review">Order Review</Link>
        <Link to="/inventory">Manage Inventory</Link>
        <button
          style={{ backgroundColor: "yellow" }}
          onClick={() => setLoggedInUser({})}
        >
          Sign Out
        </button>
      </nav>
    </div>
  );
};

export default Header;
