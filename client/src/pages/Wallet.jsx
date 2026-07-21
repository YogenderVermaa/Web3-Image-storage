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
    if (selectAccount) {
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

  if (noMetaMask) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center bg-zinc-950 px-4">
        <div className="w-full max-w-md rounded-xl border border-zinc-800 bg-zinc-900 p-8 text-center shadow-2xl">
          <Lottie animationData={foxAnimation} loop={true} style={{ width: 190, margin: "0 auto" }} />
          <h1 className="mt-6 text-2xl font-semibold text-white">MetaMask not found</h1>
          <p className="mt-2 text-sm text-zinc-400">Redirecting to download page...</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center bg-zinc-950 px-4">
        <div className="w-full max-w-md rounded-xl border border-zinc-800 bg-zinc-900 p-8 text-center shadow-2xl">
          <Lottie animationData={foxAnimation} loop={true} style={{ width: 190, margin: "0 auto" }} />
          <h1 className="mt-6 text-2xl font-semibold text-white">Connecting wallet...</h1>
          <p className="mt-2 text-sm text-zinc-400">Confirm the request in MetaMask to continue.</p>
          <div className="mt-5 flex justify-center gap-2">
            <div className="h-2 w-2 rounded-full bg-zinc-500 animate-bounce"></div>
            <div className="h-2 w-2 rounded-full bg-zinc-500 animate-bounce [animation-delay:120ms]"></div>
            <div className="h-2 w-2 rounded-full bg-zinc-500 animate-bounce [animation-delay:240ms]"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-zinc-950 px-4 py-10 text-white">
      <div className="mx-auto flex min-h-[calc(100vh-5rem)] w-full max-w-6xl items-center">
        <div className="grid w-full overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900 shadow-2xl lg:grid-cols-[1.05fr_0.95fr]">
          <section className="flex flex-col justify-center p-8 sm:p-10 lg:p-14">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-zinc-700 bg-zinc-950">
              <svg className="h-7 w-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>

            <p className="mt-8 text-sm font-semibold uppercase tracking-[0.22em] text-zinc-500">ImageVault</p>
            <h1 className="mt-3 max-w-xl text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              Secure image storage for wallet owners.
            </h1>
            <p className="mt-5 max-w-xl text-base leading-7 text-zinc-400">
              Store encrypted images on IPFS, keep access tied to your wallet, and retrieve your gallery whenever you connect.
            </p>

            <button
              onClick={handleWalletConnection}
              className="mt-8 inline-flex w-fit items-center gap-3 rounded-lg bg-white px-5 py-3 text-sm font-semibold text-zinc-950 transition-colors hover:bg-zinc-200"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              Connect Wallet
            </button>
          </section>

          <section className="border-t border-zinc-800 bg-zinc-950/70 p-8 sm:p-10 lg:border-l lg:border-t-0">
            <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-5">
              <div className="text-sm font-semibold text-white">Storage flow</div>
              <div className="mt-5 space-y-4">
                {[
                  ["1", "Connect wallet", "Authenticate with MetaMask."],
                  ["2", "Encrypt upload", "Image data is protected before storage."],
                  ["3", "Save IPFS record", "The CID is recorded for your account."],
                  ["4", "Open gallery", "View images owned by the wallet."],
                ].map(([number, title, desc]) => (
                  <div key={title} className="flex gap-3">
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-zinc-700 text-xs font-semibold text-zinc-300">
                      {number}
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white">{title}</div>
                      <div className="mt-0.5 text-sm text-zinc-500">{desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-4">
              <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-4">
                <div className="text-xl font-semibold">AES-256</div>
                <div className="mt-1 text-xs text-zinc-500">Encryption</div>
              </div>
              <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-4">
                <div className="text-xl font-semibold">IPFS</div>
                <div className="mt-1 text-xs text-zinc-500">Storage</div>
              </div>
            </div>

            <p className="mt-5 text-sm text-zinc-500">Requires MetaMask extension.</p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Wallet;
