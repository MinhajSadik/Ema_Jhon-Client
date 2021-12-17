import React from "react";
import "./ReviewItem.css";

const ReviewItem = (props) => {
  const { name, quantity, img, key, price } = props.product;
  const ReviewItemStyle = {
    marginBottom: "0px",
    paddingBottom: "0px",
    marginLeft: "5%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    width: "50%",
  };
  return (
    <div style={ReviewItemStyle}>
      <img src={img} alt={name} />
      <div style={{ marginLeft: "30px" }}>
        <h4> {name} </h4>
        <p>Quantity: {quantity}</p>
        <p>
          <small>${price}</small>
        </p>
        <br />
        <button
          onClick={() => props.removeProduct(key)}
          className="main-button"
        >
          Remove Item
        </button>
      </div>
    </div>
  );
};

export default ReviewItem;
