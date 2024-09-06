import React,{ useState, useEffect }from 'react';
import {NavLink} from 'react-router-dom';
import { useSearch } from '../components/SearchContext';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../components/AuthVerif';
import logo from '../assets/logo.png'
import '../index.css';
import './Header.css';


export const Header = () => {

    const navigate = useNavigate();
    const handleRedirectToLogin = () => {
        navigate('/login');
    };

    const handleRedirect = () => {
      navigate('/products'); // Redirige vers la liste des produits
    };

    const { user, logout } = useAuth();

    const { toggleSearchBar } = useSearch();
    const [theme, setTheme] = useState(JSON.parse(localStorage.getItem('theme')) || 'light')
    useEffect(() => {
        localStorage.setItem('theme', JSON.stringify(theme))
        document.documentElement.removeAttribute('class');
        document.documentElement.classList.add(theme);
    }, [theme])

    const logoStyle = {
      width: '3rem',
      height:'3rem'
  }

    return (
        <header>
            <nav className="container navbar navbar-expand-lg navbar-dark">
                <NavLink to='/' className='navbar-brand'><img src={logo} style={logoStyle} alt='logo'></img>CodeBook</NavLink>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse container justify-content-end" id="navbarNav">
                    <div className='row'>
                        <div class="dropdown-center col">
                            <button className="btn dropdown-toggle text-white" type="button" data-bs-toggle="dropdown" aria-expanded="false">
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
                        <span className='btn text-white text-center col' onClick={() => navigate('/cart')}><i class="fa-solid fa-cart-shopping"></i></span>
                        <span className="btn text-white col" onClick={toggleSearchBar}>
                            <i className="fa-solid fa-magnifying-glass"></i>
                        </span>
                        <div className='themeSelector col'>
                            <span onClick={() => setTheme('light')} className={ theme === 'light' ? 'light activeTheme' : 'light'}></span>
                            <span onClick={() => setTheme('dark')} className={ theme === 'dark' ? 'dark activeTheme' : 'dark' }></span>
                        </div>
                    </div>
                </div>
              </nav>
        </header>
  );
};
