import { LinearProgress } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  addToDatabaseCart,
  getDatabaseCart,
} from "../../utilities/databaseManager";
import Cart from "../Cart/Cart";
import Product from "../Product/Product.js";
import "./Shop.css";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  document.title = "Shop Page";

  useEffect(() => {
    fetch("http://localhost:3000/products")
      .then((res) => res.json())
      .then((results) => setProducts(results));
  }, []);

  useEffect(() => {
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

  const handleAddProduct = (product) => {
    const toBeAdded = product.key;
    const sameProduct = cart.find((pd) => pd.key === toBeAdded);
    let count = 1;
    let newCart;
    if (sameProduct) {
      const count = sameProduct.quantity + 1;
      sameProduct.quantity = count;
      const others = cart.filter((pd) => pd.key !== toBeAdded);
      newCart = [...others, sameProduct];
    } else {
      product.quantity = count;
      newCart = [...cart, product];
    }
    setCart(newCart);
    addToDatabaseCart(product.key, count);
  };

  return (
    <div className="twin-container">
      <div className="product-container">
        {products.length === 0 && (
          <div>
            <LinearProgress />
            <LinearProgress color="secondary" />
          </div>
        )}
        {products.map((pro) => (
          <Product
            key={pro.key}
            showAddToCart={true}
            handleAddProduct={handleAddProduct}
            product={pro}
          ></Product>
        ))}
      </div>
      <div className="cart-container">
        <Cart cart={cart}>
          <Link to="review">
            <button className="main-button">Review Order</button>
          </Link>
        </Cart>
      </div>
    </div>
  );
};

export default Shop;
