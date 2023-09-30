import React, { createContext, useContext, useState } from "react";
import { BaseUrl } from "../config";

const SearchContext = createContext();

export const useSearchContext = () => {
  return useContext(SearchContext);
};

export const SearchContextProvider = ({ children }) => {
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async (inputValue) => {
    if (inputValue.length >= 3) {
      try {
        const headersList = {
          Accept: "*/*",
        };

        const response = await fetch(
          `${BaseUrl}/api/users/search?username=${inputValue}`,
          {
            method: "GET",
            headers: headersList,
          }
        );

        const data = await response.json(); // Parse response as JSON
        if (!data.error) {
          setSearchResults(data);
        }
        console.log(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    } else {
      setSearchResults([]); // Clear search results if query is less than 3 characters
    }
    return searchResults;
  };

  const value = {
    searchResults,
    setSearchResults,
    handleSearch,
  };

  return (
    <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
  );
};
