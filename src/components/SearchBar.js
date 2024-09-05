import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSearch } from '../components/SearchContext';

export const SearchBar = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const { showSearchBar } = useSearch();
    const navigate = useNavigate();

    const handleSearch = (e) => {
      e.preventDefault();
      if (searchTerm) {
        navigate(`/search?query=${searchTerm}`);
      }
    };


    return (
      <div className='container' style={{ display: showSearchBar ? 'block' : 'none' }}>
          <form className="d-flex justify-content-center mb-3" onSubmit={handleSearch}>
            <input
              type="text"
              className="form-control"
              placeholder="Rechercher un produit..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button type="submit" className="btn btn-primary">
              Rechercher
            </button>
          </form>
      </div>
    );
};