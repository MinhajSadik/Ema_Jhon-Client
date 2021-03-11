import React from 'react';

const ReviewItem = (props) => {
    const {name, quantity, img, key, price} = props.product;
    // console.log(props);
    const ReviewItemStyle = {
        padding: '10px',
        margin: '10px',
        marginLeft: '200px',
        border:'1px solid black',
        width: '1100px',
        height: '400px'

    }
    return (
        <div style={ReviewItemStyle} >
            <img src={img} alt=""/>
            <h4> {name} </h4>
            <p>Quantity: {quantity}</p>
            <p><small>${price}</small></p>
            <br/>
            <button onClick={() => props.removeProduct(key)} className="main-button">Remove</button>
        </div>
    );
};

export default ReviewItem;