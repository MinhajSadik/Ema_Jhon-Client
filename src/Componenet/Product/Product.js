import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import './Product.css';

const Product = (props) => {
    console.log(props);
    const { img, name, seller, price, stock } = props.product;
    return (
        <div className="product">
            <div>
                <img src={img} alt="" />
            </div>
            <div className="product-name">
                <h4>{name}</h4>
                <br />
                <p><small>by:{seller}</small></p>
                <p>${price}</p>
                <br />
                <p><small>Only:{stock} left in stock</small></p>
                <button onClick={() => props.handleAddProduct(props.product)} className="main-button"> <FontAwesomeIcon icon={faShoppingCart}/> add to cart</button>
            </div>
        </div>
    );
};
export default Product;
