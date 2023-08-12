"use client";
import bs from "../Component/balance.module.css";
import Image from "next/image";
import { UserOutlined, DollarOutlined } from "@ant-design/icons";
import { ethers } from "ethers";
import logo from "../Component/ethereum-1.svg";
import profile from "../Component/profile.svg";
import { useState, useEffect } from "react";
import { BiTransferAlt } from "react-icons/bi";
import RequestCard from "../card/RequestCard";
import ListCard from "../card/ListCard";
import PayCard from "../card/PayCard";
import { useWeb3 } from "../context/context";

function Balance() {
  const { contract, AllRequests, acctinfo, myName, setrecent, recent } =
    useWeb3();
  const [isOpen, setopen] = useState(false);
  const [openList, setopenList] = useState(false);
  const [PayOpen, setOpenPay] = useState(false);
  const [payData, setPayData] = useState({
    from: "",
    to: "",
    amount: "",
    message: "",
  });
  const [notifyList, setList] = useState([]);
  const [index, setIndex] = useState({});

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        if (contract) {
          const list = await AllRequests();
          console.log("list", list);
          setList(list);
        }
      } catch (error) {
        console.error("Error fetching requests:", error);
      }
    };

    fetchRequests();
  }, [contract]);

  //get and add the form data gets from request form
  const handleFormSubmit = async (data) => {
    const amountInEther = parseFloat(data.amount);
    const amountInWei = ethers.parseEther(amountInEther.toString());

    await contract.createRequest(data.user, amountInWei, data.message);

    setopen(false);
  };

  //open request form card
  const openCard = () => {
    setopen((prevIsCardVisible) => !prevIsCardVisible);
  };

  //index from ListCard
  const ItemSelected = async (index) => {
    setIndex(index);

    const val = parseFloat(notifyList[1][index]) / 1e18;

    const stringValue = val.toString();

    const paymentAmount = ethers.parseEther(stringValue);

    await contract.payRequest(index, {
      value: paymentAmount,
    });
    setrecent(index);
    setopenList(false);
    window.location.reload();
  };

  //open request list
  const ListOpen = () => {
    setopenList((prev) => !prev);
  };

  const openPay = () => {
    setOpenPay((prevIsCardVisible) => !prevIsCardVisible);
  };

  return (
    <>
      <div className={bs.balanceContainer}>
        <div className={bs.main}>
          Current Balance
          <div className={bs.container}>
            <p className={bs.balance}>
              {acctinfo.balance.slice(0, 4)}
              <span>Eth Available</span>
            </p>
            <button className={bs.swap}>Swap token</button>
          </div>
        </div>
        <div className={bs.sendReceive}>
          <button className={bs.pay} onClick={openPay}>
            {notifyList[1]?.length >= 1 && (
              <div
                className={bs.notify}
                onClick={(e) => {
                  e.stopPropagation(); // Stop event propagation
                  ListOpen();
                }}
              >
                {notifyList[0].length}
              </div>
            )}
            <i>
              <DollarOutlined />
            </i>
            Pay
          </button>
          <button className={bs.request} onClick={openCard}>
            <i>
              <BiTransferAlt />
            </i>
            Request
          </button>
        </div>
        <div className={bs.infoContainer}>
          Account Details
          <div className={bs.inside}>
            <div className={bs.info}>
              <Image
                src={profile}
                alt="logo"
                width={100}
                heigth={100}
                className={bs.img}
              />
              <p className={bs.name}>
                {myName.hasName ? myName.name : "N/A"}{" "}
                <span>{acctinfo.address}</span>
              </p>
            </div>

            <div className={bs.info}>
              <Image
                src={logo}
                alt="logo"
                width={100}
                heigth={100}
                className={bs.img}
              />
              <p className={bs.name}>
                {acctinfo.network} <span>{acctinfo.balance}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
      {isOpen && (
        <>
          <div className={bs.card} onClick={openCard}></div>
          <RequestCard onFormSubmit={handleFormSubmit} />
        </>
      )}

      {openList && (
        <>
          <div className={bs.card} onClick={ListOpen}></div>
          <ListCard list={notifyList} onItemSelect={ItemSelected} />
        </>
      )}
      {PayOpen && (
        <>
          <div className={bs.card} onClick={openPay}></div>
          <PayCard index={index} data={payData} />
        </>
      )}
    </>
  );
}

export default Balance;
