import React from 'react';
import './Cart.css';
const Cart = (props) => {
    const cart = props.cart;
    // const total = cart.reduce((total, item) => total + item.price, 0);
    let total = 0;
    for (let i = 0; i < cart.length; i++) {
        const product = cart[i];
        total += product.price * product.quantity;
    }

    let shipping = 0;
    if (total >100){
        shipping = 14.99;
    }
    else if(total > 50){
        shipping = 4.99;
    }
    else if(total > 20){
        shipping = 2.99;
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
                <h4>Order Done Summary</h4>
                <p>Items Order {cart.length}</p>
                <p>Product Price: {formatNumber(total)}</p>
                <p><small>Shipping Cost:{shipping}</small></p>
                <p><small>Tax + Vat: {tax}</small></p>
                <p>Total: {grandTotal}</p>
                <br/>
                {
                    props.children
                }
            </div>
        </div>
        
    );
};

export default Cart;