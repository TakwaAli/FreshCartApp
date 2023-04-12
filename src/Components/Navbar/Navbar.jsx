import React from 'react'
import styles from './Navbar.module.css';
import Logo from '../../assets/freshcart.png'
export default function Navbar() {
  return (
  <>
  <nav className="navbar navbar-expand-sm navbar-light bg-light">
      <div className="container">
      <a className="navbar-brand" href="#"><img className='w-50' src={Logo}/></a>
      <button className="navbar-toggler d-lg-none" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavId" aria-controls="collapsibleNavId"
        aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="collapsibleNavId">
        <ul className="navbar-nav me-auto mt-2 mt-lg-0">
          
          <li className="nav-item">
            <a className="nav-link" href="#">Home</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">Cart</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">Products</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">Categories</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">Brands</a>
          </li>
        </ul>
        <ul className="navbar-nav ms-auto mt-2 mt-lg-0">
          <li  className="nav-item d-flex align-items-center">
           <i className='fab mx-2 fa-facebook'></i>
           <i className='fab mx-2 fa-linkedin'></i>
           <i className='fab mx-2 fa-twitter'></i>
           
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">Login</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">Register</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">Logout</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  
  </>
  )
}
