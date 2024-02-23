import { useState } from "react";
import { Navigate, useNavigate, useLocation, NavLink } from "react-router-dom";
import axios from "axios";
export default function PostPage() {
  const [input, setInput] = useState({
    username: "",
    age: "",
    dueDate: "",
    gender: "",
    moneyAsked: "",
    disease: "",
    hospitalName: "",
    hospitalAccount: "",
    city: "",
    subcity: "",
    woreda: "",
    kebele: "",
    pnumber: "",
    lfk: "",
    lfh: "",
    scode: "",
    message: "",
  });
  const [error, setError] = useState({ error: false, msg: "" });

  const handleClick = async (e) => {
    e.preventDefault();
    const jwt = localStorage.getItem("jwt");
    const {
      username,
      age,
      dueDate,
      gender,
      moneyAsked,
      disease,
      hospitalAccount,
      hospitalName,
      city,
      woreda,
      pnumber,
      lfk,
      lfh,
      scode,
      message,
    } = input;

    if (!city || !woreda || !pnumber || !lfk || !lfh || !scode || !message) {
      setError({ error: true, msg: "Invalid Input detected!" });
      return;
    }
    if (!Number(moneyAsked)) {
      setError({ error: true, msg: "Invalid money amount!" });
      return;
    }
    const response = await axios.post(
      "http://localhost:8888/api/user/post",
      {
        username: username,
        age: age,
        dueDate: dueDate,
        gender: gender,
        moneyAsked: moneyAsked,
        disease: disease,
        hospitalAccount: hospitalAccount,
        hospitalName: hospitalName,
      },
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    );
    const { success, post, msg } = response.data;

    if (!success) {
      setError({ error: true, msg: msg });
      return;
    } else {
      setError({ error: true, msg: "Successfuly posted!" });
      return;
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
    <>
      <section style={{ marginTop: "100px" }}>
        <div className="container shadow ">
          <div className="row ms-5">
            <div className="col">
              <div className="col mt-5">
                <h3 style={{ color: "chartreuse" }}>Personal information</h3>
                <div className="form-group">
                  <label htmlFor="fnam">Username</label>
                  <input
                    type="fnam"
                    className="form-control mb-4"
                    id="fnam"
                    name="username"
                    onChange={handleChange}
                    minLength="2"
                    maxLength="15"
                    style={{ width: "280px" }}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="sex">Sex:</label>
                  <select onChange={handleChange} name="gender" required>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                  <div className="form-group">
                    <label htmlFor="age">Age:</label>
                    <input
                      type="number"
                      className="form-control mb-4"
                      id="age"
                      placeholder="21"
                      onChange={handleChange}
                      name="age"
                      style={{ width: "100px" }}
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <h3 style={{ color: "chartreuse" }}>Address</h3>
                  <div className="form-group">
                    <label htmlFor="region">Region/City:</label>
                    <input
                      type="text"
                      className="form-control mb-4"
                      id="region"
                      minLength="2"
                      placeholder="Addis Ababa"
                      name="city"
                      onChange={handleChange}
                      style={{ width: "200px" }}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="subcity">Subcity:</label>
                    <input
                      type="text"
                      className="form-control mb-4"
                      id="subcity"
                      onChange={handleChange}
                      minLength="2"
                      placeholder="Arada"
                      name="subcity"
                      style={{ width: "200px" }}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="woreda">Woreda:</label>
                    <input
                      type="text"
                      className="form-control mb-4"
                      id="woreda"
                      placeholder="your woreda"
                      name="woreda"
                      onChange={handleChange}
                      style={{ width: "200px" }}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="kebele">Kebele:</label>
                    <input
                      type="kebele"
                      className="form-control mb-4"
                      id="kebele"
                      placeholder="your kebele"
                      name="kebele"
                      onChange={handleChange}
                      style={{ width: "200px" }}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="pnumber">Phone Number:</label>
                    <input
                      type="tel"
                      pattern="[0-9]{2}-[0-9]{2}-[0-9]{2}-[0,9]{2}-[0,9]{2} "
                      placeholder="09-00-00-77-45"
                      className="form-control mb-4"
                      id="pnumber"
                      name="pnumber"
                      onChange={handleChange}
                      style={{ width: "300px" }}
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="col" style={{ marginTop: "3%" }}>
              <h3 style={{ color: "chartreuse" }}>
                Validation Letters
                <span style={{ color: "black" }}>(Attach files)</span>
              </h3>
              <div className="form-group">
                <label htmlFor="lfk" required>
                  Letter from kebele:
                </label>
                <input
                  type="file"
                  className="form-control mb-4"
                  id="lfk"
                  name="lfk"
                  onChange={handleChange}
                  style={{ width: "500px" }}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="lfh" required>
                  Letter from hospital:
                </label>
                <input
                  type="file"
                  className="form-control mb-4"
                  id="lfh"
                  onChange={handleChange}
                  name="lfh"
                  style={{ width: "500px" }}
                  required
                />
              </div>
              <br />
              <br />
              <h3 style={{ color: "chartreuse" }}>Other medical information</h3>

              <div className="form-group">
                <label htmlFor="Disease">Disease:</label>
                <input
                  type="text"
                  className="form-control mb-4"
                  id="disease"
                  name="disease"
                  onChange={handleChange}
                  style={{ width: "500px" }}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="hospital">Name of refferal hospital:</label>
                <input
                  type="text"
                  className="form-control mb-4"
                  id="noh"
                  onChange={handleChange}
                  name="hospitalName"
                  style={{ width: "500px" }}
                  required
                />
                <div className="form-group ms-5">
                  <label htmlFor="hospitalAC">
                    Hospital's CBE bank account number
                  </label>
                  <input
                    type="text"
                    className="form-control mb-4"
                    id="acc"
                    onChange={handleChange}
                    minLength="10"
                    maxLength="15"
                    name="hospitalAccount"
                    style={{ width: "200px" }}
                    required
                  />
                  <label htmlFor="hospitalSc">Hospital's CBE shortcode</label>
                  <input
                    type="number"
                    className="form-control mb-4"
                    id="scode"
                    minLength="4"
                    maxLength="6"
                    name="scode"
                    onChange={handleChange}
                    style={{ width: "200px" }}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="money">
                    Amount of money asked for treatment:
                  </label>
                  <input
                    type="text"
                    className="form-control mb-4"
                    id="money"
                    onChange={handleChange}
                    minLength="4"
                    maxLength="13"
                    name="moneyAsked"
                    style={{ width: "200px" }}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="date">Due date for the treatment:</label>
                  <input
                    type="date"
                    className="form-control mb-4"
                    id="date"
                    name="dueDate"
                    onChange={handleChange}
                    style={{ width: "200px" }}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="floatingTextarea">
                    Anything you want to say:
                  </label>
                  <textarea
                    className="form-control"
                    minLength="30"
                    maxLength="500"
                    id="floatingTextarea"
                    name="message"
                    onChange={handleChange}
                    style={{ width: "500px", height: "200px" }}
                  ></textarea>
                </div>
                <section
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                  }}
                >
                  <button
                    type="submit"
                    value="Submit"
                    onClick={handleClick}
                    className="mt-5 btn btn-success w-25"
                  >
                    Submit
                  </button>
                  {error.error ? (
                    <span style={{ color: "red" }}> {error.msg}</span>
                  ) : null}
                </section>
              </div>
            </div>
          </div>
        </div>
      </section>
      <footer className="footer">
        <div className="container__footer container__flex">
          <div id="footer-links">
            <ul id="footer__linkList">
              <li className="footer__links">
                <NavLink to="/aboutus">About</NavLink>
              </li>

              <li className="footer__links">
                <NavLink to="/contact">Contact</NavLink>
              </li>
              <li className="footer__links">
                <NavLink to="/blog">Blog</NavLink>
              </li>
              <li className="footer__links">
                <NavLink to="/ourserivce">service</NavLink>
              </li>
            </ul>
          </div>
          <div id="footer-contact">
            <ul id="footer__contact">
              <li className="contact__list">contact</li>
              <li className="contact__list">+2519878378</li>
              <li className="contact__list">+2519878378</li>
              <li className="contact__list">+2519878378</li>
            </ul>
          </div>
          <div id="footer-logo">
            <div>
              <div id="footer-image-name">
                <h1 id="footer__logo__header1">
                  <i className="fa fa-stethoscope"></i>
                  <span style={{ color: "greenyellow" }}>Save</span>
                  <span style={{ color: "white" }}>lives</span>
                </h1>
              </div>
              <div id="footer-socials">
                <h2 id="footer__socials__header2">Follow Us On</h2>
                <div>
                  <ul id="footer__socials__list">
                    <li className="footer__social__links">
                      <a href="#" className="instagram">
                        <i
                          className="fa-brands fa-instagram"
                          style={{ paddingRight: "10px", fontSize: "40px" }}
                        ></i>
                        <br />
                        instagram
                      </a>
                    </li>
                    <li className="footer__social__links">
                      <a href="#" className="facebook">
                        <i
                          className="fa-brands fa-facebook"
                          style={{ paddingRight: "10px", fontSize: "40px" }}
                        ></i>
                        <br />
                        facebook
                      </a>
                    </li>
                    <li className="footer__social__links">
                      <a href="#" className="twitter">
                        <i
                          className="fa-brands fa-twitter"
                          style={{ paddingRight: "10px", fontSize: "40px" }}
                        ></i>
                        <br />
                        twitter
                      </a>
                    </li>
                    <li className="footer__social__links">
                      <a href="#" className="linkedin">
                        <i
                          className="fa-brands fa-linkedin"
                          style={{ paddingRight: "10px", fontSize: "40px" }}
                        ></i>
                        <br />
                        linkedin
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <p className="footer__text">
          <i className="bi bi-c-circle me-2"></i>All Rights reserved save lives
        </p>
      </footer>
    </>
  );
}
