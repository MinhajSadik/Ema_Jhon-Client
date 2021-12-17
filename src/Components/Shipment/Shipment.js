import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { UserContext } from "../../App";
import {
  getDatabaseCart,
  removeFromDatabaseCart,
} from "../../utilities/databaseManager";
import "./Shipment.css";
const Shipment = () => {
  // eslint-disable-next-line no-unused-vars
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const { register, handleSubmit, watch, errors } = useForm();
  const savedCart = getDatabaseCart();
  const onSubmit = (data) => {
    const orderInfo = {
      ...loggedInUser,
      cartProducts: savedCart,
      shipment: data,
      orderTime: new Date(),
    };
    fetch("http://localhost:3000/addOrder", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderInfo),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          alert("Order placed successfully!");
          removeFromDatabaseCart();
        } else {
          alert("Something went wrong!");
        }
      });
  };

  console.log(watch("example")); // watch input value by passing the name of it

  return (
    <form className="ship-form" form onSubmit={handleSubmit(onSubmit)}>
      {/* < input name = "example" defaultValue ={loggedInUser.name} ref = { register } /> */}
      <input
        name="name"
        defaultValue={loggedInUser.name}
        ref={register({ required: true })}
        placeholder="What's Your Name"
      />
      {errors.name && <span className="error">Name is required</span>}

      <input
        name="email"
        defaultValue={loggedInUser.email}
        ref={register({ required: true })}
        placeholder="Provide Your Email"
      />
      {errors.email && <span className="error">Email is required</span>}

      <input
        name="address"
        ref={register({ required: true })}
        placeholder="Fill-Up Your Address"
      />
      {errors.address && <span className="error">Address is required</span>}

      <input
        name="phone"
        ref={register({ required: true })}
        placeholder="GiveMe Your Name"
      />
      {errors.phone && <span className="error">Phone Number is required</span>}

      <input type="submit" />
    </form>
  );
};

export default Shipment;
