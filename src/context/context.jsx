"use client";

import { useContext, createContext, useState, useEffect } from "react";
import { ethers } from "ethers";

import ContractABI from "../payMe.sol/PayMe.json";

// Define the context
const StateProvider = createContext();

// Context provider component
export function ContractProvider({ children }) {
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState(null);
  const [acctinfo, setInfo] = useState({
    balance: "",
    address: "",
    network: "",
  });
  const [myName, setName] = useState({ name: "", hasName: false });
  const [recent, setrecent] = useState([]);

  const contractAddress = "0x14578270ef598c800b5c1D45f279d27F1eCbC3B3";

  // Initialize the contract instance on component mount
  useEffect(() => {
    async function initializeContract() {
      if (window.ethereum) {
        // await window.ethereum.enable();
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const address = await signer.getAddress();
        setAccount(address);

        const contractInstance = new ethers.Contract(
          contractAddress,
          ContractABI.abi,
          signer
        );
        console.log(contractInstance);
        setContract(contractInstance);

        window.ethereum.on("accountsChanged", (newAccounts) => {
          // Reload the window when the account changes
          window.location.reload();
        });
      } else {
        console.error("MetaMask not detected.");
      }
    }

    initializeContract();
  }, []);
  console.log(contract);
  // Render the context provider with the contract instance as value
  useEffect(() => {
    hasName();
    AllRequests();
    getAccDetails();
    Activity();
  }, [contract, account]);

  //transaction history

  const Activity = async () => {
    if (contract && account) {
      const data = await contract.getMyHistory();
      console.log("data in history", data);

      return data;
    } else console.log("no data");
  };
  //checking for Name
  const hasName = async (acc) => {
    if (contract && account) {
      try {
        const result = await contract.getMyName();
        console.log(`${result ? result : "add name"} result`);
        setName({ name: result.name, hasName: result.hasName });
        // return result;
      } catch (error) {
        console.log("has name error", error);
      }
    }
  };

  //Checking for Request
  const AllRequests = async () => {
    if (contract && account) {
      const data = await contract.getMyRequests();

      return data;
    }
  };

  async function getAccDetails() {
    try {
      if (!contract || !account) {
        return;
      }

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      const address = await signer.getAddress();

      const balanceWei = await provider.getBalance(address);

      const balanceEth = ethers.formatEther(balanceWei);

      const network = await provider.getNetwork();

      setInfo({
        balance: balanceEth.slice(0, 7),
        address: address,
        network: network.name, // You want to store the network name, not the network object
      });
    } catch (error) {
      console.error("Error getting account details:", error);
    }
  }

  return (
    <StateProvider.Provider
      value={{
        contract,
        myName,
        account,
        hasName,
        AllRequests,
        acctinfo,
        Activity,
        recent,
        setrecent,
      }}
    >
      {children}
    </StateProvider.Provider>
  );
}

// Custom hook to access the contract instance
export const useWeb3 = () => useContext(StateProvider);
