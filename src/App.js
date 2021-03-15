import './App.css';
import React from 'react'
import Header from './Componenet/Header/Header';
import Shop from './Componenet/Shop/Shop';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Review from './Componenet/Review/Review';
import Inventory from './Componenet/Inventory/Inventory';
import NotFound from './Componenet/NotFound/NotFound';
import ProductDetail from './Componenet/ProductDetail/ProductDetail';
function App() {
  return (
    <div>
    <Header></Header>
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
  </div>
  );
}

export default App;
