import { useState } from "react";
// import "../pagesCSS/Register.css";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  const verifyUser = async () => {
    const jwt = localStorage.getItem("jwt");
    if (!jwt || jwt.length === 0) {
      return;
    }
    const response = await axios.get(
      "http://localhost:8888/api/auth/verifyuser",
      { headers: { Authorization: `Bearer ${jwt}` } }
    );

    const { success } = response.data;
    console.log(success, "login");
    if (success) {
      navigate("/");
      return;
    }
  };
  verifyUser();

  const [problem, isProblem] = useState({ error: false, msg: "" });
  const [input, setInput] = useState({
    username: "",
    password: "",
    cPassword: "",
    moneyAmount: "",
  });

  const handleSignUp = async (e) => {
    e.preventDefault();
    const { username, password, moneyAmount, cPassword } = input;
    if (password !== cPassword) {
      isProblem({ error: true, msg: "Password does not match!" });
      return;
    } else {
      isProblem({ error: false, msg: "" });
      const amount = Number(moneyAmount);
      if (isNaN(amount)) {
        isProblem({ error: true, msg: "Invalid Money Amount" });
        return;
      }
      const response = await axios.post(
        "http://localhost:8888/api/auth/signup",
        {
          username: username,
          password: password,
          moneyAmount: amount,
        }
      );
      const { success, access_token, msg } = response.data;

      if (!success) {
        isProblem({ error: true, msg: msg });
        return;
      } else {
        localStorage.setItem("jwt", access_token);
        navigate("/", { state: { username: response.data.username } });

        return;
      }
    }
  };
  const handleChange = (e) => {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;

    setInput((prevInput) => {
      return { ...prevInput, [name]: value };
    });
  };

  return (
    <div className="d-flex vh-100 vw-100 justify-content-center align-content-center align-items-center">
      <div className="container d-flex h-75 w-100 align-items-center text-center">
        <div className="row align-items-center w-100 h-100">
          <div className="col left h-100 d-flex flex-column justify-content-center align-items-center">
            <h1>Already have an Account?</h1>

            <Link className="btn btn btn-primary m-2" to="/login">
              Login{" "}
            </Link>
          </div>
          <div className="col right h-100 w-100 d-flex justify-content-center align-items-center">
            <div className="form-group">
              <h1>Save Lives</h1>

              <form name="joinForm" id="joinForm">
                <label htmlFor="name">Username</label>
                <input
                  required
                  onChange={handleChange}
                  type="text"
                  name="username"
                  id="name"
                  className="form-control"
                />
                <label htmlFor="moneyAmount">Money Amount</label>
                <input
                  required
                  onChange={handleChange}
                  type="text"
                  name="moneyAmount"
                  id="moneyAmount"
                  className="form-control"
                />
                <label htmlFor="password">Password</label>
                <input
                  required
                  onChange={handleChange}
                  name="password"
                  id="password"
                  type="password"
                  className="form-control"
                />
                <label htmlFor="cPassword">Confirm Password</label>
                <input
                  required
                  onChange={handleChange}
                  name="cPassword"
                  id="cPassword"
                  type="password"
                  className="form-control"
                ></input>

                <button
                  type="submit"
                  value="Join"
                  id="login"
                  onClick={handleSignUp}
                  className="btn btn btn-primary m-2"
                >
                  SignUp
                </button>
                {problem.error ? (
                  <p className="text-danger">{problem.msg}</p>
                ) : null}
              </form>
              <footer className="align-self-end">
                <p style={{ backgroundColor: "white", color: "black" }}>
                  {" "}
                  2022, All Rights Reserved
                </p>
              </footer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
