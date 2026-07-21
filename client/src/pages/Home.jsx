import { useWeb3Context } from "../contexts/useWeb3Context";
import GetImage from "../components/GetImage.jsx";

const Home = () => {
  const { web3State } = useWeb3Context();
  const { selectAccount } = web3State;

  return (
    <div className="w-full">
      <div className="mb-6 flex flex-col gap-4 border-b border-zinc-800 pb-6 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-white">Your Gallery</h1>
          <p className="mt-2 text-sm text-zinc-500">Stored on IPFS and encrypted end-to-end.</p>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:w-auto">
          <div className="rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-3">
            <div className="text-xs font-medium uppercase tracking-wide text-zinc-500">Storage</div>
            <div className="mt-1 font-semibold text-white">IPFS</div>
          </div>
          <div className="rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-3">
            <div className="text-xs font-medium uppercase tracking-wide text-zinc-500">Encryption</div>
            <div className="mt-1 font-semibold text-white">AES-256</div>
          </div>
        </div>
      </div>

      {selectAccount && (
        <div className="mb-6 rounded-lg border border-zinc-800 bg-zinc-900 p-4">
          <div className="text-xs font-medium uppercase tracking-wide text-zinc-500">Connected wallet</div>
          <div className="mt-1 break-all font-mono text-sm text-zinc-300">{selectAccount}</div>
        </div>
      )}

      <GetImage />
    </div>
  );
};

export default Home;
