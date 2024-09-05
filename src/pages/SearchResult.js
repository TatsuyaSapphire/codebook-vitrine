// src/pages/SearchResults.jsx
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios'; // Assurez-vous que cela correspond à votre configuration API

export const SearchResults = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  // Fonction pour extraire le paramètre de requête "query" depuis l'URL
  const getSearchQuery = () => {
    const params = new URLSearchParams(location.search);
    return params.get('query') || '';
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const searchQuery = getSearchQuery();
        // Appelez votre API pour récupérer tous les produits
        const response = await axios.get('/api/products'); // Assurez-vous que l'URL correspond à votre configuration
        const filteredProducts = response.data.filter((product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setProducts(filteredProducts);
      } catch (error) {
        console.error('Erreur lors de la récupération des produits :', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [location]);

  if (loading) {
    return <p>Chargement des résultats...</p>;
  }

  if (products.length === 0) {
    return <p>Aucun produit trouvé pour "{getSearchQuery()}".</p>;
  }

  return (
    <div className="container mt-4">
      <h2>Résultats de recherche pour : "{getSearchQuery()}"</h2>
      <div className="row">
        {products.map((product) => (
          <div key={product.id} className="col-md-4 mb-3">
            <div className="card">
              <img src={product.image} className="card-img-top" alt={product.name} />
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">{product.description}</p>
                <p className="card-text">Prix : {product.price} €</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};