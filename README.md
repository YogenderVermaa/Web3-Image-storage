📦 Web3 Image Storage
🔗 Live Demo

Frontend (Vercel):
👉 https://web3-image-storage-nqq8.vercel.app

A decentralized image upload and retrieval application built with React + Vite (frontend) and Node.js + Express + MongoDB + Pinata (backend).
This project allows users to upload images securely using IPFS via Pinata, store metadata in MongoDB, and fetch images with a clean UI.

🚀 Features

Upload images to IPFS (Pinata)

Store metadata in MongoDB

Decentralized architecture

Web3 wallet signing support (Ethers.js)

JWT-based authentication

Fully deployed on Vercel + Render

Beautiful UI with TailwindCSS

📁 Project Structure
Web3-Image-storage/
│
├── client/      # Frontend (React + Vite)
│   ├── src/
│   ├── public/
│   └── vite.config.js
│
└── server/      # Backend (Node + Express)
    ├── src/
    ├── middleware/
    ├── controllers/
    ├── models/
    └── index.js

🛠️ Tech Stack
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![NodeJS](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38BDF8?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Pinata](https://img.shields.io/badge/Pinata-IPFS-blue?style=for-the-badge)
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=jsonwebtokens)
![Render](https://img.shields.io/badge/Render-46E3B7?style=for-the-badge&logo=render&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

Frontend

React 19

Vite 7

TailwindCSS 4

Axios

Lottie Animations

React Router DOM

Backend

Node.js + Express

MongoDB + Mongoose

Pinata IPFS SDK

Multer

JWT Authentication

Ethers.js

🔧 Environment Variables
🔙 Backend (on Render)
PORT=3000
CORS_ORIGIN=https://web3-image-storage-nqq8.vercel.app
MONGODB_URI=your-mongodb-connection-string
PINATA_API_KEY=your-pinata-api-key
PINATA_SECRET_KEY=your-pinata-secret-key
JWT_SECRETKEY=your-jwt-secret

🎨 Frontend (on Vercel)
VITE_API_URL=https://your-backend.onrender.com

🖥️ Running Locally
1️⃣ Clone the project
git clone https://github.com/YogenderVermaa/Web3-Image-storage.git
cd Web3-Image-storage

2️⃣ Install frontend
cd client
npm install
npm run dev

3️⃣ Install backend
cd ../server
npm install
npm run dev

🌐 Deployment Setup
Frontend → Vercel

Root Directory: client

Build Command: npm run build

Publish Directory: dist

Env: VITE_API_URL=<backend-url>

Backend → Render

Root Directory: server

Build Command: npm install

Start Command: npm run start

Add environment variables in dashboard 


⭐ Give a Star

If you like the project, leave a ⭐ on GitHub to support it!
