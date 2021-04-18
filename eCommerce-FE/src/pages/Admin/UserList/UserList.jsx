import React, { useEffect } from "react";
import { userList, deleteUser } from "../../../redux/action/adminAction";
import { useDispatch, useSelector } from "react-redux";
import { USER_DELETE_RESET } from "../../../redux/actionType/adminTypes";
import { Link } from "react-router-dom";

const UserList = () => {
  const listUser = useSelector((state) => state.userList);
  const users = listUser.user;
  const userDelete = useSelector((state) => state.deleteUser);
  const dispatch = useDispatch();
  useEffect(() => {
    if (userDelete.success) {
      dispatch({ type: USER_DELETE_RESET });
    }
    dispatch(userList());
  }, [dispatch, userDelete]);

  const deleteUserHandler = (id) => {
    if (window.confirm("Are you sure to delete?")) {
      dispatch(deleteUser(id));
    }
  };
  return (
    <div className="order-history">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1>Users</h1>
        <Link to={`/admin/users/create`}>
          <button className="createProduct-btn">Create Admin</button>
        </Link>
      </div>
      {listUser.loading ? (
        <p>Loading...</p>
      ) : listUser.error ? (
        <p>{listUser.error}</p>
      ) : (
        <div>
          <table>
            <thead>
              <tr>
                <th>User ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>User Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users &&
                users.map((user, index) => (
                  <tr key={index}>
                    <td>
                      {/* <Link
                        to={`/order/${user._id}`}
                        style={{
                          fontWeight: 600,
                          color: "#4c4036",
                        }}
                      > */}
                      {user._id}
                      {/* </Link> */}
                    </td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>
                      {user.isAdmin ? (
                        <p>Admin</p>
                      ) : user.isSeller ? (
                        <p>Seller &amp; User</p>
                      ) : (
                        <p>User</p>
                      )}
                    </td>
                    <td>
                      <div>
                        {/* <Link to={`/user/${user._id}/edit`}>
                          <button style={{ marginRight: "0.5rem" }}>
                            Edit
                          </button>
                        </Link> */}

                        <button onClick={() => deleteUserHandler(user._id)}>
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UserList;
