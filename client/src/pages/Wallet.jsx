import { useWeb3Context } from "../contexts/useWeb3Context";
import { connectWallet } from "../utils/connectWallet";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Lottie from "lottie-react";
import foxAnimation from "../assets/metamask-fox.json";

const Wallet = () => {
  const navigateTo = useNavigate();
  const { updateWeb3State, web3State } = useWeb3Context();
  const { selectAccount } = web3State;

  const [loading, setLoading] = useState(false);
  const [noMetaMask, setNoMetaMask] = useState(false);

  useEffect(() => {
    if (web3State.selectAccount) {
      navigateTo("/home");
    }
  }, [selectAccount, navigateTo]);

  const handleWalletConnection = async () => {
    try {
      if (!window.ethereum) {
        setNoMetaMask(true);
        setTimeout(() => {
          window.open("https://metamask.io/download/", "_blank");
        }, 2200);

        return;
      }

      setLoading(true);
      const { contractInstance, selectAccount } = await connectWallet();
      updateWeb3State({ contractInstance, selectAccount });
    } catch (error) {
      console.error("Wallet connection error:", error);
      alert("Failed to connect wallet. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // MetaMask not found screen
  if (noMetaMask) {
    return (
      <div className="w-full h-screen flex flex-col justify-center items-center bg-slate-950">
        <div className="flex flex-col items-center">
          <Lottie animationData={foxAnimation} loop={true} style={{ width: 200 }} />
          <p className="text-white text-xl mt-6 font-semibold">
            MetaMask not found
          </p>
          <p className="text-slate-400 text-sm mt-2">Redirecting to download page...</p>
        </div>
      </div>
    );
  }

  // Connecting wallet screen
  if (loading) {
    return (
      <div className="w-full h-screen flex flex-col justify-center items-center bg-slate-950">
        <div className="flex flex-col items-center">
          <Lottie animationData={foxAnimation} loop={true} style={{ width: 200 }} />
          <p className="text-white text-xl mt-6 font-semibold">
            Connecting wallet...
          </p>
          <div className="flex gap-2 mt-4">
            <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
            <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
            <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
          </div>
        </div>
      </div>
    );
  }

  // Main wallet connection screen
  return (
    <div className="w-full min-h-screen bg-slate-950 relative overflow-hidden">

      {/* Subtle Grid Background */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      {/* Subtle Glow Effects */}
      <div className="absolute w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl top-20 left-20"></div>
      <div className="absolute w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl bottom-20 right-20"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 py-12">

        {/* Logo */}
        <div className="relative mb-12">
          {/* Glow effect backdrop */}
          <div className="absolute -inset-2 bg-gradient-to-br from-blue-500 via-cyan-500 to-blue-600 rounded-2xl blur-xl opacity-40 group-hover:opacity-60 transition-all duration-300 animate-pulse"></div>

          <div className="relative w-24 h-24 bg-gradient-to-br from-blue-600 via-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-2xl transform group-hover:scale-105 transition-transform duration-300">
            <div className="absolute inset-0 bg-gradient-to-t from-transparent to-white/20 rounded-2xl"></div>

            
            <svg
              className="w-12 h-12 text-white relative z-10 drop-shadow-lg"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>

            <div className="absolute top-2 right-2 w-5 h-5 bg-white/40 rounded-full blur-sm"></div>
          </div>
        </div>


        <div className="absolute inset-0 pointer-events-none select-none">
          <div className="absolute top-[-100px] -left-20 w-[450px] h-[450px] bg-[#2cf4ff92] opacity-20 blur-[160px] rounded-full animate-pulse" />
          <div className="absolute bottom-[-100px] right-[-50px] w-[500px] h-[500px] bg-[#2835efc4] opacity-20 blur-[160px] rounded-full animate-pulse [animation-delay:1.3s]" />
        </div>
        {/* Title */}
        <div className="text-center mb-12 max-w-2xl">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
            IMAGE VAULT
          </h1>
          <p className="text-slate-400 text-lg">
            Secure decentralized storage for your images
          </p>
        </div>

        {/* Connect Button */}
        <button
          onClick={handleWalletConnection}
          className="group mb-16 px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-semibold transition-all shadow-lg shadow-indigo-500/30 hover:shadow-xl hover:shadow-indigo-500/40 flex items-center gap-3"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
          <span>Connect Wallet</span>
          <svg
            className="w-5 h-5 group-hover:translate-x-1 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </button>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full max-w-5xl mb-12">
          {[
            { icon: "🔐", title: "Encrypted", desc: "End-to-end encryption" },
            { icon: "⚡", title: "Fast", desc: "IPFS storage" },
            { icon: "🌐", title: "Decentralized", desc: "Blockchain powered" },
            { icon: "🛡️", title: "Private", desc: "You own your keys" }
          ].map((feature, idx) => (
            <div
              key={idx}
              className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-xl p-6 hover:border-slate-700 transition-all"
            >
              <div className="text-3xl mb-3">{feature.icon}</div>
              <h3 className="text-white font-semibold text-sm mb-1">{feature.title}</h3>
              <p className="text-slate-500 text-xs">{feature.desc}</p>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="flex flex-col sm:flex-row items-center gap-4 text-slate-500 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
            <span>Powered by Ethereum & IPFS</span>
          </div>
          <div className="hidden sm:block w-1 h-1 bg-slate-700 rounded-full"></div>
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            <span>Requires MetaMask extension</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wallet;