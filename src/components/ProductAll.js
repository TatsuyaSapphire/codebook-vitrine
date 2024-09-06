import React, { useEffect, useState } from 'react';
import { getAllProducts, addToCart, removeFromCart, getCartItems } from '../data/api';
import { Link } from 'react-router-dom';
import Star from '../assets/etoile.png';
import '../App.css';
import { useSelector } from 'react-redux';

export const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cartItems, setCartItems] = useState([]);
  const theme = useSelector(state => state.themeState.theme);

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

    const fetchCartItems = async () => {
      try {
        const cartData = await getCartItems();
        setCartItems(cartData.map(item => item.id)); // Stocke seulement les IDs des produits dans le panier
      } catch (error) {
        console.error('Erreur lors de la récupération des articles du panier:', error);
      }
    };

    fetchProducts();
    fetchCartItems();
  }, []);

  const handleAddToCart = (productId) => {
    if (!productId) {
      console.error('ID du produit manquant ou invalide.');
      return;
    }
    addToCart(productId);
  };

  const handleRemoveFromCart = (productId) => {
    if (!productId) {
      console.error('ID du produit manquant ou invalide.');
      return;
    }
    removeFromCart(productId);
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < rating; i++) {
      stars.push(<img src={Star} alt="star" key={i} style={{ width: 20, height: 20 }} />);
    }
    return stars;
  };

  if (loading) {
    return <p>Chargement des produits...</p>;
  }

  return (
    <main className={`pt-5 ${theme === 'light' ? 'light' : 'dark'}`}>
      <h4 className='link-underline-primarys'>Featured eBooks</h4>
      <div className='container mt-5 cardContainer'>
        <div className='row'>
          {products.map((product) => (
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
                    {cartItems.includes(product.id) ? (
                      <button
                        onClick={() => handleRemoveFromCart(product.id)}
                        className='py-2 px-3 text-white btn btn-danger btn-sm rounded-lg'
                      >
                        Remove From Cart <i>-</i>
                      </button>
                    ) : (
                      <button
                        onClick={() => handleAddToCart(product.id)}
                        className='py-2 px-3 text-white btn btn-primary btn-sm rounded-lg'
                      >
                        Add To Cart <i>+</i>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};