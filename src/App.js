import React, { useEffect } from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import LoginPage from './Components/LoginPage';
import HomePage from './Components/HomePage';
import { GenStateProvider } from './Context/GeneralContext';
import { socketConnect } from './Socket/SocketConfig';
import { readReceipt } from './Socket/ReceiveEvents';
import { sendMessage } from './Socket/SendEvents';
const socket = socketConnect();

export default function App() {
  sendMessage(socket,"Hey I Am connected")

  useEffect(()=>{
    readReceipt(socket)
  },[socket])

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" index element={< LoginPage />}/>
        <Route path="/chats" element={<GenStateProvider><HomePage/></GenStateProvider>}/>
        {/* Add more routes here if needed */}

      </Routes>
    </BrowserRouter>
  );
}
