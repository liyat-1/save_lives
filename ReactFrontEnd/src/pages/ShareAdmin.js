import React from "react";
import SharedAdminLayer from "./SharedAdminLayer";
import { Outlet, NavLink, useNavigate } from "react-router-dom";

export default function ShareAdmin() {
  return (
    <div style={{ display: "flex" }}>
      <SharedAdminLayer />
      <Outlet />
    </div>
  );
}
