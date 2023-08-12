"use client";

import Head from "next/head";

import hd from "@/Component/header.module.css";
import { PlusSquareOutlined } from "@ant-design/icons";
import Connect from "./Connect";
import { useWeb3 } from "@/context/context";
import { useEffect, useState, useRef } from "react";

//Header function
function Header() {
  const [addr, setAddress] = useState("Account Not found");
  //using context.js
  const { contract, myName, account } = useWeb3();

  const inputRef = useRef(null);

  useEffect(() => {
    if (account) {
      const str = account.slice(0, 8) + "...." + account.slice(-6);
      setAddress(str);
    }
  }, [contract, account]);

  const addname = async () => {
    const inputValue = inputRef.current.value;
    console.log(inputValue);
    console.log(contract);
    await contract.addName(inputValue);
    window.location.relaod;
  };
  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Lobster&family=Rowdies:wght@700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <div className={hd.main}>
        <div className={hd.right}>Defi Pay</div>
        <div className={hd.left}>
          <div className={hd.name}>
            {account && myName.hasName ? (
              myName.name
            ) : (
              <div className={hd.add}>
                <input
                  type="text"
                  placeholder="Enter Name"
                  className={hd.input}
                  ref={inputRef} // Assign the ref to the input element
                />
                <i>
                  <PlusSquareOutlined onClick={addname} className={hd.icon} />
                </i>
              </div>
            )}

            <p>{addr}</p>
          </div>
          <Connect />
        </div>
      </div>
    </>
  );
}

export default Header;
