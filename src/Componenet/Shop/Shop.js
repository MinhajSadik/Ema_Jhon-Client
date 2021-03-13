import React, { useState } from 'react';
import fakeData from '../../fakeData';
import { addToDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import Product from '../Product/Product.js';
import './Shop.css';

const Shop = () => {
    const first = fakeData.slice(0, 10);
    const [products] = useState(first)
    const [cart, setCart] = useState([]);

    const handleAddProduct = (product) =>{
        const toBeAdded = product.key;
        const sameProduct = cart.find(pd => pd.key === toBeAdded);
        let count = 1;
        let newCart;
        if (sameProduct) {
            const count = sameProduct.quantity + 1;
            sameProduct.quantity = count;
            const others = cart.filter(pd => pd.key !== toBeAdded)
            newCart = [...others, sameProduct];
        }
        else {
            product.quantity = 1;
            newCart = [...cart, product]
        }
        setCart(newCart);
        addToDatabaseCart(product.key, count);
    }
    
    return (
        <div className="twin-container">
            <div className="product-container">
                {
                    products.map(pro =><Product 
                        key={pro.key}
                        showAddToCart={true} 
                        handleAddProduct={handleAddProduct} product={pro}></Product>)
                }
            </div>
            <div className="cart-container">
                <Cart cart={cart}></Cart>
            </div>
        </div>
    );
};

export default Shop;