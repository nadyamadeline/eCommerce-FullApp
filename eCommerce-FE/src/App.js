import React from "react";
import Home from "./pages/Home/Home";
import "./components/Navbar/Navbar";
import Navbar from "./components/Navbar/Navbar";
import ProductDetail from "./pages/Product/ProductDetail";
import Cart from "./pages/Cart/Cart";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/products/:id" component={ProductDetail} />
          <Route path="/cart/:id" component={Cart} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
