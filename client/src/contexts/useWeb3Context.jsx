import { web3Context } from "./Web3Provider";
import { useContext } from "react";

export const useWeb3Context = () => {
    return useContext(web3Context)
}