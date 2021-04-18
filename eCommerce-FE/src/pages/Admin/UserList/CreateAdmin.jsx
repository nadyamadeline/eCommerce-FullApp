import React, { useState, useEffect } from "react";
import { createAdmin } from "../../../redux/action/adminAction";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const CreateAdmin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    const body = { name, email, password };
    if (password !== confirmPassword) {
      alert("Password does not match.");
    } else {
      dispatch(createAdmin(body));
    }
  };
  const adminCreate = useSelector((state) => state.createAdmin);
  const history = useHistory();
  useEffect(() => {
    if (adminCreate.success) {
      history.push("/admin/userList");
    }
  }, [history, adminCreate]);
  return (
    <div className="createProduct">
      <form onSubmit={submitHandler}>
        <div>
          <h1>Create Admin</h1>
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
        {/* {errorMsg ? (
          <div className="danger-bg">
            <p className="col-danger">{errorMsg}</p>
          </div>
        ) : (
          ""
        )} */}
        <div>
          <button type="submit" style={{ marginTop: "1rem" }}>
            Create Admin
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateAdmin;
