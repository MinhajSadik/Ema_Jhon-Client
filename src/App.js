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

export const UserContext = createContext()

function App() {
  const [loggedInUser, setLoggedInUser] = useState({});

  return (<UserContext.Provider value={[loggedInUser, setLoggedInUser]}>

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
          <Route path="/shipment">
            <Shipment/>
          </Route>

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
