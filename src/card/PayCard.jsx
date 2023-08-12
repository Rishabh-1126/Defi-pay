"use client";

import { useState, useEffect } from "react";
import card from "@/card/requestCard.module.css";
import { useWeb3 } from "@/context/context";
import { ethers } from "ethers";
const PayCard = () => {
  const { contract, setrecent, recent } = useWeb3();
  const [formData, setFormData] = useState({
    receiver: "",
    amount: "",
    message: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("payment sending>>event", formData);
    const amt = ethers.parseEther(formData.amount);
    console.log("amount in ether", amt);
    await contract.Pay(formData.receiver, amt, formData.message, {
      value: amt,
    });
    setFormData({ receiver: "", amount: "", message: "" });
    setrecent(amt);
    // window.location.reload();
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  return (
    // <div className={card.bg}>
    <div className={card.main}>
      <form onSubmit={handleSubmit} className={card.form}>
        <label htmlFor="receiver">
          To
          <input
            type="text"
            name="receiver"
            required
            value={formData.receiver}
            onChange={handleChange}
          />
        </label>

        <label htmlFor="amount">
          Amount
          <input
            type="text"
            name="amount"
            required
            value={formData.amount}
            onChange={handleChange}
          />
        </label>

        <label htmlFor="message">
          Message
          <input
            type="text"
            name="message"
            required
            value={formData.message}
            onChange={handleChange}
          />
        </label>

        <button type="submit"> Pay</button>
      </form>
    </div>
    // </div>
  );
};

export default PayCard;
