import { useState } from "react";
import axios from "axios";
export default function SingleAdminBlog({ prop }) {
  const { username, comment } = prop;
  const [deleted, setDelete] = useState(false);
  const handleTakeDown = async () => {
    const truth = window.confirm(
      `Are you sure you want to remove ${username}'s blog?`
    );

    if (!truth) {
      return;
    }
    const jwt = localStorage.getItem("jwt");
    const response = await axios.delete(
      `http://localhost:8888/api/blogs/${username}`,
      {
        headers: { Authorization: `Bearer ${jwt}` },
      }
    );
    const { success } = response.data;
    if (!success) {
      return;
    }
    setDelete(true);
  };
  return (
    <>
      {!deleted ? (
        <div className="card p-3">
          <div className="d-flex justify-content-between align-items-center">
            <div className="user d-flex flex-row align-items-center">
              <i
                className="fa fa-user-circle"
                aria-hidden="true"
                style={{
                  marginRight: "5px",
                  fontSize: "25px",

                  cursor: "pointer",
                }}
              ></i>
              <span>
                <small
                  className="font-weight-bold text-primary"
                  style={{ marginRight: "10px" }}
                >
                  {username}
                </small>
                <small className="font-weight-bold">{comment}</small>
              </span>
            </div>
          </div>

          <div className="action d-flex justify-content-between mt-2 align-items-center">
            <div className="reply px-4">
              <button
                className="takedown"
                onClick={handleTakeDown}
                style={{ width: "100px" }}
              >
                Take Down
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
