import React, { useEffect, useState } from 'react';
import { getAllProducts, addToCart, removeFromCart, getCartItems } from '../data/api';
import { Link } from 'react-router-dom';
import Star from '../assets/etoile.png';
import '../App.css';
import { useSelector } from 'react-redux';
import { useTitle } from '../hooks/useTitle';
import { auth } from '../firebase/server'; // Importer l'authentification Firebase

export const AllProducts = () => {

  useTitle('Products');

  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null); // État pour stocker l'utilisateur connecté

  const theme = useSelector(state => state.themeState.theme);
  const [filterDisplay, setFilterDisplay] = useState(false);

  // États pour gérer les filtres
  const [priceSort, setPriceSort] = useState("");   // Tri par prix
  const [ratingFilter, setRatingFilter] = useState("");  // Filtrage par note
  const [bestSellerOnly, setBestSellerOnly] = useState(false);  // Filtre "Best Seller"
  const [inStockOnly, setInStockOnly] = useState(false);  // Filtre "En Stock"

  // Fonction pour récupérer les produits du panier
  const fetchCartItems = async () => {
    if (!auth.currentUser) {
      console.log("Aucun utilisateur connecté trouvé.");
      return;
    }
    try {
      const items = await getCartItems();
      setCartItems(items.map((item) => item.id));
    } catch (error) {
      console.error('Erreur lors de la récupération des articles du panier :', error);
    }
  };

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

    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user); // Met à jour l'état avec l'utilisateur connecté
        fetchCartItems(); // Récupère les articles du panier de l'utilisateur connecté
      } else {
        setUser(null);
        setCartItems([]); // Réinitialise le panier si aucun utilisateur n'est connecté
      }
    });

    fetchProducts();
    return () => unsubscribe(); // Nettoyer l'abonnement lors du démontage
  }, []);

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < rating; i++) {
      stars.push(<img src={Star} alt="star" key={i} style={{ width: 20, height: 20 }} />);
    }
    return stars;
  };

  // Fonction pour appliquer les filtres
  const applyFilters = () => {
    let filteredProducts = [...products];

    // Filtrer par note (rating)
    if (ratingFilter) {
      filteredProducts = filteredProducts.filter(product => product.rating >= ratingFilter);
    }

    // Filtrer par Best Seller
    if (bestSellerOnly) {
      filteredProducts = filteredProducts.filter(product => product.best_seller);
    }

    // Filtrer par stock
    if (inStockOnly) {
      filteredProducts = filteredProducts.filter(product => product.in_stock);
    }

    // Tri par prix
    if (priceSort === "lowToHigh") {
      filteredProducts.sort((a, b) => a.price - b.price);
    } else if (priceSort === "highToLow") {
      filteredProducts.sort((a, b) => b.price - a.price);
    }

    return filteredProducts;
  };

  const filteredProducts = applyFilters();

  if (loading) {
    return <p>Chargement des produits...</p>;
  }

  return (
    <main className={`pt-5 pb-5 ps-5 ${theme === 'light' ? 'light' : 'dark'}`}>
      <section className="container d-flex flex-column w-75 mx-auto">
        <div className="d-flex justify-content-between align-items-center">
          <h4 className='link-underline-primarys fw-bold'>All eBooks({filteredProducts.length})</h4>
          <button className={`burger-btn rounded me-5 ${theme === 'light' ? 'light' : 'dark'}`} onClick={() => setFilterDisplay(!filterDisplay)}>
            <i className="bi bi-three-dots-vertical"></i>
          </button>
        </div>
        <div className='cardContainer'>
          <div className='row ps-3'>
            {filteredProducts.map((product) => (
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
                      {user && ( // Afficher le bouton si l'utilisateur est connecté
                        <button
                          className={`btn btn-sm rounded-lg ${
                            cartItems.includes(product.id) ? 'btn-danger' : 'btn-primary'
                          }`}
                          onClick={() => handleCartAction(product)}
                        >
                          {cartItems.includes(product.id) ? 'Remove from Cart' : 'Add to Cart'}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Filtres */}
      <section className={`filter px-2 d-flex flex-column ${theme === 'light' ? 'light' : 'dark'} ${filterDisplay ? 'filterVisible' : 'filterInvisible'}`}>
        <div className="d-flex justify-content-between align-items-center pt-3">
          <h5>FILTERS</h5>
          <button className={`filter-close rounded px-2 pt-1 ${theme === 'light' ? 'light' : 'dark'}`} onClick={() => setFilterDisplay(false)}>
            <h5>X</h5>
          </button>
        </div>
        <div className="border-bottom pb-3"></div>
        <div className="py-4 overflow-y-auto">
          <ul className="p-0 m-0 d-flex flex-column justify-content-start align-items-start">
            {/* Filtrage et tri */}
          </ul>
        </div>
      </section>
    </main>
  );
};
