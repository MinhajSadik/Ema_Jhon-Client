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
import PrivateRoute from './Componenet/PrivateRoute/PrivateRoute';

export const UserContext = createContext()

function App() {
  const [loggedInUser, setLoggedInUser] = useState({});

  return (<UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
    
    <Router>
      <Header />
      
        <Switch>

          <Route path="/shop">
            <Shop/>
          </Route>
          
          <Route path="/review">
            <Review/>
          </Route>

          <PrivateRoute path="/inventory">
            <Inventory/>
          </PrivateRoute>

          <Route path="/login">
            <Login/>
        </Route>
        
          <PrivateRoute path="/shipment">
            <Shipment/>
          </PrivateRoute>

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
