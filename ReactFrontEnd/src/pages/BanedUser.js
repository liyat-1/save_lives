import { useState } from "react";
import axios from "axios";
export default function BanedUser(post) {
  const { prop, status, secondStatus } = post;
  const [undo, isUndo] = useState(false);
  const [error, setError] = useState({ truth: false, msg: "" });
  const handleUnBan = async () => {
    const truth = window.confirm(
      `Are you sure you want to Unban ${prop.username}?`
    );

    if (!truth) {
      return;
    }
    const jwt = localStorage.getItem("jwt");
    if (!jwt) {
      return;
    }
    if (!prop.username) {
      return;
    }
    const response = await axios.get(
      `http://localhost:8888/api/admin/users/${prop.username}`,
      { headers: { Authorization: `Bearer ${jwt}` } }
    );
    const { success, msg } = response.data;

    if (!success) {
      setError({ truth: true, msg: msg });
      return;
    }
    isUndo(true);
  };
  const handleRemove = async () => {
    const truth = window.confirm(
      `Are you sure you want to ban ${prop.username}?`
    );

    if (!truth) {
      return;
    }
    const jwt = localStorage.getItem("jwt");
    if (!prop.username) {
      return;
    }
    const response = await axios.delete(
      `http://localhost:8888/api/admin/users/${prop.username}`,
      { headers: { Authorization: `Bearer ${jwt}` } }
    );
    const { success, msg } = response.data;

    if (!success) {
      setError({ truth: true, msg: msg });
      return;
    }
    isUndo(false);
  };
  return (
    <>
      <tr>
        <td>{prop.username}</td>
        <td>{!undo ? status : secondStatus}</td>

        <td>
          {!undo ? (
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
