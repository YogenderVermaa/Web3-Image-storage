import React from 'react'
import { useWeb3Context } from '../contexts/useWeb3Context'

const Home = () => {
  const {web3State} = useWeb3Context();
  const {selectAccount} = web3State;
  // console.log(selectAccount)
  return (
    <div>Home</div>
  )
}

export default Home