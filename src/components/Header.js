import React,{ useState, useEffect }from 'react';
import {NavLink} from 'react-router-dom';
import { useSearch } from '../components/SearchContext';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../components/AuthVerif';
import logo from '../assets/logo.png'
import '../index.css';
import './Header.css';
import { useSelector, useDispatch} from 'react-redux';
import { update } from './../store/themeSlice';


export const Header = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user, logout } = useAuth();
    const { toggleSearchBar } = useSearch();
    const theme = useSelector(state => state.themeState.theme);

    const handleRedirectToLogin = () => {
        navigate('/login');
    };

    const handleRedirect = () => {
      navigate('/products'); // Redirige vers la liste des produits
    };

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        dispatch(update(newTheme));
    };

    const logoStyle = {
      width: '3rem',
      height:'3rem'
    }

    return (
        <header className={`my-0 ${theme === 'light' ? 'light' : 'dark'}`}>
            <nav className="container navbar navbar-expand-lg navbar-dark d-flex justify-content-between w-75 px-0">
                <NavLink to='/' className='navbar-brand d-flex align-items-center'>
                    <img src={logo} style={logoStyle} alt='logo'></img>
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
                        <i class="fa-solid fa-cart-shopping"></i>
                    </button>
                    <div class="dropdown-center col">
                        <button className={`dropdown-toggle ${theme === 'light' ? 'light text-black' : 'dark text-white'}`} type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <i className="fa-solid fa-user"></i>
                        </button>
                        <ul class="dropdown-menu">
                            {user ? (
                                <>
                                    <li className='dropdown-item' type="button" href="/" onClick={logout}>Deconnexion</li>
                                </>
                            ) : (
                                <li><a className="dropdown-item" type="button" href="/" onClick={handleRedirectToLogin}>Login</a></li>
                            )}
                                <li><a className="dropdown-item" type="button" href="/" onClick={handleRedirect}>All eBooks</a></li>
                        </ul>
                    </div>
                </div>
              </nav>
        </header>
    );
};
