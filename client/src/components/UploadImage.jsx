import { useState } from "react";
import axios from "axios"
import { useWeb3Context } from "../contexts/useWeb3Context";
import toast from "react-hot-toast";

function UploadImage() {
  const [file,setFile] = useState(null)
  const {web3State} = useWeb3Context();
  const {selectAccount,contractInstance} = web3State

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
  }
  const handleImageUpload =async () => {
try {
      const formData = new FormData()
      formData.append('file',file)
      const url=import.meta.env.VITE_BACKEND_URL;
      const res = await toast.promise(axios.post(`${url}/api/upload-image`,formData) ,{
        loading: "Image uploading",
        success: "Image uploaded",
        error: "Image Upload Failed"
      })
      await uploadImageHash(res.data?.data?.ipfsHash)
      console.log(res.data)
      console.log(res.data?.data?.ipfsHash)
} catch (error) {
  console.error(error)
  toast.error("Image Upload Failed at catch block")
}
  }

  console.log(file)
  return (
  <>
    <input type="file" onChange={(e) => setFile(e.target.files[0])}></input>
    
    <button onClick={handleImageUpload}>uploadImage</button>
  </>
  )
}

export default UploadImage