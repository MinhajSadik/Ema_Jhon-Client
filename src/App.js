import React, { createContext, useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Cart from "./Components/Cart/Cart";
import Header from "./Components/Header/Header";
import Inventory from "./Components/Inventory/Inventory";
import Login from "./Components/Login/Login";
import NotFound from "./Components/NotFound/NotFound";
import PrivateRoute from "./Components/PrivateRoute/PrivateRoute";
import ProductDetail from "./Components/ProductDetail/ProductDetail";
import Review from "./Components/Review/Review";
import Shipment from "./Components/Shipment/Shipment";
import Shop from "./Components/Shop/Shop";
import { getDatabaseCart } from "./utilities/databaseManager";

export const UserContext = createContext();

function App() {
  const [loggedInUser, setLoggedInUser] = useState({});
  const [cart, setCart] = useState([]);
  useEffect(() => {
    const savedCart = getDatabaseCart();
    const productKeys = Object.keys(savedCart);
    fetch("https://ema-john-client.herokuapp.com/productsByKeys", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(productKeys),
    })
      .then((res) => res.json())
      .then((data) => setCart(data));
  }, []);

  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
      <Router>
        <Header cart={cart} />

        <Switch>
          <Route path="/shop">
            <Shop cart={cart} setCart={setCart} />
          </Route>

          <Route path="/cart">
            <Cart cart={cart} setCart={setCart} />
          </Route>

          <Route path="/review">
            <Review />
          </Route>

          <PrivateRoute path="/inventory">
            <Inventory />
          </PrivateRoute>

          <Route path="/login">
            <Login />
          </Route>

          <PrivateRoute path="/shipment">
            <Shipment />
          </PrivateRoute>

          <Route exact path="/">
            <Shop />
          </Route>

          <Route path="/product/:productKey">
            <ProductDetail />
          </Route>

          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
