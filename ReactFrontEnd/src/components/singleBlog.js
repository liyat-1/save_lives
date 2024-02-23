import React from "react";
// import "./singleblog.css";
export default function SingleBlog(prop) {
  const { username, comment } = prop.prop;

  return (
    <div className="card p-3">
      <div className="d-flex justify-content-between align-items-center">
        <div className="user d-flex flex-row align-items-center">
          <i
            className="fa fa-user-circle"
            aria-hidden="true"
            style={{ marginRight: "5px", fontSize: "25px" }}
          ></i>
          <small className="font-weight-bold text-primary">{username}</small>
          <span
            style={{
              display: "flex",
              justifyContent: "center",
              marginLeft: "10px",
              textDecoration: "italic",
            }}
          >
            <small className="font-weight-bold">
              <i>{comment}</i>
            </small>
          </span>
        </div>
      </div>
    </div>
  );
}
