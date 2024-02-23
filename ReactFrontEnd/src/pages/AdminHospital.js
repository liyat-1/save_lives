import React from "react";

export default function AdminHospital({ prop }) {
  const { username, moneyPaid, hospitalName, hospitalAccount } = prop;

  return (
    <>
      <tr>
        <td>{username}</td>
        <td>{hospitalName}</td>
        <td>{hospitalAccount}</td>

        <td>{moneyPaid}</td>
      </tr>
    </>
  );
}
