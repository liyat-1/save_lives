import React from "react";
import img from "./image/propic2.jpg";
import { Link, useNavigate, NavLink, useLocation } from "react-router-dom";

export default function PatientDetail() {
  const location = useLocation();
  const navigate = useNavigate();
  const {
    username,
    age,
    condition,
    moneyAsked,
    moneyPaid,
    dueDate,
    gender,
    hospitalName,
    hospitalAccount,
  } = location.state;

  return (
    <>
      <section className="categories" id="categories">
        <div className="box-container" style={{ marginTop: "100px" }}>
          <div>
            <img src={img} style={{ width: "400px", height: "400px" }} alt="" />
          </div>

          <div className="box">
            <div
              className="btn"
              style={{
                backgroundColor: "aqua",
                marginLeft: "10px",
                borderRadius: "10px",
              }}
            >
              Name
            </div>
            <div className="btn"> {username} </div>

            <br />
            <br />
            <div
              className="btn"
              style={{
                backgroundColor: "aqua",
                marginLeft: "10px",
                borderRadius: "10px",
              }}
            >
              Age
            </div>
            <div className="btn">{age}</div>
            <br />
            <br />
            <div
              className="btn"
              style={{
                backgroundColor: "aqua",
                marginLeft: "10px",
                borderRadius: "10px",
              }}
            >
              condition
            </div>
            <div className="btn">{condition} </div>
            <br />
            <br />
            <div
              className="btn"
              style={{
                backgroundColor: "aqua",
                marginLeft: "10px",
                borderRadius: "10px",
              }}
            >
              Gender
            </div>
            <div className="btn">{gender}</div>
            <br />
            <br />
            <div
              className="btn"
              style={{
                backgroundColor: "aqua",
                marginLeft: "10px",
                borderRadius: "10px",
              }}
            >
              Money Asked
            </div>
            <div className="btn">{moneyAsked} </div>
            <br />
            <br />
            <div
              className="btn"
              style={{
                backgroundColor: "aqua",
                marginLeft: "10px",
                borderRadius: "10px",
              }}
            >
              Money Paid
            </div>
            <div className="btn">{moneyPaid} </div>
            <br />
            <br />
            <div
              className="btn"
              style={{
                backgroundColor: "aqua",
                marginLeft: "10px",
                borderRadius: "10px",
              }}
            >
              Hospital Name
            </div>
            <div className="btn">{hospitalName} </div>
            <br />
            <br />
            <div
              className="btn"
              style={{
                backgroundColor: "aqua",
                marginLeft: "10px",
                borderRadius: "10px",
              }}
            >
              Hospital Account
            </div>
            <div className="btn">{hospitalAccount} </div>
            <br />
            <br />
            <div
              className="btn"
              style={{
                backgroundColor: "aqua",
                marginLeft: "10px",
                borderRadius: "10px",
              }}
            >
              Due Date
            </div>
            <div className="btn">{dueDate}</div>
            <br />
            <br />
          </div>
        </div>
        <p style={{ textAlign: "center" }}>
          <button
            className="btn btn100 btn-success mt3"
            onClick={(e) => {
              e.preventDefault();
              navigate("/payment", { state: { username: username } });
            }}
          >
            Donate
          </button>
        </p>
      </section>
    </>
  );
}
