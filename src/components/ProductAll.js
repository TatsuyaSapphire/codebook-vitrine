import React, { useEffect, useState } from 'react';
import { getAllProducts } from '../data/api';
import { Link } from 'react-router-dom';
import Star from '../assets/etoile.png'
import '../App.css';

export const AllProducts= () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsData = await getAllProducts();
        setProducts(productsData);
      } catch (error) {
        console.error('Erreur lors de la récupération des produits:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const renderStars = (rating) => {
    const stars = [];
    // Boucle pour afficher le nombre d'étoiles en fonction du rating
    for (let i = 0; i < rating; i++) {
      stars.push(<img src={Star} alt="star" key={i} style={{ width: 20, height: 20 }} />);
    }
    return stars;
  };

  if (loading) {
    return <p>Chargement des produits...</p>;
  }

  return (
    <div>
      <h4 className='link-underline-primarys'>Featured eBooks</h4>
        <div className='container mt-5 cardContainer'>
          <div className='row'>
              {products.map((product) => (
                  <div className='col-4 mt-5'>
                      <div className='card'>
                            <Link to={`/product/${product.id}`}>
                              <img src={product.poster} className='card-img-top cardImg' alt='product-img'></img>
                            </Link>
                          <div className='card-body cardBody' key={product.id}>
                              <h5 className='card-title fw-bold fs-4 text-start cardTitle'>{product.name}</h5>
                              <p className='card-text text-start cardDescription'>{product.overview}</p>
                              <div style={{ display: 'flex', color: '#FFD700' }}>
                                  {renderStars(product.rating)}
                              </div>
                              <div className='d-flex justify-content-between mt-4'>
                                  <p className='card-text text-start fw-bold fs-4'>${product.price}</p>
                                  <button class="py-2 px-3 text-white btn btn-primary btn-sm rounded-lg">Add To Cart <i>+</i></button>
                              </div>
                          </div>
                      </div>
                  </div>
                ))}
            </div>
        </div>
    </div>
  );
};

