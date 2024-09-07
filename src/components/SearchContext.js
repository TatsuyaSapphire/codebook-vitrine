import React, { createContext, useState, useContext } from 'react';

const SearchContext = createContext();

export const useSearch = () => {
  return useContext(SearchContext);
};

export const SearchProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchBar, setShowSearchBar] = useState(false);

  const openSearchBar = () => setShowSearchBar(true);
  const closeSearchBar = () => setShowSearchBar(false);

  return (
    <SearchContext.Provider
      value={{
        searchTerm,
        setSearchTerm,
        searchResults,
        setSearchResults,
        showSearchBar,
        openSearchBar,
        closeSearchBar,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};