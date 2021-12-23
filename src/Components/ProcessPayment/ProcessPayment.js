import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import CheckoutForm from "./CheckoutForm";
const stripePromise = loadStripe("pk_test_qblFNYngBkEdjEZ16jxxoWSM");

const ProcessPayment = () => {
  const options = {
    clientSecret: "{{CLIENT_SECRET}}",
  };

  return (
    <Elements stripe={stripePromise} options={options}>
      <CheckoutForm />
    </Elements>
  );
};

export default ProcessPayment;
