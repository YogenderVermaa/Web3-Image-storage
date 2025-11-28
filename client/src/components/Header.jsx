import { useWeb3Context } from "../contexts/useWeb3Context";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Header() {
  const { web3State } = useWeb3Context();
  const { selectAccount } = web3State;
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);

  const shortAccount = selectAccount
    ? `${selectAccount.slice(0, 6)}....${selectAccount.slice(-4)}`
    : "";

  const logout = () => {
    const confirmed = window.confirm("Are you sure you want to logout?");
    if (confirmed) {
      localStorage.clear();
      navigate("/wallet");
    }
  };

  const copyAddress = () => {
    if (selectAccount) {
      navigator.clipboard.writeText(selectAccount);
      alert("Address copied to clipboard!");
    }
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* Brand */}
        <h1
          onClick={() => navigate("/")}
          className="text-xl font-bold text-white tracking-tight cursor-pointer hover:text-indigo-400 transition-colors"
        >
          IMAGE VAULT
        </h1>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-2 text-sm">
          <Link 
            to="/home" 
            className="px-4 py-2 text-slate-300 hover:text-white transition-colors"
          >
            Home
          </Link>
          
          <Link
            to="/upload-image"
            className="px-4 py-2 text-slate-300 hover:text-white transition-colors"
          >
            Upload
          </Link>

          <Link
            to="/home"
            className="px-4 py-2 text-slate-300 hover:text-white transition-colors"
          >
            My Images
          </Link>

          <button
            onClick={copyAddress}
            title="Click to copy full address"
            className="ml-4 px-4 py-2 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 rounded-lg transition-all text-xs font-mono"
          >
            {shortAccount || "Not Connected"}
          </button>

          <button
            onClick={logout}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-lg transition-all"
          >
            Logout
          </button>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-slate-300 hover:text-white text-2xl transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-slate-900/95 backdrop-blur-xl border-t border-slate-800 animate-slideDown">
          <div className="px-4 py-4 flex flex-col gap-2">
            <Link 
              to="/home"
              onClick={() => setMenuOpen(false)}
              className="px-4 py-3 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-all"
            >
              Home
            </Link>
            
            <Link 
              to="/upload-image"
              onClick={() => setMenuOpen(false)}
              className="px-4 py-3 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-all"
            >
              Upload
            </Link>

            <Link 
              to="/home"
              onClick={() => setMenuOpen(false)}
              className="px-4 py-3 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-all"
            >
              My Images
            </Link>
            
            <button
              onClick={copyAddress}
              className="px-4 py-3 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 text-xs font-mono rounded-lg transition-all"
            >
              {shortAccount || "Not Connected"}
            </button>
            
            <button 
              onClick={() => {
                logout();
                setMenuOpen(false);
              }} 
              className="px-4 py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-lg transition-all"
            >
              Logout
            </button>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-slideDown {
          animation: slideDown 0.2s ease-out;
        }
      `}</style>
    </header>
  );
}