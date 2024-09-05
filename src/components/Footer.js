import React from 'react'

export const Footer = () => {
  return (
    <footer id="sticky-footer" className="flex-shrink-0 py-4 bg-dark text-white-50 mt-5 sticky-bottom">
    <div className="container text-center">
        <div className='row'>
        <small className='col'>Copyright &copy; Your Website</small>
            <div className='col d-flex flex-row-reverse'>
                <a href='/#' className='m-2 text-decoration-none text-white'>Instagram</a>
                <a href='/#' className='m-2 text-decoration-none text-white'>Linkedin</a>
                <a href='/#' className='m-2 text-decoration-none text-white'>Twitter</a>
                <a href='/#' className='m-2 text-decoration-none text-white'>Youtube</a>
            </div>
      </div>
    </div>
  </footer>
  )
}