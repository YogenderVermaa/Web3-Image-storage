import { useWeb3Context } from "../contexts/useWeb3Context";
import { connectWallet } from "../utils/connectWallet";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
const Wallet = () => {
  const navigateTo = useNavigate()
  const {updateWeb3State,web3State} = useWeb3Context()

  const {selectAccount} = web3State

  
   useEffect(() => {
   if(web3State.selectAccount){
     navigateTo("/home")
   }
 },[selectAccount,navigateTo])

  const handleWalletConnection = async() => {
    const {contractInstance,selectAccount} = await connectWallet()

    updateWeb3State({contractInstance,selectAccount})
  } 
  return (
    <div className="w-full h-screen 
    bg-gradient-to-br from-[#ff7a00] via-[#ff4d4d] to-[#005eff]
    flex flex-col justify-center items-center relative overflow-hidden">

    {/* Animated Glow Orbs */}
    <div className="absolute w-[500px] h-[500px] bg-white/20 rounded-full blur-3xl top-10 left-10 animate-pulse"></div>
    <div className="absolute w-[400px] h-[400px] bg-blue-500/30 rounded-full blur-3xl bottom-10 right-10 animate-pulse"></div>

    {/* Title */}
    <h1 className="text-[120px] md:text-[160px] font-extrabold mb-20 
        bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent 
        drop-shadow-2xl tracking-wide animate-fadeIn">
      IMAGE VAULT
    </h1>

    {/* Glassmorphism Button */}
    <button
      onClick={handleWalletConnection}
      className="backdrop-blur-xl bg-white/20 border border-white/30
                 px-16 py-6 text-3xl font-bold font-serif rounded-2xl
                 shadow-[0_0_40px_rgba(255,255,255,0.3)]
                 hover:bg-white/10 hover:shadow-[0_0_60px_rgba(255,255,255,0.5)]
                 transition-all duration-700">
      Wallet
    </button>
</div>

  )
}

export default Wallet