import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom'; // Utiliser useSearchParams pour capturer les paramètres
import { searchProducts } from '../data/api'; // Fonction pour rechercher dans Firestore
import { Link } from 'react-router-dom';
import Star from '../assets/etoile.png';

export const SearchResults = () => {
  const [results, setResults] = useState([]);
  const [searchParams] = useSearchParams(); // Récupérer les paramètres de requête
  const query = searchParams.get('query'); // Récupérer la valeur du paramètre "query"

  const theme = useSelector(state => state.themeState.theme);

  useEffect(() => {
    // Fonction pour effectuer la recherche
    const fetchResults = async () => {
      if (query) {
        const searchResults = await searchProducts(query);
        setResults(searchResults);
      }
  };
    fetchResults();
  }, [query]); // Appel de la recherche à chaque fois que "query" change

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < rating; i++) {
      stars.push(<img src={Star} alt="star" key={i} style={{ width: 20, height: 20 }} />);
    }
    return stars;
  };

  return (
    <main className={`pt-3 pb-5 ps-5 ${theme === 'light' ? 'light' : 'dark'}`}>
      <h1 className='mt-5'>Résultats de la recherche pour "{query}"</h1>
      {results.length > 0 ? (
        <section className="container d-flex flex-column w-75 mx-auto mb-4">
          <div className='cardContainer'>
            <div className='row'>
              {results.map((product) => (
                  <div className='col-4 mt-5' key={product.id}>
                  <div className='card'>
                    <Link to={`/product/${product.id}`}>
                      <img src={product.poster} className='card-img-top cardImg' alt='product-img' />
                    </Link>
                    <div className='card-body cardBody'>
                      <h5 className='card-title fw-bold fs-4 text-start cardTitle'>{product.name}</h5>
                      <p className='card-text text-start cardDescription'>{product.overview}</p>
                      <div style={{ display: 'flex', color: '#FFD700' }}>
                        {renderStars(product.rating)}
                      </div>
                      <div className='d-flex justify-content-between mt-4'>
                        <p className='card-text text-start fw-bold fs-4'>${product.price}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : (
        <p>Aucun produit trouvé pour "{query}".</p>
      )}
    </main>
  );
};
