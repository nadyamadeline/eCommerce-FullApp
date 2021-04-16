import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const userLogin = useSelector((state) => state.login.user);
  return (
    <Route
      {...rest}
      render={(props) =>
        userLogin ? (
          <Component {...props}></Component>
        ) : (
          <Redirect to="/signin" />
        )
      }
    ></Route>
  );
};

export default PrivateRoute;
