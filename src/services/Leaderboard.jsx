import axios from "axios";
import React, { useState } from "react";

export default function Leaderboard() {
  const [userData, setUserData] = useState([]);
  const token = localStorage.getItem("token");

  function getLeaderBoards() {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: "https://friendly-goat-kerchief.cyclic.app/premium/showLeaderBoard",
      headers: { Authorization: token },
    };

    axios
      .request(config)
      .then((response) => {
        setUserData(response.data);
        console.log(userData);
      })
      .catch((error) => {
        alert("Failed to fetch expenses");
        console.log(error);
      });
  }

  return (
    <section>
      <table className="table mx-5" style={{ width: "92%" }}>
        <thead className="table-dark">
          <tr>
            <th className="col">ID</th>
            <th className="col">Name</th>
            <th className="col">Total Expense</th>
          </tr>
        </thead>
        <button
          className="btn btn-dark btn btn-sm m-1"
          onClick={getLeaderBoards}
        >
          Show
        </button>
        <tbody>
          {userData.map((d) => (
            <tr>
              <td>{d.id}</td>
              <td>{d.name}</td>

              <td>
                ₹
                {d.totalExpenses == null
                  ? "0.00"
                  : parseFloat(d.totalExpenses).toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
