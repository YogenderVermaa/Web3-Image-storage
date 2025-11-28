import { createContext, useState, useEffect } from "react";
import { ethers } from "ethers";
import contractAbi from "../constants/contractAbi.json";

export const web3Context = createContext();

const Web3Provider = ({ children }) => {
  const [initializing, setInitializing] = useState(true);
  const [web3State, setWeb3State] = useState({
    contractInstance: null,
    selectAccount: null,
    provider: null,
    signer: null,
  });

  const CONTRACT_ADDRESS = "0xf4A304c64D615b9470C291bd797A7B7852E6df6b";

  useEffect(() => {
    const restoreWeb3 = async () => {
      const savedAddress = localStorage.getItem("selectedAccount");
      const token = localStorage.getItem("token");

      if (!savedAddress || !token) {
        setInitializing(false);
        return;
      }

      try {
        if (!window.ethereum) {
          throw new Error("MetaMask not found");
        }

        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const contractInstance = new ethers.Contract(
          CONTRACT_ADDRESS,
          contractAbi,
          signer
        );

        setWeb3State({
          provider,
          signer,
          contractInstance,
          selectAccount: savedAddress,
        });
      } catch (err) {
        console.log("Restore failed:", err);
        // Clear invalid data
        localStorage.removeItem("selectedAccount");
        localStorage.removeItem("token");
      }

      setInitializing(false);
    };

    restoreWeb3();
  }, []);

  const updateWeb3State = (newState) => {
    setWeb3State((prev) => ({ ...prev, ...newState }));
  };

  return (
    <web3Context.Provider value={{ web3State, setWeb3State, updateWeb3State, initializing }}>
      {children}
    </web3Context.Provider>
  );
};

export default Web3Provider;