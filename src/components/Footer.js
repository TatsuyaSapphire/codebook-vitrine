import React from 'react'
import { useSelector } from 'react-redux';

export const Footer = () => {

  const theme = useSelector(state => state.themeState.theme);

  return (
    <footer id="sticky-footer" className={`flex-shrink-0 py-4 ${theme === 'light' ? 'light' : 'dark'}`}>
      <div className="container d-flex justify-content-between align-items-center">
          <div><small className='col'>Copyright &copy; <a href="/#">CodeBook</a>. All Rights Reserved.</small></div>
          <div className='col d-flex flex-row-reverse'>
            <a href='/#' className='m-2 text-decoration-none'><i className="bi bi-instagram"></i></a>
            <a href='/#' className='m-2 text-decoration-none'><i className="bi bi-twitter"></i></a>
            <a href='/#' className='m-2 text-decoration-none'><i className="bi bi-github"></i></a>
          </div>
      </div>
    </footer>
  )
}