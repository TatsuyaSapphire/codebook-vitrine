import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProductById, addToCart, getCartItems, removeFromCart } from '../data/api';
import Star from '../assets/etoile.png';
import { useSelector } from 'react-redux';
import { auth } from '../firebase/server'; // Importer Firebase auth

export const ProductDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null); // Stocker l'utilisateur connecté
    const theme = useSelector((state) => state.themeState.theme);

    const fetchCartItems = async () => {
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
        const fetchProduct = async () => {
            try {
                const productData = await getProductById(id);
                setProduct(productData);
            } catch (error) {
                console.error('Erreur lors de la récupération du produit:', error);
            } finally {
                setLoading(false);
            }
        };

        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                setUser(user); // Met à jour l'état avec l'utilisateur connecté
            } else {
                setUser(null);
            }
        });

        fetchProduct();
        fetchCartItems();

        // Nettoyer l'abonnement à l'état d'authentification
        return () => unsubscribe();
    }, [id]);

    if (loading) {
        return <p>Chargement du produit...</p>;
    }

    if (!product) {
        return <p>Produit non trouvé</p>;
    }

    const renderStars = (rating) => {
        const stars = [];
        for (let i = 0; i < rating; i++) {
            stars.push(<img src={Star} alt="star" key={i} style={{ width: 20, height: 20 }} />);
        }
        return stars;
    };

    return (
        <main className={`py-5 ${theme === 'light' ? 'light' : 'dark'}`}>
            <h1 className="mb-3">{product.name}</h1>
            <p className="fw-bold mt-5">{product.overview}</p>
            <div className="container">
                <div className="row my-5">
                    <div className="col">
                        <img className="rounded mx-auto d-block" alt={product.name} src={product.poster} />
                    </div>
                    <div className="col text-start">
                        <p className="fw-bold fs-3">€{product.price}</p>
                        <p>{renderStars(product.rating)}</p>
                        <div className="my-3">
                            <span className="badge text-bg-light text-success fs-6 p-2">
                                {product.inStock ? 'En stock' : 'Rupture Stock'}
                            </span>
                            {product.best_seller && (
                                <span className="badge text-bg-light text-warning fw-bold p-2 fs-6 mx-2">
                                    Bestseller
                                </span>
                            )}
                            {product.size && (
                                <span className="badge text-bg-light text-primary p-2 fs-6 mx-2">{product.size}MB</span>
                            )}
                        </div>
                        {user && ( // Afficher le bouton si l'utilisateur est connecté
                            <div>
                                <button
                                    className={`btn btn-sm rounded-lg ${
                                        cartItems.includes(product.id) ? 'btn-danger' : 'btn-primary'
                                    }`}
                                    onClick={() => handleCartAction(product)}
                                >
                                    {cartItems.includes(product.id) ? 'Remove from Cart' : 'Add to Cart'}
                                </button>
                            </div>
                        )}
                        <p className="fw-bold mt-3">{product.long_description}</p>
                    </div>
                </div>
            </div>
        </main>
    );
};
