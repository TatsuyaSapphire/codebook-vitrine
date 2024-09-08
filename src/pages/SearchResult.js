import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { searchProducts } from '../data/api';

export const SearchResults = () => {
  const [results, setResults] = useState([]);
  const location = useLocation();

  // Récupérer le paramètre 'query' dans l'URL
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get('query');

  useEffect(() => {
    // Fonction pour effectuer la recherche
    const fetchResults = async () => {
      if (query) {
        const searchResults = await searchProducts(query);
        setResults(searchResults);
      }
    };
    
    fetchResults();
  }, [query]);  // Effectuer la recherche chaque fois que 'query' change

  return (
    <div>
      <h1>Résultats de la recherche</h1>
      {results.length > 0 ? (
        <ul>
          {results.map((product) => (
            <li key={product.id}>
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <p>Prix : {product.price}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>Aucun produit trouvé pour "{query}".</p>
      )}
    </div>
  );
};
