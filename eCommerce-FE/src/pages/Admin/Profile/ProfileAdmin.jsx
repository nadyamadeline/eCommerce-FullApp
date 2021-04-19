import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  userDetail,
  updateUserProfile,
} from "../../../redux/action/userAction";
import { USER_UPDATE_RESET } from "../../../redux/actionType/userTypes";

const Profile = () => {
  // get current user data
  const userInfo = useSelector((state) => state.login.user);
  const detailUser = useSelector((state) => state.userDetail.userData);
  const dispatch = useDispatch();

  // edit profile
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  //   const [isSeller, setIsSeller] = useState(false);

  const updateProfile = useSelector((state) => state.updateProfile);

  useEffect(() => {
    if (!detailUser || updateProfile.success) {
      dispatch({ type: USER_UPDATE_RESET });
      dispatch(userDetail(userInfo._id));
    } else {
      setName(detailUser.name);
      setEmail(detailUser.email);
      //   setIsSeller(detailUser.isSeller);
    }
  }, [dispatch, userInfo, detailUser, updateProfile]);

  const submitHandler = (e) => {
    e.preventDefault();
    const body = {
      userId: detailUser._id,
      name,
      email,
      password,
      //   isSeller,
    };
    if (password !== confirmPassword) {
      alert("Password does not match.");
    } else {
      dispatch(updateUserProfile(body));
    }
  };
  return (
    <div className="login">
      <form onSubmit={submitHandler}>
        <div>
          <h1>My Profile</h1>
        </div>
        {/* {updateProfile.loading ? (
          <div>
            <p>Updating...</p>
          </div>
        ) : updateProfile.error ? (
          <div>{updateProfile.error}</div>
        ) : updateProfile.success ? (
          <div>
            <p>Updated successfully!</p>
          </div>
        ) : (
          ""
        )} */}
        <div>
          <div>
            <label htmlFor="">Name</label>
            <br />
            <input
              id="name"
              type="text"
              placeholder="John Doe"
              required
              onChange={(e) => setName(e.target.value)}
              value={name}
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
              value={email}
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
          <br />
          {/* <div style={{ display: "flex", alignItems: "center" }}>
            <input
              type="checkbox"
              style={{ width: "20px" }}
              value={isSeller}
              checked={isSeller}
              onChange={(e) => setIsSeller(!isSeller)}
            />
            <label htmlFor="" style={{ marginLeft: "1rem" }}>
              Enable seller view
            </label>
          </div> */}
        </div>

        <br />

        <div style={{ display: "flex", justifyContent: "center" }}>
          <button type="submit" style={{ marginTop: "1rem" }}>
            Edit Profile
          </button>
        </div>
      </form>
    </div>
  );
};

export default Profile;
