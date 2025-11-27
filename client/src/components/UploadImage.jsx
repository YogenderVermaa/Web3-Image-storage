import { useState } from "react";
import axios from "axios"
import { useWeb3Context } from "../contexts/useWeb3Context";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function UploadImage() {
  const [file,setFile] = useState(null)
  const {web3State} = useWeb3Context();
  const {selectAccount,contractInstance} = web3State
  const [loading,setLoading] = useState(false)
  const navigate = useNavigate()

  const uploadImageHash = async (ipfsHash) => {
    if(!contractInstance){
      console.log("Contract not connected");
    return;
    }
    console.log("Uploading to contract...",contractInstance);
    const tx = await contractInstance.uploadFile(selectAccount,ipfsHash)
    console.log("Transection:",tx)
    await toast.promise(tx.wait(),{
      loading:"Transection is pending",
      success:"Transection is successfull",
      error:"Transection failed"
    })
    navigate("/home",{replace:true})
    
  }
  const handleImageUpload =async () => {
try {
  
      setLoading(true)
      const formData = new FormData()
      formData.append('file',file)
      // formData.append("selectedAccount",selectAccount)
      const accessToken = localStorage.getItem("token")
      
      // console.log("this is the file:::::: ",file)
      const url=import.meta.env.VITE_BACKEND_URL;
      const res = await toast.promise(axios.post(`${url}/api/upload-image`,formData,{
        headers: {
          "access-token":accessToken,
          "Content-Type":"multipart/form-data"
        }
      }) ,{
        loading: "Image uploading",
        success: "Image uploaded",
        error: "Image Upload Failed"
      })
      await uploadImageHash(res.data?.data?.ipfsHash)
      console.log(res.data)
} catch (error) {
  console.error(error)
  toast.error("Image Upload Failed at catch block")
}finally{
  setLoading(false)
}
  }

  console.log(file)
  return (
  <>
  {/* Upload Box */}
  <label className="mx-10 flex flex-col items-center justify-center
      w-72 h-44 rounded-3xl cursor-pointer
      bg-white/20 backdrop-blur-xl shadow-[0_0_30px_rgba(0,0,0,0.1)]
      border border-white/30
      hover:bg-white/30 hover:shadow-[0_0_40px_rgba(0,0,0,0.2)]
      hover:border-blue-400 transition-all duration-500 ease-out">

    <div className="flex flex-col items-center justify-center text-gray-700">
      <svg
        className="w-12 h-12 mb-2 animate-pulse text-blue-600 "
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M7 16a4 4 0 01-.88-7.903A5.001 5.001 0 0117 9h1a3 3 0 010 6h-1m-4-4v10m0 0l-3-3m3 3l3-3"
        />
      </svg>
      <p className="text-sm font-semibold">Click to upload image</p>
      <p className="text-xs text-gray-500 mt-1">PNG | JPG | JPEG</p>
    </div>

    <input
      type="file"
      className="hidden"
      onChange={(e) => setFile(e.target.files[0])}
      disabled={loading}
    />
  </label>

  {/* Upload Button */}
  {file ? (
    <button
      onClick={handleImageUpload}
      disabled={loading}
      className="
        mx-10 mt-6
        flex items-center gap-3
        px-8 py-4
        rounded-2xl 
        bg-gradient-to-r from-blue-600 to-purple-700
        text-white font-bold text-xl tracking-wide
        shadow-[0_10px_30px_rgba(59,130,246,0.5)]
        hover:shadow-[0_12px_40px_rgba(99,102,241,0.6)]
        hover:from-blue-700 hover:to-purple-800
        active:scale-[0.97]
        transition-all duration-300
      "
    >
      <svg
        className="w-7 h-7 animate-spin-slow"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5-5m0 0l5 5m-5-5v12"
        />
      </svg>
      {loading ? "Uploading..." : "Upload"}
    </button>
  ) : (
    <p className="mx-10 mt-6 text-lg font-semibold text-red-500/80">
      Please select an image first.
    </p>
  )}
</>

  )
}

export default UploadImage