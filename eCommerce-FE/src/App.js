import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
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
import OrderHistory from "./pages/User/OrderHistory/OrderHistory";
import Profile from "./pages/User/Profile/Profile.jsx";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import AdminRoute from "./components/PrivateRoute/AdminRoute";
import AdminProduct from "./pages/Admin/ProductList/ProductList";
import CreateProduct from "./pages/Admin/ProductList/CreateProduct";
import EditProduct from "./pages/Admin/ProductList/EditProduct";

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/products/:id" component={ProductDetail} />
          <Route path="/cart" component={Cart} />
          <Route path="/signin" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/shipping" component={Shipping} />
          <Route path="/payment" component={Payment} />
          <Route path="/review" component={Review} />
          <Route path="/order/:id" component={OrderDetail} />
          <PrivateRoute path="/user/orders" component={OrderHistory} />
          <PrivateRoute path="/user/profile" component={Profile} />
          <AdminRoute path="/admin/productList" component={AdminProduct} />
          <AdminRoute path="/admin/products/create" component={CreateProduct} />
          <AdminRoute path="/products/:id/edit" component={EditProduct} />
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
