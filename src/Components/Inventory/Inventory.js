import React from "react";

const Inventory = () => {
  //addProduct endpoint
  const product = {};
  const handleAddProduct = () => {
    fetch("https://ema-john-client.herokuapp.com/addProduct", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  };
  return (
    <div>
      <form action="">
        <p>
          <span>Name: </span>
          <input type="text" />
        </p>
        <p>
          <span>Price: </span>
          <input type="text" />
        </p>
        <p>
          <span>Quentity: </span>
          <input type="text" />
        </p>
        <p>
          <span>Upload Image: </span>
          <input type="file" />
        </p>
        <button onClick={handleAddProduct}>Add Product</button>
      </form>
    </div>
  );
};

export default Inventory;
