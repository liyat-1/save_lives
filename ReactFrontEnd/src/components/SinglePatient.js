import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

import patient3 from "../pages/images/patient3.jpg";
export default function SinglePatient({ post }) {
  const navigate = useNavigate();

  return (
    <>
      <div className="card col me-5">
        <img className="card-img-top" src={patient3} />
        <div className="card-body">
          <div className="d-block">
            <div className="d-inline">
              <label style={{ padding: "5px", borderRadius: "10px" }}>
                Name:
              </label>
              <label>{post.username}</label>
            </div>
          </div>

          <div className="d-block">
            <div className="d-inline">
              <label style={{ padding: "5px", borderRadius: "10px" }}>
                Condition:
              </label>
              <label>{post.disease}</label>
            </div>
          </div>

          <div className="d-block">
            <div className="d-inline">
              <label style={{ padding: "5px", borderRadius: "10px" }}>
                Due Date:
              </label>
              <label>{post.dueDate}</label>
            </div>
          </div>

          <button
            onClick={() => {
              navigate("/patientdetail", {
                state: {
                  username: post.username,
                  age: post.age,
                  condition: post.disease,
                  moneyAsked: post.moneyAsked,
                  moneyPaid: post.paidAmount,
                  dueDate: post.dueDate,
                  gender: post.gender,
                  hospitalName: post.hospitalName,
                  hospitalAccount: post.hospitalAccount,
                },
              });
            }}
            className="btn btn-primary rounded-pill"
          >
            Details
          </button>
        </div>
      </div>
    </>
  );
}
