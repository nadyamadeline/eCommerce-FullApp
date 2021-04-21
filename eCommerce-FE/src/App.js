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
import OrderList from "./pages/Admin/OrderList/OrderList";
import UserList from "./pages/Admin/UserList/UserList";
import CreateAdmin from "./pages/Admin/UserList/CreateAdmin";
import ProfileAdmin from "./pages/Admin/Profile/ProfileAdmin";
import SellerRoute from "./components/PrivateRoute/SellerRoute";
import Seller from "./pages/Seller/Seller";
import SellerOrAdminRoute from "./components/PrivateRoute/SellerOrAdminRoute";
import PublicSeller from "./pages/Seller/PublicSeller";
import Search from "./pages/Search/Search";

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/search/:name?" component={Search} />
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
          <SellerOrAdminRoute
            path="/products/create"
            component={CreateProduct}
          />
          <AdminRoute path="/admin/orderList" component={OrderList} />
          <AdminRoute path="/admin/userList" component={UserList} />
          <AdminRoute path="/admin/create" component={CreateAdmin} />
          <AdminRoute path="/admin/profile" component={ProfileAdmin} />
          <SellerRoute exact path="/seller/products" component={AdminProduct} />
          <SellerRoute path="/seller/orders" component={OrderList} />
          <SellerRoute
            path="/seller/products/create"
            component={CreateProduct}
          />
          <SellerRoute path="/seller/profile/:id" component={Seller} />
          <Route exact path="/seller/:id" component={PublicSeller} />
          <Route exact path="/products/:id" component={ProductDetail} />
          <SellerOrAdminRoute
            path="/products/:id/edit"
            component={EditProduct}
          />
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
