"use client";

import { useState } from "react";
import card from "@/card/requestCard.module.css";

const RequestCard = ({ onFormSubmit }) => {
  //creating request

  const [formData, setFormData] = useState({
    user: "",
    amount: "",
    message: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(formData);
    onFormSubmit(formData);

    setFormData({ user: "", amount: "", message: "" });
  };

  return (
    // <div className={card.bg}>
    <div className={card.main}>
      <form onSubmit={handleSubmit} className={card.form}>
        <label htmlFor="user">
          Address
          <input
            type="text"
            name="user"
            value={formData.user}
            onChange={handleChange}
          />
        </label>

        <label htmlFor="amount">
          Amount
          <input
            type="text"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
          />
        </label>

        <label htmlFor="message">
          Message
          <input
            type="text"
            name="message"
            value={formData.message}
            onChange={handleChange}
          />
        </label>

        <button type="submit">send</button>
      </form>
    </div>
    // </div>
  );
};

export default RequestCard;
