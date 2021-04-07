import React, { useEffect, useState } from "react";
import "../Login/Login.scss";
import { Link, useHistory, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../redux/action/loginAction";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const location = useLocation();
  const redirect = location.search ? location.search.split("=")[1] : "/";
  const userInfo = useSelector((state) => state.login.user);
  const errorMsg = useSelector((state) => state.login.error);

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    const body = { name, email, password };
    if (password !== confirmPassword) {
      alert("Password does not match.");
    } else {
      dispatch(register(body));
    }
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
          <h1>Register</h1>
        </div>
        <div>
          <div>
            <label htmlFor="">Name</label>
            <br />
            <input
              type="text"
              placeholder="John Doe"
              required
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div style={{ marginTop: "1rem" }}>
            <label htmlFor="">Email</label>
            <br />
            <input
              type="email"
              placeholder="example@example.com"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div style={{ marginTop: "1rem" }}>
            <label htmlFor="">Password</label>
            <br />
            <input
              type="password"
              required
              placeholder="******"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div style={{ marginTop: "1rem" }}>
            <label htmlFor="">Confirm Password</label>
            <br />
            <input
              type="password"
              required
              placeholder="******"
              onChange={(e) => setConfirmPassword(e.target.value)}
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
            Register
          </button>
        </div>
        <div style={{ marginTop: "1rem" }} className="login-register">
          <p style={{ fontFamily: "Montserrat" }}>
            Have an account?{" "}
            <Link
              to={`/signin?redirect=${redirect}`}
              style={{ textDecoration: "none" }}
            >
              <span>Log In</span>
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export default Register;
