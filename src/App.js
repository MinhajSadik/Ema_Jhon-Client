import React, { createContext, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Header from "./Components/Header/Header";
import Inventory from "./Components/Inventory/Inventory";
import Login from "./Components/Login/Login";
import NotFound from "./Components/NotFound/NotFound";
import PrivateRoute from "./Components/PrivateRoute/PrivateRoute";
import ProductDetail from "./Components/ProductDetail/ProductDetail";
import Review from "./Components/Review/Review";
import Shipment from "./Components/Shipment/Shipment";
import Shop from "./Components/Shop/Shop";

export const UserContext = createContext();

function App() {
  const [loggedInUser, setLoggedInUser] = useState({});

  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
      <Router>
        <Header />

        <Switch>
          <Route path="/shop">
            <Shop />
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
