"use client";

import btn from "@/component/connect.module.css";
import { useWeb3 } from "@/context/context";
import { LoadingOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";
const { ethers } = require("ethers");

function Connect() {
  const { contract, myName } = useWeb3();

  console.log(myName);
  const [networkName, setNetwork] = useState("testnet");
  const [account, setAccount] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [chainId, setChainId] = useState("0x13881");
  const [isConnected, setIsConnect] = useState({
    name: "Connect to MetaMask",
    status: true,
  });

  const check = () => {
    setIsConnect({ name: "Connecting...", status: false });
    if (account) {
      console.log("connected");
    } else {
      console.log("not connected");
      login();
    }
  };

  const login = async () => {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);

      //requesting access to user metamask account
      //show only the account u have selected

      await ethereum.request({
        method: "wallet_requestPermissions",
        params: [{ eth_accounts: {} }],
      });
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      setAccounts(accounts);
      console.log("accounts", accounts);

      //show every account present in your metamask account
      const res = await provider.send("eth_requestAccounts", []);
      setAccount(res);
      console.log("res", res);
      const network = await provider.getNetwork();
      console.log(network);
      setNetwork(network.name);
      console.log(network.name);
      const signer = await provider.getSigner();
      const addr = await signer.getAddress();

      const chainId = await ethereum.request({ method: "eth_chainId" });
      setChainId(chainId);
      console.log("chain id", chainId);
      setIsConnect({ name: "MetaMask Connected", status: true });

      console.log(addr);
    } catch (error) {
      console.log(error);
    }
  };

  // switches network to the one provided
  const switchNetwork = async () => {
    checkNetwork();
    await window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: chainId }],
    });
    // refresh
    window.location.reload();
  };

  const checkNetwork = async () => {
    if (window.ethereum) {
      const currentChainId = await window.ethereum.request({
        method: "eth_chainId",
      });

      // return true if network id is the same
      if (currentChainId == chainId) return true;
      // return false is network id is different
      return false;
    }
  };

  return (
    <div className={btn.main}>
      <button onClick={check} className={btn.connect}>
        {isConnected.name}
        {isConnected.status ? (
          ""
        ) : (
          <i>
            <LoadingOutlined />
          </i>
        )}
      </button>
      {/* {account && account.map((acc, i) => <p key={i}>Account:{acc}</p>)}; */}
    </div>
  );
}

export default Connect;
