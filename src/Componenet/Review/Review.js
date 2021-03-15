import React, { useEffect, useState } from 'react';
import fakeData from '../../fakeData';
import { getDatabaseCart, processOrder, removeFromDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import ReviewItem from '../ReviewItem/ReviewItem';
import HappyImage from '../../images/giphy.gif'

const Review = () => {
    const [cart, setCart] = useState([]);

    const [orderPlaced, setOrderPlaced] = useState(false);

    const handleAddProduct = () => {
        setCart([]);
        setOrderPlaced(true);
        processOrder()
    }
    const removeProduct = (productKey) => {
        const newCart = cart.filter(pd => pd.key !== productKey);
        setCart(newCart);
        removeFromDatabaseCart(productKey);
    }
    useEffect(() =>{
        // cart
        const savedCart = getDatabaseCart();
        const productKey = Object.keys(savedCart);

        const cartProducts = productKey.map(key => {
            const product = fakeData.find(pd => pd.key === key);
            product.quantity = savedCart[key];
            return product;
            
        });
        setCart(cartProducts);
    }, [])


    let thankYou;
    if(orderPlaced){
        thankYou = <img src={HappyImage} alt="" />
    } 

    return (
        <div className='twin-container'>
            <div className='product-container'>
                {
                    cart.map(pd => <ReviewItem
                        removeProduct={removeProduct}
                        pd={pd.key}
                        product={pd}></ReviewItem>)
                }

                {thankYou}

            </div>
            <div className="cart-container">
                <Cart cart={cart}>
                    <button 
                    onClick={handleAddProduct}
                    className="main-button">Place Order</button>
                </Cart>
            </div>
        </div>
    );
};

export default Review;