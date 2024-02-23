import { useState, useEffect } from "react";
import Logo from "../images/Logo.png";
import { Link, useNavigate, NavLink } from "react-router-dom";
import "../pagesCSS/Login.css";
import axios from "axios";

export default function Login() {
  const navigate = useNavigate();

  const [input, setInput] = useState({
    username: "",
    password: "",
  });
  const [problem, setProblem] = useState({ error: false, msg: "" });

  const verifyUser = async () => {
    const jwt = localStorage.getItem("jwt");

    if (!jwt) {
      navigate("/login");
      return;
    }
    if (jwt.length === 0) {
      navigate("/login");
      return;
    }

    const response = await axios.get(
      "http://localhost:8888/api/auth/verifyuser",
      { headers: { Authorization: `Bearer ${jwt}` } }
    );

    const { success } = response.data;

    if (success) {
      navigate("/");
      return;
    }
    return;
  };

  useEffect(() => {
    verifyUser();
  }, []);

  const handleChange = (e) => {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;

    setInput((prevInput) => {
      return { ...prevInput, [name]: value };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, password } = input;
    const response = await axios.post("http://localhost:8888/api/auth/login", {
      username: username,
      password: password,
    });

    const { success, msg, isAdmin, access_token } = response.data;

    if (!success) {
      setProblem({ error: true, msg: msg });
      return;
    }
    localStorage.setItem("username", response.data.username);
    localStorage.setItem("jwt", access_token);

    if (isAdmin) {
      navigate("/admin");
      return;
    }

    navigate("/");
  };

  return (
    <main className="container d-flex vh-100 vw-100 justify-content-center align-items-center">
      <div
        className="form-group d-flex flex-column w-75 h-75 justify-content-evenly align-items-center"
        style={{ maxWidth: "500px" }}
      >
        <h1>Welcome</h1>
        <i className="fa fa-user-circle" style={{ fontSize: "100px" }}></i>
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
            name="password"
            id="password"
            onChange={handleChange}
            placeholder="Password"
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
            Login
          </button>
          {problem.error ? (
            <p
              style={{ fontSize: "20px", marginTop: "5px" }}
              className="notify-err"
            >
              {problem.msg}
            </p>
          ) : null}

          <div>
            Register for new account <NavLink to="/register">Register</NavLink>
          </div>
        </form>
        <p>2022, All Rights Reserved</p>
      </div>
    </main>
  );
}

// <div className="loginContainer">
//   <section className="loginContainer__imgContainer">
//     <img src={Logo} alt="" />
//   </section>
//   <h2>Login</h2>
//   <form className="loginContainer__form">
//     <label className="loginContainer__form__label" htmlFor="userName">
//       Username:
//     </label>
//     <input
//       onChange={handleChange}
//       className="loginContainer__form__input"
//       placeholder="username"
//       type="text"
//       required
//       name="username"
//     />
//     <label className="loginContainer__form__label" htmlFor="password">
//       Password:
//     </label>
//     <input
//       onChange={handleChange}
//       className="loginContainer__form__input"
//       placeholder="password"
//       type="password"
//       required
//       name="password"
//     />
//     <button
//       onClick={handleSubmit}
//       className="loginContainer__form__button"
//       type="submt"
//     >
//       Login
//     </button>
//   </form>

//   <p>
//     Don't have an account?
//     <Link to="/register">Register </Link>
//   </p>
//   {problem.error ? <p className="notify-err">{problem.msg}</p> : null}
// </div>
