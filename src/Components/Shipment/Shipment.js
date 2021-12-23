import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { UserContext } from "../../App";
import { getDatabaseCart, processOrder } from "../../utilities/databaseManager";
import ProcessPayment from "../ProcessPayment/ProcessPayment";
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
    fetch("https://ema-john-client.herokuapp.com/addOrder", {
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
          processOrder(savedCart);
        } else {
          alert("Something went wrong!");
        }
      });
  };

  console.log(watch("example")); // watch input value by passing the name of it

  return (
    <div className="row">
      <div className="col-md-6">
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
          {errors.phone && (
            <span className="error">Phone Number is required</span>
          )}

          <input type="submit" />
        </form>
      </div>
      <div className="col-md-6">
        <h2>Pay for me</h2>
        <ProcessPayment />
      </div>
    </div>
  );
};

export default Shipment;
