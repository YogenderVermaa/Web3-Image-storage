import axios from "axios";
import { useWeb3Context } from "../contexts/useWeb3Context";
import { useEffect, useState, useCallback, useRef } from "react";
import { useImageStore } from "../store/imageStore";

const IMAGE_PER_PAGE = 3;

const getImageMimeType = (base64) => {
  if (base64.startsWith("/9j/")) return "image/jpeg";
  if (base64.startsWith("iVBORw0KGgo")) return "image/png";
  if (base64.startsWith("R0lGOD")) return "image/gif";
  if (base64.startsWith("UklGR")) return "image/webp";
  return "image/png";
};

const getImageSrc = (imgData) => {
  if (!imgData) return "";
  if (imgData.startsWith("data:image/")) return imgData;
  return `data:${getImageMimeType(imgData)};base64,${imgData}`;
};

const GetImage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [previewImage, setPreviewImage] = useState(null);
  const isFetchingHashesRef = useRef(false);

  const {
    cachedPages,
    setCache,
    totalHashes,
    ipfsHashes,
    hashOwner,
    setHashesForAccount,
    clearCache,
  } = useImageStore();

  const { web3State } = useWeb3Context();
  const { selectAccount, contractInstance } = web3State;

  useEffect(() => {
    setCurrentPage(1);
  }, [selectAccount]);

  const getImageHashes = useCallback(async () => {
    if (!contractInstance || !selectAccount) return [];
    const ipfsHashes = await contractInstance.viewFiles(selectAccount);
    return Object.values(ipfsHashes).filter(Boolean).map(String);
  }, [contractInstance, selectAccount]);

  useEffect(() => {
    let isMounted = true;

    const loadHashes = async () => {
      try {
        if (!selectAccount || !contractInstance) return;
        if (hashOwner === selectAccount && ipfsHashes.length > 0) return;
        if (isFetchingHashesRef.current) return;

        isFetchingHashesRef.current = true;
        setErrorMessage("");
        setLoading(true);
        const hashes = await getImageHashes();
        if (!isMounted) return;
        setHashesForAccount(selectAccount, hashes);
      } catch (err) {
        console.log("Error loading image hashes", err);
        setErrorMessage("Could not load image records from the contract.");
        if (isMounted) clearCache();
      } finally {
        isFetchingHashesRef.current = false;
        if (isMounted) setLoading(false);
      }
    };

    loadHashes();

    return () => {
      isMounted = false;
    };
  }, [
    selectAccount,
    contractInstance,
    hashOwner,
    ipfsHashes.length,
    getImageHashes,
    setHashesForAccount,
    clearCache,
  ]);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getImage = async () => {
      if (!selectAccount || !contractInstance) return;
      if (hashOwner !== selectAccount) return;
      if (ipfsHashes.length === 0) return;
      if (cachedPages[currentPage]) return;

      const start = (currentPage - 1) * IMAGE_PER_PAGE;
      const selectedHashes = ipfsHashes.slice(start, start + IMAGE_PER_PAGE);
      if (selectedHashes.length === 0) return;

      try {
        setLoading(true);
        setErrorMessage("");
        const url = import.meta.env.VITE_BACKEND_URL;
        const token = localStorage.getItem("token");

        if (!url) {
          throw new Error("Missing VITE_BACKEND_URL");
        }

        if (!token) {
          throw new Error("Missing auth token");
        }

        const res = await axios.post(`${url}/api/getImage`, selectedHashes, {
          signal: controller.signal,
          headers: {
            "access-token": token,
          },
        });

        if (!isMounted) return;
        setCache(currentPage, res.data.data || []);
      } catch (err) {
        if (err.name === "CanceledError" || err.code === "ERR_CANCELED") return;
        console.log("Error loading images", err);
        if (isMounted) {
          setErrorMessage("Could not load images from the server. Check backend URL, auth token, and server logs.");
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    getImage();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [
    selectAccount,
    contractInstance,
    hashOwner,
    ipfsHashes,
    currentPage,
    cachedPages,
    setCache,
  ]);

  const pagination = (pageNumber) => {
    if (pageNumber < 1) return;
    setCurrentPage(pageNumber);
  };

  const isLastPage = currentPage * IMAGE_PER_PAGE >= totalHashes;
  const images = cachedPages[currentPage] || [];

  const downloadImage = () => {
    const link = document.createElement("a");
    link.href = previewImage;
    link.download = "image.png";
    link.click();
  };

  if (loading) {
    return (
      <div className="flex min-h-[360px] w-full items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900">
        <div className="text-sm font-medium text-zinc-400">Loading images...</div>
      </div>
    );
  }

  return (
    <div className="w-full">
      {errorMessage && (
        <div className="mb-4 rounded-lg border border-zinc-700 bg-zinc-900 p-4 text-sm text-zinc-300">
          {errorMessage}
        </div>
      )}

      {images.length > 0 ? (
        <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          {images.map((imgData, index) => {
            const src = getImageSrc(imgData);
            return (
              <button
                key={index}
                onClick={() => setPreviewImage(src)}
                className="overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900 text-left shadow-2xl shadow-black/20 hover:border-zinc-600"
              >
                <div className="aspect-square bg-zinc-950">
                  <img src={src} alt={`Image ${index + 1}`} className="h-full w-full object-cover" loading="lazy" />
                </div>
                <div className="flex items-center justify-between px-4 py-3">
                  <span className="text-sm font-medium text-zinc-100">
                    Image #{(currentPage - 1) * IMAGE_PER_PAGE + index + 1}
                  </span>
                  <span className="text-xs font-medium text-zinc-500">View</span>
                </div>
              </button>
            );
          })}
        </div>
      ) : (
        <div className="flex min-h-[320px] flex-col items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900 p-8 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-zinc-700 bg-zinc-950">
            <svg className="h-6 w-6 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.7} d="M4 16l4-4a2 2 0 012.8 0l1.2 1.2L15 10a2 2 0 012.8 0L20 12.2M4 6h16v14H4z" />
            </svg>
          </div>
          <p className="mt-4 text-sm font-medium text-zinc-400">No images found</p>
        </div>
      )}

      {images.length > 0 && (
        <div className="mt-6 flex items-center justify-center gap-3">
          <button
            onClick={() => pagination(currentPage - 1)}
            disabled={currentPage === 1}
            className="rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-2 text-sm font-medium text-zinc-200 hover:bg-zinc-800 disabled:cursor-not-allowed disabled:border-zinc-800 disabled:text-zinc-600"
          >
            Previous
          </button>

          <div className="rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-2 text-sm font-medium text-zinc-400">
            Page {currentPage}
          </div>

          <button
            onClick={() => pagination(currentPage + 1)}
            disabled={isLastPage}
            className="rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-2 text-sm font-medium text-zinc-200 hover:bg-zinc-800 disabled:cursor-not-allowed disabled:border-zinc-800 disabled:text-zinc-600"
          >
            Next
          </button>
        </div>
      )}

      {previewImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
          onClick={() => setPreviewImage(null)}
        >
          <div className="relative max-h-[90vh] max-w-[90vw]" onClick={(e) => e.stopPropagation()}>
            <img
              src={previewImage}
              alt="Preview"
              className="max-h-[90vh] max-w-[90vw] rounded-lg bg-zinc-950 object-contain"
            />

            <div className="absolute right-0 top-0 flex translate-y-[-120%] gap-2">
              <button
                onClick={downloadImage}
                className="rounded-lg bg-white px-3 py-2 text-sm font-semibold text-zinc-950 shadow-sm hover:bg-zinc-200"
              >
                Download
              </button>
              <button
                onClick={() => setPreviewImage(null)}
                className="rounded-lg bg-white px-3 py-2 text-sm font-semibold text-zinc-950 shadow-sm hover:bg-zinc-200"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GetImage;
