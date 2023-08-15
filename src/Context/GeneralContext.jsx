import { useState, useContext, createContext, useEffect } from "react";

const GeneralContext = createContext();

export const useGenContext = () => {
  return useContext(GeneralContext);
};

export const GenStateProvider = ({ children }) => {
  const [toggle, setToggle] = useState(true);

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
  };

  return (
    <GeneralContext.Provider value={value}>
      {children}
    </GeneralContext.Provider>
  );
};
