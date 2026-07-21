import { useEffect, useState } from "react";
import axios from "axios";
import { useWeb3Context } from "../contexts/useWeb3Context";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useImageStore } from "../store/imageStore.js";

export default function UploadImage() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const { web3State } = useWeb3Context();
  const { selectAccount, contractInstance } = web3State;
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { clearCache } = useImageStore();

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  const handleFileSelect = (e) => {
    const f = e.target.files[0];
    if (!f) return;
    if (preview) URL.revokeObjectURL(preview);
    setFile(f);
    setPreview(URL.createObjectURL(f));
  };

  const uploadImageHash = async (ipfsHash) => {
    const tx = await contractInstance.uploadFile(selectAccount, ipfsHash);
    await toast.promise(tx.wait(), {
      loading: "Saving on blockchain...",
      success: "Upload successful",
      error: "Transaction failed",
    });

    clearCache();
    navigate("/gallery", { replace: true });
  };

  const handleImageUpload = async () => {
    if (!file || loading) return;

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
          loading: "Encrypting and uploading...",
          success: "Uploaded to IPFS",
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
    <div className="mx-auto w-full max-w-2xl">
      <div className="mb-6 border-b border-zinc-800 pb-6">
        <h1 className="text-3xl font-semibold tracking-tight text-white">Upload Image</h1>
        <p className="mt-2 text-sm text-zinc-500">Choose an image, then store its encrypted IPFS hash on-chain.</p>
      </div>

      <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6 shadow-2xl shadow-black/20">
        <label className="flex h-72 w-full cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-zinc-700 bg-zinc-950 text-center hover:bg-zinc-900">
          {!preview ? (
            <div className="px-6">
              <svg className="mx-auto h-10 w-10 text-zinc-500" fill="none" stroke="currentColor" strokeWidth="1.7" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M7 16a4 4 0 01-.88-7.9A5 5 0 0117 9h1a3 3 0 010 6h-1m-5-4v10m0 0-3-3m3 3 3-3" />
              </svg>
              <p className="mt-4 text-sm font-semibold text-zinc-100">Click to select image</p>
              <p className="mt-1 text-xs text-zinc-500">JPG, PNG, or JPEG</p>
            </div>
          ) : (
            <img src={preview} alt="Selected preview" className="h-full w-full rounded-lg object-cover" />
          )}

          <input type="file" accept="image/*" className="hidden" onChange={handleFileSelect} disabled={loading} />
        </label>

        <button
          onClick={handleImageUpload}
          disabled={!file || loading}
          className="mt-5 w-full rounded-lg bg-white px-4 py-3 text-sm font-semibold text-zinc-950 hover:bg-zinc-200 disabled:cursor-not-allowed disabled:bg-zinc-800 disabled:text-zinc-500"
        >
          {loading ? "Uploading..." : "Upload"}
        </button>
      </div>
    </div>
  );
}
