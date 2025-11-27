import axios from "axios";
import { useWeb3Context } from "../contexts/useWeb3Context";
import { useEffect, useState } from "react";
import { Mosaic } from "react-loading-indicators";

const GetImage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const imagePerPage = 2;
  const [images, setImages] = useState([]);
  const [totalHashes, setTotalHashes] = useState(0);
  const [loading, setLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);

  const { web3State } = useWeb3Context();
  const { selectAccount, contractInstance } = web3State;

  const getImageHashes = async () => {
    if (!contractInstance || !selectAccount) return [];
    const ipfsHashes = await contractInstance.viewFiles(selectAccount);
    return Object.values(ipfsHashes);
  };

  useEffect(() => {
    const getImage = async () => {
      try {
        setLoading(true);
        const ipfsHashArray = await getImageHashes();
        setTotalHashes(ipfsHashArray.length);

        if (ipfsHashArray.length === 0) {
          setImages([]);
          return;
        }

        const url = import.meta.env.VITE_BACKEND_URL;
        const token = localStorage.getItem("token");

        const res = await axios.post(
          `${url}/api/getImage?page=${currentPage}&limit=${imagePerPage}`,
          ipfsHashArray,
          {
            headers: {
              "access-token": token,
            },
          }
        );

        setImages(res.data.data || []);
      } catch (err) {
        console.log("Error loading images", err);
        setImages([]);
      } finally {
        setLoading(false);
      }
    };

    if (contractInstance && selectAccount) getImage();
  }, [selectAccount, contractInstance, currentPage]);

  const pagination = (pageNumber) => {
    if (pageNumber < 1) return;
    setCurrentPage(pageNumber);
  };

  const isLastPage = currentPage * imagePerPage >= totalHashes;

  return loading ? (
    <div className="relative w-full min-h-screen bg-slate-950 flex justify-center items-center">
      <Mosaic color="#6366f1" size="medium" text="" textColor="" />
    </div>
  ) : (
    <div className="w-full min-h-screen bg-slate-950 flex flex-col justify-center items-center py-16">

      {/* IMAGE GRID */}
      {images.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-7xl px-6">
          {images.map((imgData, index) => (
            <div
              key={index}
              onClick={() => setPreviewImage(`data:image/*;base64,${imgData}`)}
              className="group cursor-pointer relative rounded-xl overflow-hidden bg-slate-900/50 backdrop-blur-sm border border-slate-800 hover:border-indigo-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/20"
            >
              {/* Image */}
              <div className="aspect-square overflow-hidden bg-slate-900">
                <img
                  src={`data:image/*;base64,${imgData}`}
                  alt={`Image ${index + 1}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Overlay on Hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <div className="w-full flex justify-between items-center">
                  <span className="text-white text-sm font-medium">
                    Image #{(currentPage - 1) * imagePerPage + index + 1}
                  </span>
                  <div className="px-3 py-1.5 bg-white/90 rounded-lg text-slate-900 text-xs font-semibold">
                    View
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="w-20 h-20 bg-slate-900 rounded-2xl flex items-center justify-center border border-slate-800 mb-4">
            <svg className="w-10 h-10 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <p className="text-slate-400 text-lg">No images found</p>
        </div>
      )}

      {/* PAGINATION */}
      {images.length > 0 && (
        <div className="flex gap-3 mt-12">
          <button
            onClick={() => pagination(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-6 py-2.5 rounded-lg font-medium transition-all ${
              currentPage === 1
                ? "bg-slate-800 text-slate-600 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-500/30 hover:shadow-xl hover:shadow-indigo-500/40"
            }`}
          >
            Previous
          </button>

          <div className="flex items-center px-4 py-2.5 bg-slate-900 border border-slate-800 rounded-lg text-slate-300 text-sm font-medium">
            Page {currentPage}
          </div>

          <button
            onClick={() => pagination(currentPage + 1)}
            disabled={isLastPage}
            className={`px-6 py-2.5 rounded-lg font-medium transition-all ${
              isLastPage
                ? "bg-slate-800 text-slate-600 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-500/30 hover:shadow-xl hover:shadow-indigo-500/40"
            }`}
          >
            Next
          </button>
        </div>
      )}

      {/* PREVIEW MODAL */}
      {previewImage && (
        <div 
          className="fixed inset-0 bg-black/90 backdrop-blur-md flex justify-center items-center z-[999] animate-fadeIn"
          onClick={() => setPreviewImage(null)}
        >
          <div 
            className="relative max-w-[90%] max-h-[90%]"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={previewImage}
              alt="Preview"
              className="rounded-xl shadow-2xl max-h-[90vh] max-w-[90vw] object-contain border border-slate-800"
            />

            {/* Close Button */}
            <button
              onClick={() => setPreviewImage(null)}
              className="absolute -top-4 -right-4 w-12 h-12 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-white rounded-full flex justify-center items-center text-xl font-bold shadow-xl transition-all hover:scale-110"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
      `}</style>
    </div>
  );
};

export default GetImage;