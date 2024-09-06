import React from 'react'

export const Footer = () => {
  return (
    <footer id="sticky-footer" className="flex-shrink-0 py-4 bg-dark text-white-50 mt-5">
    <div className="container d-flex justify-content-between align-items-center">
        <div><small className='col'>Copyright &copy; <a href="/#" className="text-white-50">CodeBook</a>. All Rights Reserved.</small></div>
        <div className='col d-flex flex-row-reverse'>
          <a href='/#' className='m-2 text-decoration-none text-white-50'><i class="bi bi-instagram"></i></a>
          <a href='/#' className='m-2 text-decoration-none text-white-50'><i class="bi bi-twitter"></i></a>
          <a href='/#' className='m-2 text-decoration-none text-white-50'><i class="bi bi-github"></i></a>
        </div>
    </div>
  </footer>
  )
}