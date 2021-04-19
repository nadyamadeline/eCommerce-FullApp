import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";

const SellerRoute = ({ component: Component, ...rest }) => {
  const userLogin = useSelector((state) => state.login.user);
  //   const userDetail = useSelector((state) => state.userDetail.userData);
  return (
    <Route
      {...rest}
      render={(props) =>
        userLogin && userLogin.isSeller ? (
          <Component {...props}></Component>
        ) : (
          <Redirect to="/signin" />
        )
      }
    ></Route>
  );
};

export default SellerRoute;
