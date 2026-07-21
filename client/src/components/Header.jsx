import { useWeb3Context } from "../contexts/useWeb3Context";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Header() {
  const { web3State, setWeb3State } = useWeb3Context();
  const { selectAccount } = web3State;
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const shortAccount = selectAccount
    ? `${selectAccount.slice(0, 6)}...${selectAccount.slice(-4)}`
    : "";

  const logout = () => {
    const confirmed = window.confirm("Are you sure you want to logout?");
    if (confirmed) {
      localStorage.clear();
      setWeb3State({
        contractInstance: null,
        selectAccount: null,
        provider: null,
        signer: null,
      });
      navigate("/", { replace: true });
    }
  };

  const copyAddress = () => {
    if (selectAccount) {
      navigator.clipboard.writeText(selectAccount);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    }
  };

  const navLinkClass =
    "flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-zinc-400 hover:bg-zinc-900 hover:text-white";

  return (
    <header className="fixed left-0 top-0 z-50 w-full border-b border-zinc-800 bg-zinc-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <button
            onClick={() => navigate("/home")}
            className="flex items-center gap-3"
            aria-label="Go to home"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-700 bg-white text-zinc-950">
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </span>
            <span className="text-left">
              <span className="block text-base font-semibold tracking-tight text-white">ImageVault</span>
              <span className="block text-xs text-zinc-500">Secure storage</span>
            </span>
          </button>

          <nav className="hidden items-center gap-1 lg:flex">
            <Link to="/home" className={navLinkClass}>
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l9-9 9 9M5 10v10h14V10" />
              </svg>
              Home
            </Link>
            <Link to="/upload-image" className={navLinkClass}>
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 16V4m0 0L8 8m4-4 4 4M4 16v3a1 1 0 001 1h14a1 1 0 001-1v-3" />
              </svg>
              Upload
            </Link>
            <Link to="/gallery" className={navLinkClass}>
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4-4a2 2 0 012.8 0l1.2 1.2L15 10a2 2 0 012.8 0L20 12.2M4 6h16v14H4z" />
              </svg>
              My Images
            </Link>
          </nav>

          <div className="hidden items-center gap-2 lg:flex">
            <button
              onClick={copyAddress}
              title="Copy full address"
              className="relative rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm font-medium text-zinc-300 hover:bg-zinc-800"
            >
              {shortAccount || "Not Connected"}
              {copied && (
                <span className="absolute right-0 top-11 rounded-lg border border-zinc-700 bg-zinc-900 px-2 py-1 text-xs text-zinc-300 shadow-sm">
                  Copied
                </span>
              )}
            </button>
            <button
              onClick={logout}
              className="rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm font-semibold text-zinc-200 hover:bg-zinc-800"
            >
              Logout
            </button>
          </div>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-zinc-700 text-zinc-300 lg:hidden"
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18 18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="border-t border-zinc-800 bg-zinc-950 lg:hidden">
          <div className="mx-auto space-y-1 px-4 py-3 sm:px-6">
            <Link to="/home" onClick={() => setMenuOpen(false)} className={navLinkClass}>Home</Link>
            <Link to="/upload-image" onClick={() => setMenuOpen(false)} className={navLinkClass}>Upload</Link>
            <Link to="/gallery" onClick={() => setMenuOpen(false)} className={navLinkClass}>My Images</Link>
            <div className="grid gap-2 pt-2">
              <button onClick={copyAddress} className="rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-left text-sm text-zinc-300">
                {shortAccount || "Not Connected"}
              </button>
              <button
                onClick={() => {
                  logout();
                  setMenuOpen(false);
                }}
                className="rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm font-semibold text-zinc-200"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
