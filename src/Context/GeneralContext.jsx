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
    // Modify the style properties
    chatsElement.style.display = "none"
    chatList.style.maxWidth="100%"
    chatList.style.flexGrow="1"
    setToggle(true);
  
  
  }
  // Update toggle state based on screen width
  useEffect(() => {
    const handleResize = () => {
      const newScreenWidth = window.innerWidth;
      if (newScreenWidth <= 768) {
        setToggle(false);
      } else {
        setToggle(true);
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
  }, []);

  const value = {
    toggle,
    setToggle,
    OpenChats,
  };

  return (
    <GeneralContext.Provider value={value}>
      {children}
    </GeneralContext.Provider>
  );
};
