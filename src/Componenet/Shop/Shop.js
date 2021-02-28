import React, { useState } from 'react';
import fakeData from '../../fakeData';
import Cart from '../Cart/Cart';
import Product from '../Product/Product.js';
import './Shop.css';

const Shop = () => {
    const first = fakeData.slice(0, 10);
    const [products, setProduct] = useState(first)
    const [cart, setCart] = useState([]);

    const handleAddProduct = (product) =>{
        const newCart = [...cart, product];
        setCart(newCart);
    }
    return (
        <div className="shop-container">
            <div className="product-container">
                {
                    products.map(pro =>
                    <Product handleAddProduct={handleAddProduct} 
                        product={pro}></Product>)
                }
            </div>
            <div className="cart-container">
                <Cart cart={cart}></Cart>
            </div>
        </div>
    );
};

export default Shop;