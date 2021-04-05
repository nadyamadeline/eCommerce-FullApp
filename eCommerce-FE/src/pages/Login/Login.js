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

  console.log(location);
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
  }, [userInfo]);
  return (
    <div className="login">
      <form onSubmit={submitHandler}>
        <div>
          <h1>Sign In</h1>
        </div>
        <div>
          <div>
            <label htmlFor="">Email</label>
            <input
              type="email"
              placeholder="example@example.com"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="">Password</label>
            <input
              type="password"
              required
              placeholder="******"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
        <div>
          <button type="submit">Log In</button>
        </div>
        <div>
          <p>
            Don't have an account?
            <Link to="/register">
              <span>Sign Up</span>
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export default Login;
