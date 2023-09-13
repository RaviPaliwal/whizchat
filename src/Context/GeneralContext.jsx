import React, { useState, useContext, createContext, useEffect } from 'react';
import { socketConnect } from '../Socket/SocketConfig';

const GeneralContext = createContext();

export const useGenContext = () => {
  return useContext(GeneralContext);
};

export const GenStateProvider = ({ children }) => {
  const [autosetView, setAutoSetView] = useState(true);
  const [handle, setHandle] = useState(0);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const socket = socketConnect();

  useEffect(() => {
    const chatList = document.getElementById('chatList');
    const chatsElement = document.getElementById('chats');

    // Set initial display based on window width
    if (chatList && chatsElement) {
      if (window.innerWidth <= 768) {
        chatList.style.display = 'none';
        chatList.style.maxWidth = '100%';
        chatList.style.flexGrow = 1;
        chatsElement.style.display = 'block';
      } else {
        chatList.style.display = 'block';
      }
    }

    const handleResize = () => {
      const newScreenWidth = window.innerWidth;
      setScreenWidth(newScreenWidth);
      // console.log(newScreenWidth);

      // Adjust display based on window width
      if (chatList && chatsElement) {
        if (newScreenWidth <= 768) {
          setHandle(newScreenWidth);
        } else {
          setHandle(newScreenWidth);
          chatsElement.style.display = 'block';
          chatList.style.maxWidth = '40%';
          chatList.style.flexGrow = 0;
          chatsElement.style.flexGrow = 1;
        }
      }
    };

    // Initial check
    handleResize();

    // Add event listener to handle window resize
    window.addEventListener('resize', handleResize);

    // Clean up the event listener when component unmounts
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [handle]);

  const value = {
    autosetView,
    screenWidth,
    socket,
    setAutoSetView,
  };

  return (
    <GeneralContext.Provider value={value}>{children}</GeneralContext.Provider>
  );
};