import React,{ useState, useEffect }from 'react';
import {NavLink} from 'react-router-dom';
import { useSearch } from '../components/SearchContext';
import logo from '../assets/logo.png'
import '../index.css';
import './Header.css';


export const Header = () => {
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
            <nav className="container navbar navbar-expand-lg navbar-dark d-flex justify-content-around">
                <div className=''>
                    <NavLink to='/' className='navbar-brand'><img src={logo} style={logoStyle} alt='logo'></img>CodeBook</NavLink>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                </div>
                <div className="collapse navbar-collapse" id="navbarNav">
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
