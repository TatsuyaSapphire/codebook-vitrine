import React, { createContext, useContext, useState } from 'react';

// Création du contexte
const SearchContext = createContext();

// Hook pour utiliser le contexte
export const useSearch = () => useContext(SearchContext);

// Fournisseur du contexte pour gérer l'état global
export const SearchProvider = ({ children }) => {
    const [showSearchBar, setShowSearchBar] = useState(false);

    return (
        <SearchContext.Provider value={{ showSearchBar, setShowSearchBar }}>
            {children}
        </SearchContext.Provider>
    );
};
