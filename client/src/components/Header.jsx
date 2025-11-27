import { useWeb3Context } from "../contexts/useWeb3Context";
import { Link, Navigate, useNavigate } from "react-router-dom";
function Header() {
    const {web3State} = useWeb3Context()
    const {selectAccount} = web3State

    const shortAccount = selectAccount?`${selectAccount.slice(0,6)}....${selectAccount.slice(-4)}`:""

    const logout = () => {
        localStorage.clear()
        window.location.reload()
    }
  return (
    
    <header className="w-full flex items-center justify-between px-8 py-4 
                       bg-white/10 backdrop-blur-lg border-b border-white/20 
                       shadow-lg fixed top-0 left-0 z-50">

      <h1 className="text-3xl font-extrabold text-white tracking-wide">
        IMAGE VAULT
      </h1>
      <nav className="">
        <Link to="/upload-image" className="bg-white/29 p-2 rounded font-bold text-blue-500">Upload Image</Link>
      </nav>

      <div className="flex items-center gap-6 ">
        <span className="px-4 py-2 bg-white/20 rounded-xl shadow-md">
          {shortAccount}
        </span>

        <button
          onClick={logout}
          className="px-4 py-2 bg-red-500 hover:bg-red-600 rounded-lg font-semibold"
        >
          Logout
        </button>
      </div>
    </header>
  );
};


export default Header