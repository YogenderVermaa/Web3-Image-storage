import Web3Provider from "./contexts/Web3Provider"; 
import { RouterProvider } from "react-router-dom";
import {routes} from './routes/routes';
import Wallet from "./pages/Wallet.jsx";
const App = () => {
  return (
    <>
    <Web3Provider>
      <RouterProvider router={routes}>
        <Wallet/>
      </RouterProvider>
    </Web3Provider>
    </>
  )
}



export default App