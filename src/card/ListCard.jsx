"use client";

import { useState, useEffect } from "react";
import lc from "@/card/ListCard.module.css";
import { List, message } from "antd";
function ListCard({ list, onItemSelect }) {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);

  const [items, setItems] = useState({
    name: "Rishabh",
    address: "0x66aD8847Dc71745B888C8058cEF1C7aeE4C080a7",
    amount: "80$",
    message: "message ",
  });
  useEffect(() => {
    if (list) {
      const newItems = [];
      for (let i = 0; i < list[0].length; i++) {
        const newItem = {
          name: list[3][i],
          address: list[0][i],
          amount: list[1][i],
          message: list[2][i],
        };
        newItems.push(newItem);
      }
      setItems(newItems);
    }
  }, [list]);

  console.log("items:", items);

  const handleItemClick = (index) => {
    setSelectedIndex(index);
    console.log(index);
    setShowConfirm(true);
  };

  const handleConfirm = () => {
    onItemSelect(selectedIndex);
    setShowConfirm(false);
    setSelectedIndex(null);
  };
  console.log(list);

  return (
    <div className={lc.main}>
      <div className={lc.Container}>
        {items.length > 0 &&
          items.map((item, i) => (
            <div key={i} className={lc.list} onClick={() => handleItemClick(i)}>
              <div className={lc.left}>
                <div className={lc.name}>{`${
                  item.name ? item.name : "N/A"
                }`}</div>

                <div className={lc.addr}>
                  {item.address.slice(0, 8) + "..." + item.address.slice(-4)}
                </div>
              </div>
              <div className={lc.right}>
                <div className={lc.amount}>
                  {`${parseFloat(item.amount) / 1e18} eth`}
                </div>
                <div className={lc.message}>{item.message}</div>
              </div>
            </div>
          ))}
      </div>
      {showConfirm && (
        <button className={lc.confirm} onClick={handleConfirm}>
          Pay
        </button>
      )}
    </div>
  );
}

export default ListCard;
