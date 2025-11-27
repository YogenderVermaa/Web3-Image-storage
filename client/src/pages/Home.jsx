import React from 'react';
import { useWeb3Context } from '../contexts/useWeb3Context';
import Header from '../components/Header.jsx';
import GetImage from '../components/GetImage.jsx';

const Home = () => {
  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-blue-600 to-white/40 flex flex-col">
      
      {/* Content Section */}
      <div className="flex justify-center px-6 py-10">
        <div className="w-full max-w-6xl">
          <GetImage />
        </div>
      </div>

    </div>
  );
};

export default Home;
