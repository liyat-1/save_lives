import { useState } from "react";
import axios from "axios";
export default function ApprovedRow({ prop }) {
  const {
    age,
    username,
    disease,
    dueDate,
    gender,
    moneyAsked,
    paidAmount,
    hospitalName,
    hospitalAccount,
  } = prop;

  const [deleted, isDeleted] = useState(false);
  const [error, setError] = useState({ truth: false, msg: "" });
  const handleRemove = async () => {
    const truth = window.confirm(
      `Are you sure you want to remove ${username}'s post?`
    );

    if (!truth) {
      return;
    }
    const jwt = localStorage.getItem("jwt");

    const response = await axios.delete(
      `http://localhost:8888/api/admin/verifedposts/${username}`,
      { headers: { Authorization: `Bearer ${jwt}` } }
    );
    const { success, msg } = response.data;
    if (!success) {
      setError({ truth: true, msg: msg });
      return;
    }
    isDeleted(true);
  };

  const handlePayment = async () => {
    const truth = window.confirm(
      `Are you sure to forward the payment for ${username}'s post?`
    );

    if (!truth) {
      return;
    }
    const jwt = localStorage.getItem("jwt");
    if (Number(moneyAsked) !== Number(paidAmount)) {
      setError({ truth: true, msg: "Goal has not been reached!" });
      return;
    }
    const response = await axios.post(
      `http://localhost:8888/api/admin/verifedposts/${username}`,
      {
        username: username,
        hospitalAccount: hospitalAccount,
        hospitalName: hospitalName,
        moneyPaid: paidAmount,
      },
      { headers: { Authorization: `Bearer ${jwt}` } }
    );
    const { success, msg } = response.data;

    if (!success) {
      setError({ truth: true, msg: msg });
      return;
    }
    isDeleted(true);
  };
  return (
    <>
      {deleted ? null : (
        <tr>
          <td>{username}</td>
          <td>{age}</td>
          <td>{gender}</td>
          <td>{disease}</td>
          <td>{moneyAsked}</td>
          <td>{paidAmount}</td>
          <td>{hospitalName}</td>
          <td>{hospitalAccount}</td>

          <td>{dueDate}</td>
          <td>
            <button
              type="button"
              className="btn btn-success"
              style={{ marginRight: "10px" }}
              onClick={handlePayment}
            >
              Forward Payment
            </button>
            <button
              type="button"
              onClick={handleRemove}
              className="btn btn-danger"
            >
              Remove
            </button>
            <div style={{ color: "red" }}>{error.truth ? error.msg : null}</div>
          </td>
        </tr>
      )}
    </>
  );
}
