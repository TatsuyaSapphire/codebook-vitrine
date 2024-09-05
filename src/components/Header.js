import React,{ useState, useEffect }from 'react';
import {NavLink} from 'react-router-dom';
import { useSearch } from '../components/SearchContext';
import { useNavigate } from 'react-router-dom';
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
                <div className='row'>
                    <NavLink to='/' className='navbar-brand'><img src={logo} style={logoStyle} alt='logo'></img>CodeBook</NavLink>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                </div>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <div class="dropdown-center">
                        <button class="btn btn-secondary dropdown-toggle rounded-5" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <i class="fa-solid fa-user"></i>
                        </button>
                        <ul class="dropdown-menu">
                            <li><a class="dropdown-item" type="button" href="#" onClick={handleRedirect}>All eBooks</a></li>
                            <li><a class="dropdown-item" type="button" href="#" onClick={handleRedirectToLogin}>Login</a></li>
                            <li><a class="dropdown-item" href="#">Register</a></li>
                        </ul>
                    </div>
                    <button className="btn btn-outline-primary" onClick={toggleSearchBar}>
                        <i class="fa-solid fa-magnifying-glass"></i>
                    </button>
                    <btn></btn>
                    <div className='themeSelector'>
                        <span onClick={() => setTheme('light')} className={ theme === 'light' ? 'light activeTheme' : 'light'}></span>
                        <span onClick={() => setTheme('dark')} className={ theme === 'dark' ? 'dark activeTheme' : 'dark' }></span>
                    </div>
                </div>
              </nav>
        </header>
  );
};
