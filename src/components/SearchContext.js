// src/context/SearchContext.jsx
import React, { createContext, useState, useContext } from 'react';

// Crée le contexte
const SearchContext = createContext();

// Fournisseur du contexte
export const SearchProvider = ({ children }) => {
  const [showSearchBar, setShowSearchBar] = useState(false);
  const toggleSearchBar = () => {
    setShowSearchBar((prev) => !prev);
  };

  return (
    <SearchContext.Provider value={{ showSearchBar, toggleSearchBar }}>
      {children}
    </SearchContext.Provider>
  );
};

// Hook personnalisé pour utiliser le contexte
export const useSearch = () => {
  const context = useContext(SearchContext);

  if (!context) {
    throw new Error('useSearch must be used within a SearchProvider');
  }

  return context;
};