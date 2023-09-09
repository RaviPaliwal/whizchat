import { useState, useContext, createContext, useEffect } from "react";

const GeneralContext = createContext();

export const useGenContext = () => {
  return useContext(GeneralContext);
};

export const GenStateProvider = ({ children }) => {
  const [autosetView, setAutoSetView] = useState(true);
  const [handle, setHandle] = useState(0);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);


  useEffect(() => {
    const chatList = document.getElementById("chatList");
    const chatsElement = document.getElementById("chats");
    if (window.innerWidth <= 768) {
      chatList.style.display = "none";
      chatList.style.maxWidth = "100%";
      chatList.style.flexGrow = 1;
      chatsElement.style.display = "block";
    } else {
      chatList.style.display = "block";
    }
    const handleResize = () => {
      const newScreenWidth = window.innerWidth;
      setScreenWidth(newScreenWidth);
      console.log(newScreenWidth);
      if (newScreenWidth <= 768) {
        setHandle(newScreenWidth); //Above Styles
      } else {
        setHandle(newScreenWidth);
        chatsElement.style.display = "block";
        chatList.style.maxWidth = "40%";
        chatList.style.flexGrow = 0;
        chatsElement.style.flexGrow = 1;
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
  }, [handle]);

  const value = {
    autosetView,
    screenWidth,
    setAutoSetView
  };

  return (
    <GeneralContext.Provider value={value}>{children}</GeneralContext.Provider>
  );
};
