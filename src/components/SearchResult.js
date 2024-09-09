import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useSearchParams, Link } from 'react-router-dom';
import { searchProducts, getAllProducts, addToCart, removeFromCart } from '../data/api'; // Importer addToCart et removeProduct
import Star from '../assets/etoile.png';

export const SearchResults = () => {
  const [cartItems, setCartItems] = useState([]);
  const [results, setResults] = useState([]);
  const [searchParams] = useSearchParams(); // Récupérer les paramètres de requête
  const query = searchParams.get('query') || ''; // Récupérer la valeur du paramètre "query", ou chaîne vide si nul
  const theme = useSelector(state => state.themeState.theme);

  useEffect(() => {
    const fetchResults = async () => {
      if (query.trim() === '') {
        // Si le query est vide, récupère tous les produits
        const allProducts = await getAllProducts();
        setResults(allProducts);
      } else {
        // Si un terme de recherche est fourni, effectuer la recherche
        const searchResults = await searchProducts(query);
        setResults(searchResults);
      }
    };

    fetchResults();
  }, [query]); // Appel de la recherche à chaque fois que "query" change

  const handleCartAction = async (product) => {
    if (!product || !product.id) {
      console.error('Erreur : ID du produit manquant ou produit invalide.', product);
      return;
    }

    if (cartItems.includes(product.id)) {
      await removeFromCart(product.id);
      setCartItems(cartItems.filter((id) => id !== product.id));
    } else {
      await addToCart(product.id);
      setCartItems([...cartItems, product.id]);
    }
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < rating; i++) {
      stars.push(<img src={Star} alt="star" key={i} style={{ width: 20, height: 20 }} />);
    }
    return stars;
  };

  return (
    <main className={`pt-3 pb-5 ps-5 container-search ${theme === 'light' ? 'light' : 'dark'}`}>
      <h1 className='mt-5'>
        {query.trim() !== '' ? `Résultats de la recherche pour "${query}"` : 'Tous les produits'}
      </h1>
      {results.length > 0 ? (
        <section className="container d-flex flex-column w-75 mx-auto mb-4">
          <div className='cardContainer' id="search-result-card">
            <div className='row'>
              {results.map((product) => (
                <div className='col-lg-4 col-md-6 mt-5' key={product.id}>
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
                      <button className='btn btn-primary btn-sm rounded-lg' onClick={() => handleCartAction(product)}>
                      {cartItems.includes(product.id) ? 'Remove from Cart' : 'Add to Cart'}
                      </button>
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
