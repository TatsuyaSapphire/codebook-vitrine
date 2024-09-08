import React, { useEffect, useState } from 'react';
import { getFeaturedProducts, addToCart, removeFromCart } from '../data/api';
import { db, auth} from '../firebase/server';
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import Star from '../assets/etoile.png'
import '../App.css';
import { useSelector } from 'react-redux';

export const ProductHome = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cartItems, setCartItems] = useState([]);
  const theme = useSelector(state => state.themeState.theme);

  const fetchCartItems = async () => {
    if (!auth.currentUser) {
      console.log("Aucun utilisateur connecté trouvé.");
      return;
    }
    try {
      const cartRef = collection(db, `users/${auth.currentUser.uid}/cart`);
      const cartSnapshot = await getDocs(cartRef);
      const fetchedCartItems = cartSnapshot.docs.map(doc => doc.data().productId);
      setCartItems(fetchedCartItems);
    } catch (error) {
      console.error("Erreur lors de la récupération des articles du panier : ", error);
    }
  };

  const handleCartAction = async (productId) => {
    if (!productId) {
      console.error('Erreur : ID du produit manquant ou produit invalide.', productId);
      return;
    }
  
    if (cartItems.includes(productId)) {
      // Si le produit est déjà dans le panier, on le supprime
      await removeFromCart(productId);
      setCartItems(prevItems => prevItems.filter(id => id !== productId));
    } else {
      // Sinon, on récupère les détails du produit et on l'ajoute au panier
      const productRef = doc(db, 'products', productId);
      const productSnapshot = await getDoc(productRef);
  
      if (!productSnapshot.exists()) {
        console.error("Erreur : Le produit n'existe pas dans la base de données.");
        return;
      }
  
      const productDetails = productSnapshot.data(); // Récupère les détails du produit
  
      await addToCart(productId, productDetails); // Ajoute au panier avec les détails du produit
      setCartItems(prevItems => [...prevItems, productId]); // Met à jour l'état du panier
    }
  };



  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsFeaturedData = await getFeaturedProducts();
        setProducts(productsFeaturedData);
      } catch (error) {
        console.error('Erreur lors de la récupération des produits:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
    fetchCartItems();
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
    <main className={`${theme === 'light' ? 'light' : 'dark'}`}>
      <h4 className='link-underline-primarys'>Featured eBooks</h4>
        <div className='container cardContainer mt-5 d-flex justify-content-center ps-5'>
                {products.map((product) => (
                    <div className='col-4 rounded' key={product.id}>
                        <div className='card'>
                            <Link to={`/product/${product.id}`}>
                              <img src={product.poster} className='card-img-top cardImg' alt='product-img'></img>
                            </Link>
                            <div className='card-body cardBody' key={product.id}>
                                <h5 className='card-title fw-bold fs-4 text-start cardTitle'>{product.name}</h5>
                                <p className='card-text text-start'>{product.overview}</p>
                                <div style={{ display: 'flex', color: '#FFD700' }}>
                                    {renderStars(product.rating)}
                                </div>
                                <div className='d-flex justify-content-between mt-4'>
                                    <p className='card-text text-start fw-bold fs-4'>${product.price}</p>
                                    <button className='btn btn-primary btn-sm rounded-lg' onClick={() => handleCartAction(product.id)}>
                                    {cartItems.includes(product.id) ? 'Remove from Cart' : 'Add to Cart'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
    </main>
  );
};