import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";

const SellerOrAdminRoute = ({ component: Component, ...rest }) => {
  const userLogin = useSelector((state) => state.login.user);
  //   const userDetail = useSelector((state) => state.userDetail.userData);
  return (
    <Route
      {...rest}
      render={(props) =>
        userLogin && (userLogin.isSeller || userLogin.isAdmin) ? (
          <Component {...props}></Component>
        ) : (
          <Redirect to="/signin" />
        )
      }
    ></Route>
  );
};

export default SellerOrAdminRoute;
