import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import fakeData from "../../fakeData";
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
    const productKey = Object.keys(savedCart);

    const cartProducts = productKey.map((key) => {
      const product = fakeData.find((pd) => pd.key === key);
      product.quantity = savedCart[key];
      return product;
    });
    setCart(cartProducts);
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
