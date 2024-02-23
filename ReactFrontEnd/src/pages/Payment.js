import { useState } from "react";
import card1 from "./image/card1.png";
import card2 from "./image/card2.png";
import cbe from "./image/cbe.png";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import paypal from "./image/paypal.webp";
import axios from "axios";
export default function Payment() {
  const location = useLocation();
  const navigate = useNavigate();
  const { username } = location.state;
  const [error, isError] = useState({ msg: "", error: false });

  const [money, setMoney] = useState("");
  const payment = async (e) => {
    e.preventDefault();
    const jwt = localStorage.getItem("jwt");

    const response = await axios.patch(
      `http://localhost:8888/api/user//post/${username}`,
      { money: Number(money.money) },
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    );

    const { success, msg } = response.data;
    if (!success) {
      isError({ msg: msg, error: true });
    } else {
      isError({ msg: "Donated", error: true });
    }
  };
  const handleChange = (e) => {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;

    setMoney((prevInput) => {
      return { ...prevInput, [name]: value };
    });
  };

  return (
    <>
      <div className="containe">
        <form action="">
          <div className="row">
            <div className="col">
              <h3 className="title">DONOR ADDRESS</h3>

              <div className="inputBox">
                <span>Full Name </span>
                <input required type="text" placeholder="Full Name" />
              </div>
              <div className="inputBox">
                <span>Email</span>
                <input
                  required
                  type="email"
                  placeholder="example@example.com"
                />
              </div>
              <div className="inputBox">
                <span>Address</span>
                <input required type="text" placeholder=" street - locality" />
              </div>
              <div className="inputBox">
                <span>City</span>
                <input required type="text" placeholder="City" />
              </div>

              <div className="flex">
                <div className="inputBox">
                  <span>State</span>
                  <input required type="text" placeholder="Ethiopia" />
                </div>
                <div className="inputBox">
                  <span>zip code</span>
                  <input required type="text" placeholder="0000" />
                </div>
              </div>
            </div>

            <div className="col">
              <h3 className="title">PAYMENT</h3>

              <div className="inputBox">
                <span>Cards Accepted </span>
                <img src={card1} alt="" style={{ width: "12rem" }} />
                <img
                  src={paypal}
                  alt=""
                  style={{ width: "5.5rem", height: "3.7rem" }}
                />
                <img
                  src={card2}
                  alt=""
                  style={{ width: "5.5rem", height: "3.7rem" }}
                />
                <img
                  src={cbe}
                  alt=""
                  style={{ width: "5.5rem", height: "3.7rem" }}
                />
              </div>
              <div className="inputBox">
                <span>Name On Card </span>
                <input required ype="text" placeholder="Name" />
              </div>
              <div className="inputBox">
                <span>Credit Card Number </span>
                <input required type="text" placeholder="Card Number" />
              </div>
              <div className="inputBox">
                <span>Exp Month </span>
                <input required type="text" placeholder="Month" />
              </div>

              <div className="flex">
                <div className="inputBox">
                  <span>Exp Year </span>
                  <input required type="text" placeholder="Year" />
                </div>
                <div className="inputBox">
                  <span>CVV </span>
                  <input required type="text" placeholder="0000" />
                </div>
                <div className="inputBox">
                  <span>Amount</span>
                  <input
                    onChange={handleChange}
                    name="money"
                    ype="text"
                    placeholder="ETB"
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          <div
            style={{
              textAlign: "center",
              display: "flex",
              gap: "10px",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <section
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "20px",
              }}
            >
              <button
                type="submit"
                onClick={(e) => {
                  e.preventDefault();
                  navigate(-1);
                }}
                className="btn btn100 btn-success mt3"
                style={{ borderRadius: "20px" }}
              >
                Back
              </button>
              <button
                type="submit"
                onClick={payment}
                className="btn btn100 btn-success mt3"
                style={{ borderRadius: "20px" }}
              >
                Donate
              </button>
            </section>
            <div style={{ color: "red", marginLeft: "10px" }}>
              {error ? error.msg : null}
            </div>
          </div>
        </form>
      </div>
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
