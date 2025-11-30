import React from 'react';
import { useWeb3Context } from '../contexts/useWeb3Context';
import GetImage from '../components/GetImage.jsx';

const Home = () => {
  const { web3State } = useWeb3Context();
  const { selectAccount } = web3State;

  return (
    <div className="w-full">
      
      {/* Hero Section */}
      <div className="mb-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">
              Your Gallery
            </h1>
            <p className="text-gray-400 text-lg">
              Securely stored on IPFS, encrypted end-to-end
            </p>
          </div>
          
          {/* Stats Cards */}
          <div className="hidden lg:flex items-center gap-4">
            <div className="px-6 py-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl">
              <div className="text-sm text-gray-400 mb-1">Storage</div>
              <div className="text-2xl font-bold text-white">IPFS</div>
            </div>
            <div className="px-6 py-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl">
              <div className="text-sm text-gray-400 mb-1">Encryption</div>
              <div className="text-2xl font-bold text-white">AES-256</div>
            </div>
          </div>
        </div>

        {/* Account Info Bar */}
        {selectAccount && (
          <div className="flex items-center gap-3 px-5 py-4 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-xl backdrop-blur-sm">
            <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
            <div className="flex-1">
              <div className="text-sm text-gray-400">Connected Wallet</div>
              <div className="font-mono text-sm text-white">{selectAccount}</div>
            </div>
            <div className="px-4 py-2 bg-white/5 rounded-lg">
              <span className="text-xs font-semibold text-green-400">ACTIVE</span>
            </div>
          </div>
        )}
      </div>

      {/* Main Content - GetImage Component */}
      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 lg:p-8 shadow-2xl">
        <GetImage />
      </div>

      {/* Bottom Info Section */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl hover:bg-white/10 transition-all duration-300">
          <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-4">
            <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-white mb-2">Encrypted Storage</h3>
          <p className="text-sm text-gray-400">Your images are encrypted before upload and only you hold the keys</p>
        </div>

        <div className="p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl hover:bg-white/10 transition-all duration-300">
          <div className="w-12 h-12 bg-cyan-500/20 rounded-lg flex items-center justify-center mb-4">
            <svg className="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-white mb-2">Decentralized</h3>
          <p className="text-sm text-gray-400">Stored on IPFS network with no central point of failure</p>
        </div>

        <div className="p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl hover:bg-white/10 transition-all duration-300">
          <div className="w-12 h-12 bg-indigo-500/20 rounded-lg flex items-center justify-center mb-4">
            <svg className="w-6 h-6 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-white mb-2">Blockchain Verified</h3>
          <p className="text-sm text-gray-400">Every upload is recorded on-chain for immutable proof</p>
        </div>
      </div>

    </div>
  );
};

export default Home;