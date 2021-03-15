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
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                    <path fill="#0099ff" fill-opacity="1" 
                    d="M0,320L0,64L130.9,64L130.9,224L261.8,224L261.8,
                    128L392.7,128L392.7,192L523.6,192L523.6,64L654.5,64L654.5,
                    64L785.5,64L785.5,192L916.4,192L916.4,96L1047.3,96L1047.3,320L1178.2,
                    320L1178.2,160L1309.1,160L1309.1,224L1440,224L1440,0L1309.1,0L1309.1,
                    0L1178.2,0L1178.2,0L1047.3,0L1047.3,0L916.4,0L916.4,0L785.5,
                    0L785.5,0L654.5,0L654.5,0L523.6,0L523.6,0L392.7,0L392.7,0L261.8,
                    0L261.8,0L130.9,0L130.9,0L0,0L0,0Z">
                    </path>
                </svg>
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