import { useState } from "react";
import axios from "axios";
import { useWeb3Context } from "../contexts/useWeb3Context";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function UploadImage() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const { web3State } = useWeb3Context();
  const { selectAccount, contractInstance } = web3State;
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleFileSelect = (e) => {
    const f = e.target.files[0];
    if (!f) return;
    setFile(f);
    setPreview(URL.createObjectURL(f));
  };

  const uploadImageHash = async (ipfsHash) => {
    const tx = await contractInstance.uploadFile(selectAccount, ipfsHash);
    await toast.promise(tx.wait(), {
      loading: "Saving on blockchain...",
      success: "Upload successful 🎉",
      error: "Transaction failed",
    });

    navigate("/home", { replace: true });
  };

  const handleImageUpload = async () => {
    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("file", file);

      const token = localStorage.getItem("token");
      const url = import.meta.env.VITE_BACKEND_URL;

      const res = await toast.promise(
        axios.post(`${url}/api/upload-image`, formData, {
          headers: {
            "access-token": token,
            "Content-Type": "multipart/form-data",
          },
        }),
        {
          loading: "Encrypting & uploading...",
          success: "Uploaded to IPFS 🚀",
          error: "Upload failed",
        }
      );

      await uploadImageHash(res.data?.data?.ipfsHash);
    } catch (error) {
      console.error(error);
      toast.error("Upload failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex flex-col items-center justify-center px-4">

      {/* Upload Card */}
      <div className="w-full max-w-lg bg-white/20 backdrop-blur-2xl rounded-3xl shadow-2xl p-8 border border-white/30">

        <h2 className="text-3xl font-bold text-white text-center mb-6">
          Upload Image
        </h2>

        {/* Upload Box */}
        <label className="
            flex flex-col items-center justify-center
            w-full h-56 rounded-2xl cursor-pointer
            border-2 border-dashed border-white/40
            bg-white/10 backdrop-blur-xl
            hover:bg-white/20 hover:border-blue-300
            transition-all duration-300
          "
        >
          {!preview ? (
            <div className="flex flex-col items-center text-white/90">
              <svg
                className="w-16 h-16 mb-3 animate-pulse text-blue-400"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.4"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M7 16a4 4 0 01-.88-7.903A5.001 5.001 0 0117 9h1a3 3 0 010 6h-1m-4-4v10m0 0l-3-3m3 3l3-3"
                />
              </svg>
              <p className="text-lg font-semibold">Click to select image</p>
              <p className="text-sm text-white/70 mt-1">
                JPG • PNG • JPEG
              </p>
            </div>
          ) : (
            <img
              src={preview}
              className="w-full h-full object-cover rounded-xl"
            />
          )}

          <input
            type="file"
            className="hidden"
            onChange={handleFileSelect}
            disabled={loading}
          />
        </label>

        {/* Upload Button */}
        {file && (
          <button
            onClick={handleImageUpload}
            disabled={loading}
            className="
              mt-8 w-full flex items-center justify-center gap-3
              py-4 rounded-xl
              bg-gradient-to-r from-blue-600 to-indigo-600
              text-white text-lg font-bold tracking-wide
              shadow-lg hover:from-blue-700 hover:to-indigo-700
              active:scale-[0.97]
              transition-all duration-300
            "
          >
            {loading ? (
              <svg
                className="w-7 h-7 animate-spin"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                />
                <path
                  className="opacity-75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 12a8 8 0 018-8"
                />
              </svg>
            ) : (
              "Upload"
            )}
          </button>
        )}

        {!file && (
          <p className="text-center text-white/80 mt-6 text-lg">
            Select an image to continue
          </p>
        )}
      </div>
    </div>
  );
}
