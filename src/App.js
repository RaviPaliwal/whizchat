import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import LoginPage from './Components/LoginPage';
import HomePage from './Components/HomePage';
import { GenStateProvider } from './Context/GeneralContext';
import { ConversationContextProvider } from './Context/ConversationContext';


export default function App() {
  

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" index element={< LoginPage />}/>
        <Route path="/chats" element={<GenStateProvider><ConversationContextProvider><HomePage/></ConversationContextProvider></GenStateProvider>}/>
        {/* Add more routes here if needed */}

      </Routes>
    </BrowserRouter>
  );
}
