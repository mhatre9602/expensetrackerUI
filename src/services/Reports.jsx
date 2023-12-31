import { useEffect, useState } from "react";
import ExpenseHistoryTable from "./ExpenseHistory";
import { API_BASE_URL } from "../App";
import axios from "axios";

export default function Reports() {
  const [expenses, setExpenses] = useState([]);
  const [start, setStart] = useState(null);
  const [end, setEnd] = useState(null);
  const tk = localStorage.getItem("token");
  if (!tk) window.location.pathname = "/";

  //JWT verify
  function parseJwt(tk) {
    var base64Url = tk.split(".")[1];
    var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    var jsonPayload = decodeURIComponent(
      window
        .atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );

    return JSON.parse(jsonPayload);
  }

  useEffect(() => {
    getExpenseForUser();
  }, []);

  function getExpenseForUser(type) {
    console.log(type, start);
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${API_BASE_URL}/expense/getexpenses?type=${type}&start=${
        start || ""
      }`,
      headers: {
        Authorization: localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
    };

    axios
      .request(config)
      .then((response) => {
        setExpenses(response.data.expenses);
        console.log(JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const openInNewTab = (url) => {
    window.open(url, "_blank", "noreferrer");
  };

  function downloadReports(type) {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${API_BASE_URL}/expense/download?type=${type}&start=${
        start || ""
      }`,
      headers: { Authorization: localStorage.getItem("token") },
    };

    axios
      .request(config)
      .then((response) => {
        alert("File download");
        openInNewTab(response.data.reportUrl);
        // console.log(JSON.stringify(response));
      })
      .catch((error) => {
        alert("Error occured");
        console.log(error);
      });
  }

  return (
    <section className="mx-2">
      <div className="daily_report w-100">
        <div className="card" style={{ width: "100%" }}>
          {/* <img src="..." class="card-img-top" alt="..."> */}
          <div className="card-body">
            <h5 className="card-title">Daily Reports</h5>
            <p className="card-text">Select Date</p>
            <input
              onChange={(e) => setStart(e.target.value)}
              className="m-2 p-2"
              type="date"
            />
            <a
              href="#"
              className="btn btn-primary"
              onClick={() => {
                getExpenseForUser("daily");
              }}
            >
              Show
            </a>
            <button
              className="btn m-1 btn-large"
              onClick={() => downloadReports("daily")}
            >
              <i className="fa fa-download" aria-hidden="true"></i>
            </button>
          </div>
          <ExpenseHistoryTable data={expenses} />
        </div>
      </div>

      {/*Weekly*/}
      <div className="daily_report w-100">
        <div className="card" style={{ width: "100%" }}>
          {/* <img src="..." class="card-img-top" alt="..."> */}
          <div className="card-body">
            <h5 className="card-title">Weekly Reports</h5>
            <p className="card-text">Select Date</p>
            <input
              onChange={(e) => setStart(e.target.value)}
              className="m-2 p-2"
              type="date"
            />
            <a
              href="#"
              className="btn btn-primary"
              onClick={() => {
                getExpenseForUser("weekly");
              }}
            >
              Show
            </a>
            <button
              className="btn m-1 btn-large"
              onClick={() => downloadReports("weekly")}
            >
              <i className="fa fa-download" aria-hidden="true"></i>
            </button>
          </div>
          <ExpenseHistoryTable data={expenses} />
        </div>
      </div>

      {/* Monthly */}
      <div className="daily_report w-100 my-5">
        <div className="card" style={{ width: "100%" }}>
          {/* <img src="..." class="card-img-top" alt="..."> */}
          <div className="card-body">
            <h5 className="card-title">Month Reports</h5>
            <p className="card-text">Select Date</p>
            <input
              onChange={(e) => setStart(e.target.value)}
              className="m-2 p-2"
              type="date"
            />
            <input
              onChange={(e) => setEnd(e.target.value)}
              className="m-2 p-2"
              type="date"
            />
            <a
              href="#"
              className="btn btn-primary"
              onClick={() => {
                getExpenseForUser("monthly");
              }}
            >
              Show
            </a>
            <button
              className="btn m-1 btn-large"
              onClick={() => downloadReports("monthly")}
            >
              <i className="fa fa-download" aria-hidden="true"></i>
            </button>
          </div>
          <ExpenseHistoryTable data={expenses} />
        </div>
      </div>
    </section>
  );
}
