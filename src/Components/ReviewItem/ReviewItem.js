import React from "react";
import "./ReviewItem.css";

const ReviewItem = (props) => {
  const { name, quantity, img, key, price } = props.product;
  // console.log(props);
  const ReviewItemStyle = {
    marginBottom: "10px",
    paddingBottom: "5px",
    marginLeft: "100px",
    // margin: '10px',
    // padding: '10px'
  };
  return (
    <div style={ReviewItemStyle}>
      <img src={img} alt="" />
      <div>
        <h4 style={{ width: "350px", height: "100px" }}> {name} </h4>
        <p>Quantity: {quantity}</p>
        <p>
          <small>${price}</small>
        </p>
        <br />
        <button
          onClick={() => props.removeProduct(key)}
          className="main-button"
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default ReviewItem;
