import { useWeb3Context } from "../contexts/useWeb3Context";
import { connectWallet } from "../utils/connectWallet";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
const Wallet = () => {
  const navigateTo = useNavigate()
  const {updateWeb3State,web3State} = useWeb3Context()
  const {selectAccount} = web3State

  
   useEffect(() => {
   if(selectAccount){
     navigateTo("/home")
   }
 },[selectAccount,navigateTo])

  const handleWalletConnection = async() => {
    const {contractInstance,selectAccount} = await connectWallet()
    updateWeb3State({contractInstance,selectAccount})
  } 
  return (
    <button onClick={handleWalletConnection}>Wallet</button>
  )
}

export default Wallet