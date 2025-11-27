import axios from "axios";
import { useWeb3Context } from "../contexts/useWeb3Context";
import { useEffect, useState } from "react";
import {Slab} from "react-loading-indicators";

const GetImage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const imagePerPage = 2;
  const [images, setImages] = useState([]);
  const [totalHashes, setTotalHashes] = useState(0); // <-- IMPORTANT

  const { web3State } = useWeb3Context();
  const { selectAccount, contractInstance } = web3State;
  const [loading,setLoading] = useState(false)

  const getImageHashes = async () => {
    if (!contractInstance || !selectAccount) return [];
    const ipfsHashes = await contractInstance.viewFiles(selectAccount);
    return Object.values(ipfsHashes);
  };

  useEffect(() => {
    
    const getImage = async () => {
      try {
        setLoading(true)
        const ipfsHashArray = await getImageHashes();
        setTotalHashes(ipfsHashArray.length); // <-- SET TOTAL COUNT

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
      }finally{
        setLoading(false)
      }
    };

    if (contractInstance && selectAccount) getImage();
  }, [selectAccount, contractInstance, currentPage]);

  const pagination = (pageNumber) => {
    if (pageNumber < 1) return;
    setCurrentPage(pageNumber);
  };

  const isLastPage = currentPage * imagePerPage >= totalHashes;

  return loading? (<div className="absolute w-full h-screen flex justify-center items-center transform !scale-[2]">
    <Slab  color={["#32cd32", "#327fcd", "#cd32cd", "#cd8032"]}  />
  </div>):(
    <div className="w-full h-screen  flex flex-col justify-center items-center">

      {/* IMAGE GRID */}
      {images.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6 w-full">
          {images.map((imgData, index) => (
            <div
              key={index}
              className=" w-full  flex items-center justify-between rounded-xl shadow-xl bg-white/40 backdrop-blur-lg p-3 hover:scale-[1.04] transition-all duration-200"
            >
              <img
                src={`data:image/*;base64,${imgData}`}
                className="w-full h-56 object-cover rounded-lg"
              />
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-700 text-lg mt-8">No images found</p>
      )}

      {/* PAGINATION */}
      {images.length > 0?<div className="flex gap-4 mt-6">
        <button
          onClick={() => pagination(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded-lg shadow-md 
          ${currentPage === 1 ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"} 
          text-white transition`}
        >
          Prev
        </button>

        <button
          onClick={() => pagination(currentPage + 1)}
          disabled={isLastPage}
          className={`px-4 py-2 rounded-lg shadow-md 
          ${isLastPage ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"} 
          text-white transition`}
        >
          Next
        </button>
      </div>:null
      }
    </div>
  );
};

export default GetImage;
