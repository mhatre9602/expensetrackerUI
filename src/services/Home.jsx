import React, { useState, useEffect } from "react";

import CreateExpense from "./ExpenseEntry";
import ExpenseHistoryTable from "./ExpenseHistory";
import axios from "axios";

export default () => {
  useEffect(() => {
    getExpenseForUser();
  }, []);

  const userId = localStorage.getItem("token");
  if (!userId) window.location.pathname = "/";

  const [expenses, setExpenses] = useState([]);

  function createExpense(newExpense) {
    setExpenses([...expenses, newExpense]);
    const token = localStorage.getItem("token");
    let data = JSON.stringify({
      ...newExpense,
      // userId: localStorage.getItem("token"),
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://friendly-goat-kerchief.cyclic.app/expense/addexpense",
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        window.location.reload();
        console.log(JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log(error);
      });

    // fetch(API_BASE_URL + "/expense/addexpense", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     ...newExpense,
    //     userId: localStorage.getItem("token"),
    //   }),
    // })
    //   .then((data) => {
    //     window.location.reload();
    //   })
    //   .catch((err) => window.alert("Oops! Something went wrong!"));
  }

  function deleteExpense(expenseid) {
    const token = localStorage.getItem("token");

    let config = {
      method: "delete",
      maxBodyLength: Infinity,
      url: "https://friendly-goat-kerchief.cyclic.app/expense/deleteexpense/" + expenseid,
      headers: {
        Authorization: token,
      },
    };

    axios
      .request(config)
      .then((response) => {
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });

    // fetch(API_BASE_URL + "/expense/deleteexpense/" + expenseid, {
    //   method: "DELETE",
    //   headers: {
    //     Authorization: token,
    //     "Content-Type": "application/json",
    //   },
    // })
    //   .then(() => {
    //     const filtered = expenses.filter((e) => e.id !== expenseid);
    //     setExpenses(filtered);
    //   })
    //   .catch((err) =>
    //     window.alert("Oops! Something went wrong!" + err.message)
    //   );
  }

  function getExpenseForUser() {
    const token = localStorage.getItem("token");
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: "https://friendly-goat-kerchief.cyclic.app/expense/getexpenses",
      headers: { Authorization: token },
    };

    axios
      .request(config)
      .then((response) => {
        setExpenses(response.data.expenses);
      })
      .catch((error) => {
        alert("Failed to fetch expenses");
        console.log(error);
      });
    // fetch(`${API_BASE_URL}/expense/getexpenses/${userId}`)
    //   .then((res) => res.json())
    //   .then((data) => setExpenses(data))
    //   .catch((err) =>
    //     window.alert(`Oops! Something went wrong! Error: ${err?.message}`)
    //   );
  }

  return (
    <section>
      <CreateExpense createExpense={createExpense} />
      <ExpenseHistoryTable data={expenses} deleteExpense={deleteExpense} />
    </section>
  );
};
