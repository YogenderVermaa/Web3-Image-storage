import axios from "axios";
import { useWeb3Context } from "../contexts/useWeb3Context";
import { useState } from "react";
const GetImage = () => {
    const [currentPage,setCurrentPage] = useState(1)
    const [imagePerPage,setImagePerPage] = useState(2)
    const {web3State}  = useWeb3Context()
    const {selectAccount,contractInstance} = web3State

    const getImageHashes = async() => {
        const ipfsHashes = await contractInstance.viewFiles(selectAccount)
        return ipfsHashes
    }

    const getImage = async() => {
        const ipfsHashes =  await getImageHashes()
        const ipfsHashArray = Object.values(ipfsHashes)
        const url = import.meta.env.VITE_BACKEND_URL
        const token = localStorage.getItem("token")
        const config = {
            headers:{
                "access-token":token
            }
        }
        const res = await axios.post(`${url}/api/getImage?page=${currentPage}&limit=${imagePerPage}`,ipfsHashArray,config)
    }
    return (<>
    <button onClick={getImage} className="m-10 bg-gradient-to-l from-blue-400 to-purple-700 text-white text-3xl p-4 rounded-md font-semibold cursor-pointer">
        Get Image  
    </button>
    </>)
}

export default GetImage;