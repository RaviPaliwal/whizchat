import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import LoginPage from './Components/LoginPage';
import HomePage from './Components/HomePage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" index element={< LoginPage />}/>
        <Route path="/chats" element={<HomePage/>}/>
        {/* Add more routes here if needed */}

      </Routes>
    </BrowserRouter>
  );
}
