import React from 'react'
import { useWeb3Context } from '../contexts/useWeb3Context'
import UploadImage from '../components/uploadImage.jsx';
import GetImage  from '../components/GetImage.jsx';
const Home = () => {
  const {web3State} = useWeb3Context();
  const {selectAccount} = web3State;
  // console.log(selectAccount)
  return (
    <div>
      <UploadImage/>
    </div>
  )
}

export default Home