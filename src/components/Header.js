import React,{ useState, useEffect }from 'react';
import {NavLink} from 'react-router-dom';
import logo from '../assets/popcorn.png'
import '../index.css';
import './Header.css';


export const Header = () => {
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
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                <NavLink to='/' className='navbar-brand'><img src={logo} style={logoStyle}></img>CodeBook</NavLink>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <NavLink to='/' className='nav-link'>Home</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to='/popularmovie' className='nav-link'>Popular</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to='/topratedmovie' className='nav-link'>Top</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to='/upcomingmovie' className='nav-link'>A venir</NavLink>
              </li>
            </ul>
            <div className='themeSelector'>
                <span onClick={() => setTheme('light')} className={ theme === 'light' ? 'light activeTheme' : 'light'}></span>
                <span onClick={() => setTheme('dark')} className={ theme === 'dark' ? 'dark activeTheme' : 'dark' }></span>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};
