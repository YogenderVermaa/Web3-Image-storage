import { ethers } from "ethers";
import { toast } from "react-hot-toast";
import contractAbi from "../constants/contractAbi.json";
import CONTRACT_ADDRESS from "../constants/contractAddress";
import axios from "axios";

export const connectWallet = async () => {
  try {
    if (!window.ethereum) {
      toast.error("Install Metamask from extension");
      throw new Error("Metamask is not installed");
    }

    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });

    const selectAccount = accounts[0];

    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();

    // Sign message
    const message = "Welcome to crypto wallet";
    const signature = await signer.signMessage(message);

    const baseUrl = import.meta.env.VITE_BACKEND_URL;
    const url = `${baseUrl}/api/auth?address=${selectAccount}`;

    const res = await axios.post(url, { signature });
    const token = res.data.data;

    // 👉 STORE BASIC INFO FOR WEB3 RESTORATION
    localStorage.setItem("token", token);
    localStorage.setItem("selectedAccount", selectAccount);

    // Create contract instance
    const contractInstance = new ethers.Contract(
      CONTRACT_ADDRESS,
      contractAbi,
      signer
    );

    toast.success("Wallet connected successfully");

    return { contractInstance, selectAccount };

  } catch (error) {
    toast.error("Wallet Connection Failed");
    console.error(error);
  }
};
