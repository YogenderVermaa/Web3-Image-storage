import { useState } from "react"
import { web3Context } from "./createWeb3Context"

const Web3Provider = ({children}) => {
    const [web3State,setWeb3State] = useState({
        contractInstance:null,
        selectAccount:null,
    })

    const updateWeb3State = (newState) => {
      setWeb3State(prevState => ({
        ...prevState,
        ...newState
      }))
    }
  return (
    <web3Context.Provider value={{web3State,updateWeb3State}}>
        {children}
    </web3Context.Provider>
  )
}

export default Web3Provider