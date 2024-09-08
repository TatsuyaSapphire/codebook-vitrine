import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSearch } from './SearchContext';
import { useSelector } from 'react-redux';


export const SearchBar = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const { showSearchBar } = useSearch();
    const navigate = useNavigate();
    const theme = useSelector(state => state.themeState.theme);

    const handleSearch = (e) => {
      e.preventDefault();
      if (searchTerm) {
        navigate(`/search?query=${searchTerm}`);
      }
    };

    if (!showSearchBar) {
      return null;
  }


    return (

      <main className={`py-3 ${theme === 'light' ? 'light' : 'dark'}`}>
        <div className={`container ${theme === 'light' ? 'light' : 'dark'}`} style={{ display: showSearchBar ? 'block' : 'none' }}>
          <form className="d-flex justify-content-center" onSubmit={handleSearch}>
            <input
              type="text"
              className="form-control me-3"
              placeholder="Rechercher un produit..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button type="submit" className="btn btn-primary">
              Rechercher
            </button>
          </form>
        </div>
      </main>
    );
};