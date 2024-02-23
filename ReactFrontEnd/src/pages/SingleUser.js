import { useState } from "react";
import axios from "axios";
export default function SingleUser({ prop, status }) {
  const [Status, setStatus] = useState(status);
  const [undo, isUndo] = useState(false);
  const [error, setError] = useState({ truth: false, msg: "" });

  const handleUnBan = async () => {
    const truth = window.confirm(`Are you sure you want to Unban ${prop}?`);

    if (!truth) {
      return;
    }
    const jwt = localStorage.getItem("jwt");
    if (!jwt) {
      return;
    }
    if (!prop) {
      return;
    }
    const response = await axios.get(
      `http://localhost:8888/api/admin/users/${prop}`,
      { headers: { Authorization: `Bearer ${jwt}` } }
    );
    const { success, msg } = response.data;

    if (!success) {
      setError({ truth: true, msg: msg });
      return;
    }

    isUndo(false);
  };
  const handleRemove = async () => {
    const truth = window.confirm(`Are you sure you want to ban ${prop}?`);

    if (!truth) {
      return;
    }
    const jwt = localStorage.getItem("jwt");
    if (!prop) {
      return;
    }
    const response = await axios.delete(
      `http://localhost:8888/api/admin/users/${prop}`,
      { headers: { Authorization: `Bearer ${jwt}` } }
    );
    const { success, msg } = response.data;

    if (!success) {
      setError({ truth: true, msg: msg });
      return;
    }
    isUndo(true);
  };
  return (
    <>
      <tr>
        <td>{prop}</td>
        <td>{!undo ? Status : "Banned"}</td>

        <td>
          {undo ? (
            <button
              type="button"
              onClick={handleUnBan}
              className="btn btn-danger"
            >
              Unban Account
            </button>
          ) : (
            <button
              type="button"
              onClick={handleRemove}
              className="btn btn-danger"
            >
              Ban Account
            </button>
          )}
          <div style={{ color: "red" }}>{error.truth ? error.msg : null}</div>
        </td>
      </tr>
    </>
  );
}
