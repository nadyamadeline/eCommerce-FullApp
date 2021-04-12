import React from "react";
import Home from "./pages/Home/Home";
import "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";
import ProductDetail from "./pages/Product/ProductDetail";
import Cart from "./pages/Cart/Cart";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Shipping from "./pages/Shipping/Shipping.jsx";
import Payment from "./pages/Payment/Payment";
import Review from "./pages/Review/Review";
import OrderDetail from "./pages/OrderDetail/OrderDetail";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/products/:id" component={ProductDetail} />
          <Route path="/cart" component={Cart} />
          <Route path="/signin" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/shipping" component={Shipping} />
          <Route path="/payment" component={Payment} />
          <Route path="/review" component={Review} />
          <Route path="/order/:id" component={OrderDetail} />
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
