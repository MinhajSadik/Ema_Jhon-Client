import { LinearProgress } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { addToDatabaseCart } from "../../utilities/databaseManager";
import Product from "../Product/Product.js";
import "./Shop.css";

const Shop = ({ cart, setCart }) => {
  const [products, setProducts] = useState([]);

  document.title = "Shop Page";

  useEffect(() => {
    fetch("https://ema-john-client.herokuapp.com/products")
      .then((res) => res.json())
      .then((results) => setProducts(results));
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
        {products.map((product) => (
          <Product
            key={product.key}
            showAddToCart={true}
            handleAddProduct={handleAddProduct}
            product={product}
          ></Product>
        ))}
      </div>
    </div>
  );
};

export default Shop;
