import { NavLink, useNavigate, useLocation } from "react-router-dom";
import "./SharedLayoutHeader.css";
import Logo from "../images/Logo.png";
import { useState } from "react";
// import 'bootstrap/dist/css/bootstrap.css';
import Dropdown from "react-bootstrap/Dropdown";

export default function SharedLayoutHeader() {
  const navigate = useNavigate();

  return (
    <>
      <nav
        className="navbar navbar-expand-lg navbar-light bg-light fixed-top"
        style={{ backgroundColor: "red" }}
      >
        <div className="container">
          <NavLink className="navbar-brand" to="/">
            <i className="fa fa-stethoscope me" aria-hidden="true"></i>
            <span style={{ color: "greenyellow" }}>Save</span>
            <span style={{ color: "white" }}>lives</span>
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link" to="/">
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/aboutus">
                  AboutUs
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink className="nav-link" to="/post">
                  Post
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/blog">
                  Blog
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
        <Dropdown className="nav-item">
          <Dropdown.Toggle
            className="btn-info"
            style={{
              width: "100px",
              fontSize: "15px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <i
              className="fa fa-user-circle"
              aria-hidden="true"
              style={{ marginRight: "10px", fontSize: "25px" }}
            ></i>
            {/* <i class="fa fa-user-circle" aria-hidden="true"></i> */}

            {localStorage.getItem("username")
              ? localStorage.getItem("username")
              : "User"}
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item>
              <NavLink to="/yourpost">
                <i class="fa fa-address-card-o" aria-hidden="true"></i>
                <span style={{ marginLeft: "10px" }}>Your Post</span>
              </NavLink>
            </Dropdown.Item>
            <Dropdown.Item>
              <NavLink to="updateprofile">
                <i class="fa fa-lock" aria-hidden="true"></i>
                <span style={{ marginLeft: "10px" }}>Change Password</span>
              </NavLink>
            </Dropdown.Item>
            <Dropdown.Item>
              <NavLink
                onClick={() => {
                  localStorage.removeItem("jwt");
                  localStorage.removeItem("username");
                }}
                to="/login"
              >
                <i class="fa fa-sign-out" aria-hidden="true"></i>

                <span style={{ marginLeft: "10px" }}>Logout</span>
              </NavLink>
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </nav>
    </>
  );
}
// <header className="sharedHeader">
//   <section className="sharedHeader__imgContainer">
//     <img
//       className="sharedHeader__imgContainer__img"
//       src={Logo}
//       alt="Logo"
//     />
//   </section>
//   <nav className="sharedHeader__nav">
//     <NavLink className="sharedHeader__nav__navlink" to="/">
//       Home
//     </NavLink>
//     <NavLink className="sharedHeader__nav__navlink" to="/aboutus">
//       About Us
//     </NavLink>
//     <NavLink className="sharedHeader__nav__navlink" to="/contact">
//       Contact
//     </NavLink>
//     <NavLink className="sharedHeader__nav__navlink" to="/ourservice">
//       Our Service
//     </NavLink>
//     <NavLink className="sharedHeader__nav__navlink" to="/blog">
//       Blog
//     </NavLink>

//   </nav>
// </header>
