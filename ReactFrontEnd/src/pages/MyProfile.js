import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
export default function MyProfile() {
  const navigate = useNavigate();
  return (
    <>
      <section style={{ marginTop: "100px" }}>
        <button
          style={{ marginLeft: "100px" }}
          onClick={() => {
            navigate("/updateprofile");
          }}
          className="btn btn-primary "
        >
          Update Profile
        </button>
        <button
          style={{ marginLeft: "100px" }}
          onClick={() => {
            navigate("/yourpost");
          }}
          className="btn btn-primary "
        >
          Your Post
        </button>
      </section>
    </>
  );
}
