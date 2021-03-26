import './App.css';
import React, { createContext, useState } from 'react'
import Header from './Componenet/Header/Header';
import Shop from './Componenet/Shop/Shop';
import Review from './Componenet/Review/Review';
import Inventory from './Componenet/Inventory/Inventory';
import Login from './Componenet/Login/Login';
import Shipment from './Componenet/Shipment/Shipment';
import NotFound from './Componenet/NotFound/NotFound';
import ProductDetail from './Componenet/ProductDetail/ProductDetail';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import PrivetRoute from './Componenet/PrivetRoute/PrivetRoute';

export const UserContext = createContext()

function App() {
  const [loggedInUser, setLoggedInUser] = useState({});

  return (<UserContext.Provider value={[loggedInUser, setLoggedInUser]}>

    <h3> Login Email: { loggedInUser.email}</h3>
    <Header />
    
      <Router>
        <Switch>

          <Route path="/shop">
            <Shop/>
          </Route>
          
          <Route path="/review">
            <Review/>
          </Route>

          <Route path="/inventory">
            <Inventory/>
          </Route>

          <Route path="/login">
            <Login/>
          </Route>
          <PrivetRoute path="/shipment">
            <Shipment/>
          </PrivetRoute>

          <Route exact path="/">
            <Shop/>
          </Route>
          
          <Route path="/product/:productKey">
              <ProductDetail/>
          </Route>

          <Route path="*">
            <NotFound/>
        </Route>
  
      </Switch>
    </Router>

  </UserContext.Provider>);
}

export default App;
