import {ethers} from "ethers";
import { toast} from "react-hot-toast"
import contractAbi from "../constants/contractAbi.json";
import axios from "axios";
export const connectWallet = async () => {
   try {
      console.log("STEP 1: Checking metamask...");
      if(!window.ethereum){
        throw new Error("Metamask is not installed")
      }

      console.log("STEP 2: Requesting accounts...");
      const accounts = await window.ethereum.request({ method:"eth_requestAccounts" })
      const selectAccount = accounts[0]
      console.log("ACCOUNT:", selectAccount);

      console.log("STEP 3: Getting signer...");
      const provider = new ethers.BrowserProvider(window.ethereum)
      const signer  = await provider.getSigner();

      console.log("STEP 4: Signing message...");
      const signature = await signer.signMessage("Welcome to crypto wallet")

      console.log("STEP 5: Sending signature to backend...");
      const baseUrl = import.meta.env.VITE_BACKEND_URL;
      const url = `${baseUrl}/api/auth?address=${selectAccount}`
      const res  = await axios.post(url,{ signature })
      console.log("AUTH RESPONSE:", res.data);

      console.log("STEP 6: Connecting contract...");
      const contractAddress= "0xf4A304c64D615b9470C291bd797A7B7852E6df6b";
      const contractInstance = new ethers.Contract(contractAddress, contractAbi, signer) 
      console.log("CONTRACT:", contractInstance);

      toast.success("Wallet connected successfully")

      return { contractInstance, selectAccount };

   } catch (error) {
      console.error("CONNECT WALLET ERROR:", error);
      toast.error("Wallet Connection Failed");
      return { contractInstance: null, selectAccount: null }; // FIX
   }
};
