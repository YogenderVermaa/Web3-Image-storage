import React, { useState } from 'react';
import { Shield, Lock, Globe, FileText, Image, ArrowRight, Check } from 'lucide-react';

const HowWeWork = () => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      icon: Shield,
      title: 'Wallet Authentication',
      subtitle: 'Cryptographic Identity Verification',
      description: 'Connect via MetaMask using elliptic curve cryptography. Message signing provides non-repudiation while maintaining privacy. No centralized authentication servers required.',
      tech: ['ECDSA Signatures', 'Web3.js Integration', 'EIP-712 Standard'],
      metrics: { security: '2048-bit', protocol: 'secp256k1' }
    },
    {
      icon: Lock,
      title: 'End-to-End Encryption',
      subtitle: 'Military-Grade Data Protection',
      description: 'AES-256-GCM encryption applied client-side before any network transmission. Key derivation uses PBKDF2 with high iteration counts. Your keys never leave your device.',
      tech: ['AES-256-GCM', 'PBKDF2', 'Client-Side Processing'],
      metrics: { standard: 'FIPS 140-2', keySize: '256-bit' }
    },
    {
      icon: Globe,
      title: 'Decentralized Storage',
      subtitle: 'IPFS Content Distribution',
      description: 'Encrypted data stored across distributed IPFS network via Pinata gateway. Content-addressed using cryptographic hashing ensures data integrity and global availability.',
      tech: ['IPFS Protocol', 'Pinata Gateway', 'Content Addressing'],
      metrics: { availability: '99.9%', nodes: 'Global' }
    },
    {
      icon: FileText,
      title: 'Blockchain Registry',
      subtitle: 'Immutable Transaction Ledger',
      description: 'Smart contracts store IPFS CIDs on Ethereum-compatible chains. Gas-optimized operations with ERC-721 compliance for provenance tracking.',
      tech: ['Smart Contracts', 'EVM Compatible', 'Gas Optimization'],
      metrics: { finality: '< 15s', cost: 'Optimized' }
    },
    {
      icon: Image,
      title: 'Secure Retrieval',
      subtitle: 'Zero-Knowledge Access Control',
      description: 'Authenticated users retrieve encrypted data from IPFS. Decryption occurs exclusively client-side using private keys. Zero server-side plaintext exposure.',
      tech: ['Zero-Knowledge', 'Client Decryption', 'Secure Sessions'],
      metrics: { latency: '< 200ms', privacy: 'Complete' }
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.03)_1px,transparent_1px)] bg-[size:64px_64px]"></div>
      
      <div className="relative">
        {/* Hero Section */}
        <div className="border-b border-white/10 bg-black/20 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20 lg:py-28">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-6">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse"></div>
                  Technical Architecture
                </div>
                <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                  How ImageVault
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                    Secures Your Data
                  </span>
                </h1>
                <p className="text-xl text-gray-300 leading-relaxed">
                  Enterprise-grade cryptography meets decentralized infrastructure. 
                  Built on proven security standards with complete transparency.
                </p>
              </div>
              
              <div className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-8">
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-green-500/10 border border-green-500/20 flex items-center justify-center flex-shrink-0">
                      <Check className="w-5 h-5 text-green-400" />
                    </div>
                    <div>
                      <div className="font-semibold text-white mb-1">Zero-Knowledge Architecture</div>
                      <div className="text-sm text-gray-400">Your data remains encrypted end-to-end</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-green-500/10 border border-green-500/20 flex items-center justify-center flex-shrink-0">
                      <Check className="w-5 h-5 text-green-400" />
                    </div>
                    <div>
                      <div className="font-semibold text-white mb-1">Decentralized by Design</div>
                      <div className="text-sm text-gray-400">No single point of failure or control</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-green-500/10 border border-green-500/20 flex items-center justify-center flex-shrink-0">
                      <Check className="w-5 h-5 text-green-400" />
                    </div>
                    <div>
                      <div className="font-semibold text-white mb-1">Blockchain Verified</div>
                      <div className="text-sm text-gray-400">Immutable audit trail on-chain</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Process Flow */}
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-5 gap-4 mb-16">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = activeStep === index;
              
              return (
                <button
                  key={index}
                  onClick={() => setActiveStep(index)}
                  className={`relative p-4 rounded-xl border transition-all text-left ${
                    isActive 
                      ? 'bg-white/10 border-white/30 shadow-lg' 
                      : 'bg-white/5 border-white/10 hover:bg-white/5 hover:border-white/20'
                  }`}
                >
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-3 ${
                    isActive ? 'bg-blue-500/20 border border-blue-500/30' : 'bg-white/5 border border-white/10'
                  }`}>
                    <Icon className={`w-6 h-6 ${isActive ? 'text-blue-400' : 'text-gray-400'}`} />
                  </div>
                  <div className={`text-sm font-semibold ${isActive ? 'text-white' : 'text-gray-400'}`}>
                    Step {index + 1}
                  </div>
                  <div className={`text-xs mt-1 ${isActive ? 'text-gray-300' : 'text-gray-500'}`}>
                    {step.title}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Step Details */}
          <div className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 overflow-hidden">
            <div className="grid lg:grid-cols-3">
              {/* Main Content */}
              <div className="lg:col-span-2 p-8 lg:p-12">
                <div className="flex items-center gap-4 mb-6">
                  <div className="text-6xl font-bold text-white/10">
                    {String(activeStep + 1).padStart(2, '0')}
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-white mb-1">
                      {steps[activeStep].title}
                    </h2>
                    <p className="text-blue-400 font-medium">
                      {steps[activeStep].subtitle}
                    </p>
                  </div>
                </div>
                
                <p className="text-lg text-gray-300 leading-relaxed mb-8">
                  {steps[activeStep].description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {steps[activeStep].tech.map((tech, i) => (
                    <span
                      key={i}
                      className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-sm text-gray-300 font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Metrics Sidebar */}
              <div className="bg-black/20 border-l border-white/10 p-8">
                <div className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-6">
                  Technical Specs
                </div>
                <div className="space-y-6">
                  {Object.entries(steps[activeStep].metrics).map(([key, value], i) => (
                    <div key={i}>
                      <div className="text-xs text-gray-500 uppercase tracking-wide mb-2">
                        {key}
                      </div>
                      <div className="text-2xl font-bold text-white">
                        {value}
                      </div>
                    </div>
                  ))}
                </div>

                <button className="mt-8 w-full px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded-lg font-semibold text-white transition-colors flex items-center justify-center gap-2">
                  Learn More
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Security Standards */}
        <div className="border-t border-white/10 bg-black/20">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
            <div className="grid md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-white mb-2">256-bit</div>
                <div className="text-sm text-gray-400">Encryption Standard</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-white mb-2">100%</div>
                <div className="text-sm text-gray-400">Decentralized</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-white mb-2">Zero</div>
                <div className="text-sm text-gray-400">Server Access</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-white mb-2">∞</div>
                <div className="text-sm text-gray-400">Data Persistence</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowWeWork;