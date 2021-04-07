import React, { useEffect, useState } from "react";
import "./Login.scss";
import { Link, useHistory, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/action/loginAction";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const location = useLocation();
  const redirect = location.search ? location.search.split("=")[1] : "/";
  const userInfo = useSelector((state) => state.login.user);
  const errorMsg = useSelector((state) => state.login.error);

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    const body = { email, password };
    dispatch(login(body));
  };

  const history = useHistory();
  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [userInfo, history, redirect]);

  return (
    <div className="login">
      <form onSubmit={submitHandler}>
        <div>
          <h1>Log In</h1>
        </div>
        <div>
          <div>
            <label htmlFor="">Email</label>
            <br />
            <input
              type="email"
              placeholder="example@example.com"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div style={{ marginTop: "2rem" }}>
            <label htmlFor="">Password</label>
            <br />
            <input
              type="password"
              required
              placeholder="******"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
        <br />
        {errorMsg ? (
          <div className="danger-bg">
            <p className="col-danger">{errorMsg}</p>
          </div>
        ) : (
          ""
        )}
        <div>
          <button type="submit" style={{ marginTop: "1rem" }}>
            Log In
          </button>
        </div>
        <div style={{ marginTop: "1rem" }} className="login-register">
          <p style={{ fontFamily: "Montserrat" }}>
            New to Canopy &amp; Co?{" "}
            <Link to="/register" style={{ textDecoration: "none" }}>
              <span>Sign Up</span>
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export default Login;
