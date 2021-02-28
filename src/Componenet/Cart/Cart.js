import React from 'react';
import './Cart.css';
const Cart = (props) => {
    const cart = props.cart;
    // const total = cart.reduce((total, item) => total + item.price, 0);
    let total = 0;
    for (let i = 0; i < cart.length; i++) {
        const product = cart[i];
        total += product.price;
    }

    let shipping = 0;
    if (total >100){
        shipping = 0;
    }
    else if(total > 50){
        shipping = 4.99;
    }
    else if(total > 20){
        shipping = 7.99;
    }

    const tax = (total / 10).toFixed(2);
    const grandTotal = (total + shipping + Number(tax)).toFixed(2);

    const formatNumber = num => {
        const precision = num.toFixed(2);
        return Number(precision)
    }

    return (
        <div className="cart-container">
            <div>
                <h4>Order Summary</h4>
                <p>Items Order {cart.length}</p>
                <p>Product Price:{formatNumber(total)}</p>
                <p><small>Shipping Cost:{shipping}</small></p>
                <p><small>Tax + Vat: {tax}</small></p>
                <p>Total: {grandTotal}</p>
                <button className="btn">Submit</button>
            </div>
        </div>
        
    );
};

export default Cart;