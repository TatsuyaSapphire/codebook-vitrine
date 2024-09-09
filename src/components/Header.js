import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useSearch } from '../components/SearchContext';
import { useSelector, useDispatch } from 'react-redux';
import { update } from './../store/themeSlice';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { auth } from './../firebase/server.js';
import { SearchBar } from './SearchBar';
import logo from '../assets/logo.gif';
import '../index.css';
import './Header.css';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from './../firebase/server'; // Importez votre instance de Firebase Firestore
import { LoginModal } from './LoginModal'; // Importez le composant de la modal
import { RegisterModal } from './RegisterModal';

export const Header = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const { showSearchBar, setShowSearchBar } = useSearch(); // Correction ici
    const theme = useSelector((state) => state.themeState.theme);
    const [cartItemCount, setCartItemCount] = useState(0);
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showRegisterModal, setShowRegisterModal] = useState(false);

    const handleRedirect = () => {
        navigate('/products'); // Redirige vers la liste des produits
    };

    const handleRedirectToOrderHistory = () => {
        navigate('/order-history'); // Redirection vers la page des commandes
      };

    const toggleSearchBar = () => {
        setShowSearchBar((prev) => !prev);  // Inverser l'état d'affichage de la barre de recherche
    };

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        dispatch(update(newTheme));
    };

    // Ouvrir la modal de login
    const handleLoginClick = () => {
        setShowLoginModal(true);
    };

    // Fermer la modal de login
    const handleCloseModal = () => {
        setShowLoginModal(false);
    };

    // Ouvrir la modal de register
    const handleRegisterClick = () => {
        setShowRegisterModal(true);
    };
    
    // Fermer la modal de register
    const handleCloseRegisterModal = () => {
        setShowRegisterModal(false);
    };

    // Fonction pour se déconnecter
    const logout = async () => {
        try {
            await signOut(auth);
            navigate('/');
        } catch (error) {
            console.error('Erreur de déconnexion : ', error);
        }
    };

    // Surveillance des changements d'état d'authentification
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        // Nettoyage de l'abonnement à l'événement lors du démontage du composant
        return () => unsubscribe();
    }, []);

    // Écouter les changements en temps réel de la collection 'cart'
    useEffect(() => {
        if (!user) return;
        const unsubscribe = onSnapshot(collection(db, `users/${user.uid}/cart`), (snapshot) => {
            setCartItemCount(snapshot.size); // Mettre à jour avec le nombre d'articles dans le panier
        });

        // Nettoyage de l'abonnement lors du démontage du composant
        return () => unsubscribe();
    }, [user]);


    const logoStyle = {
        width: '5rem',
        height: '5rem',
    };

    return (
        <header className={`my-0 ${theme === 'light' ? 'light' : 'dark'}`}>
            <nav className="container navbar navbar-expand-lg navbar-dark d-flex justify-content-between w-75 px-0">
                <NavLink to="/" className="navbar-brand d-flex align-items-center title">
                    <img src={logo} style={logoStyle} alt="logo"></img>
                    <span className='logo'>CodeBook</span>
                </NavLink>
                <div className="d-flex">
                    <button className={`${theme === 'light' ? 'light' : 'dark'}`} onClick={toggleTheme}>
                        <i className={`bi ${theme === 'light' ? 'bi-moon-fill' : 'bi-brightness-high-fill'}`}></i>
                    </button>
                    <button className={`${theme === 'light' ? 'light' : 'dark'}`} onClick={toggleSearchBar}>
                        <i className="fa-solid fa-magnifying-glass"></i>
                    </button>
                    <button className={`${theme === 'light' ? 'light' : 'dark'}`} onClick={() => navigate('/cart')}>
                        <i className="fa-solid fa-cart-shopping"></i>
                        <span className="badge-cart bg-danger">{cartItemCount}</span>
                    </button>
                    <div className="dropdown-center col">
                        <button className={`dropdown-toggle ${theme === 'light' ? 'light text-black' : 'dark text-white'}`} type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <i className="fa-solid fa-user"></i>
                        </button>
                        <ul className="dropdown-menu dropdown-menu-end dropdown-menu-lg-start">
                            <li className="dropdown-item" type="button" onClick={handleRedirect}>
                                All eBooks
                            </li>
                            {user ? (
                                <>
                                    <li className="dropdown-item" type="button" onClick={logout}>
                                        Logout
                                    </li>
                                    <li className="dropdown-item" type="button" onClick={handleRedirectToOrderHistory}>
                                        Order History
                                    </li>
                                </>
                            ) : (
                                <>
                                    <li className="dropdown-item" type="button" onClick={handleLoginClick}>
                                        Login
                                    </li>
                                    <li className="dropdown-item" type="button" onClick={handleRegisterClick}>
                                        Register
                                    </li>
                                </>
                                
                            )}
                        </ul>
                    </div>
                </div>
            </nav>
            {/* Modal de connexion */}
            <LoginModal show={showLoginModal} handleClose={handleCloseModal} />
            <RegisterModal show={showRegisterModal} handleClose={handleCloseRegisterModal} />
            <SearchBar />
        </header>
    );
};
