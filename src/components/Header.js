import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useSearch } from '../components/SearchContext';
import { useSelector, useDispatch } from 'react-redux';
import { update } from './../store/themeSlice';
import { signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged } from 'firebase/auth';
import { auth } from './../firebase/server.js';
import { SearchBar } from './SearchBar';
import logo from '../assets/logo.png';
import '../index.css';
import './Header.css';

export const Header = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const { showSearchBar, setShowSearchBar } = useSearch(); // Correction ici
    const theme = useSelector((state) => state.themeState.theme);

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

    // Fonction pour se connecter
    const login = async () => {
        const provider = new GoogleAuthProvider();
        try {
            await signInWithPopup(auth, provider);
            navigate('/');
        } catch (error) {
            console.error('Erreur de connexion : ', error);
        }
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

    const logoStyle = {
        width: '3rem',
        height: '3rem',
    };

    return (
        <header className={`my-0 ${theme === 'light' ? 'light' : 'dark'}`}>
            <nav className="container navbar navbar-expand-lg navbar-dark d-flex justify-content-between w-75 px-0">
                <NavLink to="/" className="navbar-brand d-flex align-items-center">
                    <img src={logo} style={logoStyle} alt="logo"></img>
                    CodeBook
                </NavLink>
                <div className="d-flex">
                    <button className={`${theme === 'light' ? 'light' : 'dark'}`} onClick={toggleTheme}>
                        <i className={`bi ${theme === 'light' ? 'bi-moon-fill' : 'bi-brightness-high-fill'}`}></i>
                    </button>
                    <button className={`${theme === 'light' ? 'light' : 'dark'}`} onClick={toggleSearchBar}>
                        <i className="fa-solid fa-magnifying-glass"></i>
                    </button>
                    <button className={`navbar-toggler ${theme === 'light' ? 'light' : 'dark'}`} type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <button className={`${theme === 'light' ? 'light' : 'dark'}`} onClick={() => navigate('/cart')}>
                        <i className="fa-solid fa-cart-shopping"></i>
                    </button>
                    <div className="dropdown-center col">
                        <button className={`dropdown-toggle ${theme === 'light' ? 'light text-black' : 'dark text-white'}`} type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <i className="fa-solid fa-user"></i>
                        </button>
                        <ul className="dropdown-menu">
                            {user ? (
                                <li className="dropdown-item" type="button" onClick={logout}>
                                    Logout
                                </li>
                            ) : (
                                <li className="dropdown-item" type="button" onClick={login}>
                                    Login
                                </li>
                            )}
                            <li className="dropdown-item" type="button" onClick={handleRedirect}>
                                All eBooks
                            </li>
                            <li className="dropdown-item" type="button" onClick={handleRedirectToOrderHistory}>
                                Order History
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <SearchBar />
        </header>
    );
};
