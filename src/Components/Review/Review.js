import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import HappyImage from "../../images/giphy.gif";
import {
  getDatabaseCart,
  removeFromDatabaseCart,
} from "../../utilities/databaseManager";
import Cart from "../Cart/Cart";
import ReviewItem from "../ReviewItem/ReviewItem";

const Review = () => {
  const [cart, setCart] = useState([]);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const history = useHistory();
  const handleProceedChackOut = () => {
    history.push("/shipment");
    // setCart([]);
    // setOrderPlaced(true);
    // processOrder()
  };
  const removeProduct = (productKey) => {
    const newCart = cart.filter((pd) => pd.key !== productKey);
    setCart(newCart);
    removeFromDatabaseCart(productKey);
  };
  useEffect(() => {
    // cart
    const savedCart = getDatabaseCart();
    const productKeys = Object.keys(savedCart);

    fetch("http://localhost:3000/productsByKeys", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(productKeys),
    })
      .then((res) => res.json())
      .then((data) => setCart(data));
  }, []);

  let thankYou;
  if (orderPlaced) {
    thankYou = <img src={HappyImage} alt="" />;
  }

  return (
    <div className="twin-container">
      <div className="product-container">
        {cart.map((pd) => (
          <ReviewItem
            removeProduct={removeProduct}
            pd={pd.key}
            product={pd}
          ></ReviewItem>
        ))}

        {thankYou}
      </div>
      <div className="cart-container">
        <Cart cart={cart}>
          <button onClick={handleProceedChackOut} className="main-button">
            Proceed Chack Out
          </button>
        </Cart>
      </div>
    </div>
  );
};

export default Review;
