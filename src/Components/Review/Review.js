import React, { useEffect, useState } from "react";
import HappyImage from "../../images/giphy.gif";
import {
  getDatabaseCart,
  removeFromDatabaseCart,
} from "../../utilities/databaseManager";
import ReviewItem from "../ReviewItem/ReviewItem";

const Review = () => {
  const [cart, setCart] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [orderPlaced, setOrderPlaced] = useState(false);
  // const history = useHistory();
  // const handleProceedChackOut = () => {
  //   history.push("/shipment");
  //   setCart([]);
  //   setOrderPlaced(true);
  //   // processOrder()
  // };
  const removeProduct = (productKey) => {
    const newCart = cart.filter((pd) => pd.key !== productKey);
    setCart(newCart);
    removeFromDatabaseCart(productKey);
  };
  useEffect(() => {
    // cart
    const savedCart = getDatabaseCart();
    const productKeys = Object.keys(savedCart);

    fetch("https://ema-john-client.herokuapp.com/productsByKeys", {
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
    <div className="twin_container">
      <div className="product_container">
        {cart.map((pd) => (
          <ReviewItem
            removeProduct={removeProduct}
            key={pd.key}
            product={pd}
          ></ReviewItem>
        ))}

        {thankYou}
      </div>
      {/* <div className="cart-container">
        <button onClick={handleProceedChackOut} className="main-button">
          Proceed Chack Out
        </button>
      </div> */}
    </div>
  );
};

export default Review;
