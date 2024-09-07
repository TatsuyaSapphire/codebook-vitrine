import React, { useEffect, useState } from 'react';
import { getAllProducts, addToCart, removeFromCart, getCartItems} from '../data/api';
import { Link } from 'react-router-dom';
import Star from '../assets/etoile.png';
import '../App.css';
import { useSelector } from 'react-redux';

export const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fonction pour récupérer les produits du panier
  const fetchCartItems = async () => {
    try {
      const items = await getCartItems();
      setCartItems(items.map((item) => item.id));
    } catch (error) {
      console.error('Erreur lors de la récupération des articles du panier :', error);
    }
  };
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

    fetchProducts();
    fetchCartItems();
  }, []);

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

  if (loading) {
    return <p>Chargement des produits...</p>;
  }

  return (
    <main className={`pt-3 pb-5 ps-5 ${theme === 'light' ? 'light' : 'dark'}`}>
      <section className="container d-flex flex-column w-75 mx-auto">
        <div className="d-flex justify-content-between align-items-center">
          <h4 className='link-underline-primarys fw-bold'>All eBooks({products.length})</h4>
          <button className={`burger-btn rounded me-5 ${theme === 'light' ? 'light' : 'dark'}`} onClick="rien">
            <i className="bi bi-three-dots-vertical"></i>
          </button>
        </div>
        <div className='cardContainer'>
          <div className='row ps-3'>
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
      <section className="filter">


      </section>
    </main>
  );
};