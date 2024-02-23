import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
export default function UpDateProfile() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    username: "",
    oldPassword: "",
    newPassword: "",
  });
  const [error, setError] = useState({ problem: false, msg: "" });
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setUser((prevUser) => {
      return { ...prevUser, [name]: value };
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const jwt = localStorage.getItem("jwt");
    const { username, oldPassword, newPassword } = user;
    // console.log(!username, !oldPassword, !newPassword);
    if (!username || !oldPassword || !newPassword) {
      setError({ problem: true, msg: "Invalid Input" });
      return;
    }
    const response = await axios.patch(
      `http://localhost:8888/api/user/${username}`,
      {
        oldPassword: oldPassword,
        newPassword: newPassword,
      },
      { headers: { Authorization: `Bearer ${jwt}` } }
    );

    const { success, msg } = response.data;
    if (!success) {
      setError({ problem: true, msg: msg });
      return;
    } else {
      setError({ problem: true, msg: "Successfully Updated!" });
    }
    return;
  };
  return (
    <>
      <section
        style={{
          marginTop: "100px",
          marginLeft: "100px",

          fontSize: "40px",
        }}
      >
        Change Password
      </section>
      <main className="container d-flex  vw-100 justify-content-center ">
        <div
          className="form-group d-flex flex-column w-75  align-items-center"
          style={{
            maxWidth: "500px",
            marginTop: "200px",
          }}
        >
          <form
            id="loginForm"
            name="loginForm"
            className="d-flex flex-column w-75 justify-content-evenly align-content-center align-items-center"
          >
            <input
              name="username"
              id="email"
              placeholder="username"
              type="text"
              onChange={handleChange}
              required
              className="form-control m-2"
            />
            <input
              name="oldPassword"
              onChange={handleChange}
              placeholder="Old Password"
              type="password"
              required
              className="form-control m-2"
            />
            <input
              name="newPassword"
              onChange={handleChange}
              placeholder="New Password"
              type="password"
              required
              className="form-control m-2"
            />
            <button
              type="submit"
              value="Login"
              onClick={handleSubmit}
              id="login"
              className="btn btn-primary"
            >
              Update
            </button>
            {error.problem ? (
              <p
                style={{ fontSize: "20px", marginTop: "5px" }}
                className="notify-err"
              >
                {error.msg}
              </p>
            ) : null}
          </form>
        </div>
      </main>
    </>
  );
}
