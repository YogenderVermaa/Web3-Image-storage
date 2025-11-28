import {useWeb3Context} from "../contexts/useWeb3Context"
import { Navigate } from "react-router-dom"
export default function ProtectedRoute({children}){
    const {web3State,initializing} = useWeb3Context()
    const {selectAccount} = web3State

    if(initializing) return 


    if(!selectAccount) return <Navigate to="/" replace/>



    return children

}