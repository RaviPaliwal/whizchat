import { useState, useContext, createContext, useEffect } from "react";

const GeneralContext = createContext();

export const useGenContext = () => {
  return useContext(GeneralContext);
};

export const GenStateProvider = ({ children }) => {
  const [toggle, setToggle] = useState(true);

  const OpenChats = () => {
    const chatsElement = document.getElementById("chats");
    const chatList = document.getElementById("chatList");
    
    if (chatsElement && chatList) {
      chatsElement.style.display = "none";
      chatList.style.maxWidth = "100%";
      chatList.style.flexGrow = "1";
      setToggle(true);
    }
  };

  const CloseChats = () => {
    const chatsElement = document.getElementById("chats");
    const chatList = document.getElementById("chatList");
    
    if (chatsElement && chatList) {
      chatsElement.style.display = "block";
      chatList.style.maxWidth = "40%";
      chatList.style.flexGrow = "0";
      setToggle(false); // Corrected: should be false for closing
    }
  };

  useEffect(() => {
    const handleResize = () => {
      const newScreenWidth = window.innerWidth;
      if (newScreenWidth <= 768) {
        CloseChats(); // Close chats on smaller screens
      } else {
        OpenChats(); // Open chats on larger screens
      }
    };

    // Initial check
    handleResize();

    // Add event listener to handle window resize
    window.addEventListener("resize", handleResize);

    // Clean up the event listener when component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const value = {
    toggle,
    setToggle,
    OpenChats,
    CloseChats,
  };

  return (
    <GeneralContext.Provider value={value}>
      {children}
    </GeneralContext.Provider>
  );
};
