import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import LoginPage from './Components/LoginPage';
import HomePage from './Components/HomePage';
import { GenStateProvider } from './Context/GeneralContext';


export default function App() {
  

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
