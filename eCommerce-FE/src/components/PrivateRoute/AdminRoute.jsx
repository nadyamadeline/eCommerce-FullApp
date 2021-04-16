import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";

const AdminRoute = ({ component: Component, ...rest }) => {
  const userLogin = useSelector((state) => state.login.user);
  return (
    <Route
      {...rest}
      render={(props) =>
        userLogin && userLogin.isAdmin ? (
          <Component {...props}></Component>
        ) : (
          <Redirect to="/signin" />
        )
      }
    ></Route>
  );
};

export default AdminRoute;
