import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { UserContext } from "../../App";
import "./Shipment.css";

const Shipment = () => {
  // eslint-disable-next-line no-unused-vars
  const userInfo = {
    name: "",
    email: "",
    address: "",
    phone: "",
  };
  const orderInfo = () => {
    fetch("http://localhost:3000/orderInfo", {
      method: "POST",
      headers: {
        "Content-Type": "Application/json",
      },
      body: JSON.stringify(userInfo),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  };

  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const { register, handleSubmit, watch, errors } = useForm();
  const onSubmit = (data) => console.log(data);

  console.log(watch("example")); // watch input value by passing the name of it

  return (
    <form className="ship-form" form onSubmit={handleSubmit(onSubmit)}>
      {/* < input name = "example" defaultValue ={loggedInUser.name} ref = { register } /> */}
      <input
        name="name"
        watch={watch("example")}
        ref={register({ required: true })}
        placeholder="What's Your Name"
      />
      {errors.name && <span className="error">Name is required</span>}

      <input
        name="email"
        watch={watch("example")}
        ref={register({ required: true })}
        placeholder="Provide Your Email"
      />
      {errors.email && <span className="error">Email is required</span>}

      <input
        name="address"
        watch={watch("example")}
        ref={register({ required: true })}
        placeholder="Fill-Up Your Address"
      />
      {errors.address && <span className="error">Address is required</span>}

      <input
        name="phone"
        watch={watch("example")}
        ref={register({ required: true })}
        placeholder="GiveMe Your Name"
      />
      {errors.phone && <span className="error">Phone Number is required</span>}

      <input type="submit" onClick={orderInfo} />
    </form>
  );
};

export default Shipment;
