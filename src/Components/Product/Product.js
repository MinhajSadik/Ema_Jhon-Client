import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";
import "./Product.css";

const Product = ({ product, handleAddProduct, showAddToCart }) => {
  // const {product, handleAddProduct, showAddToCart} = props;
  const { img, name, seller, price, stock, key, category } = product;
  document.title = "Product Here";
  const sortname = name.slice(0, 15);
  return (
    <div className="product">
      <div>
        <img src={img} alt="" />
      </div>
      <div className="product-name">
        <Link to={"/product/" + key}> Name: {sortname}</Link>
        <br />
        <p>
          <small>by: {seller}</small>
        </p>
        <p>Price: ${price}</p>
        <p>Category: {category}</p>
        <p>
          <small>Only: {stock} left in stock</small>
        </p>

        {showAddToCart === true && (
          <button
            onClick={() => handleAddProduct(product)}
            className="main-button"
          >
            <FontAwesomeIcon icon={faShoppingCart} />
            add to cart
          </button>
        )}
      </div>
    </div>
  );
};
export default Product;
