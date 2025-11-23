import React from 'react'
import { useWeb3Context } from '../contexts/useWeb3Context'
import UploadImage from '../components/uploadImage.jsx';
import GetImage  from '../components/GetImage.jsx';
const Home = () => {
  const {web3State} = useWeb3Context();
  const {selectAccount} = web3State;
  // console.log(selectAccount)
  return (
    <div className='w-full h-screen flex justify-center flex-col items-center bg-gradient-to-r from-blue-600 to-white/30'>
      <UploadImage/>
      <GetImage/>
    </div>
  )
}

export default Home