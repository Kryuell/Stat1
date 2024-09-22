import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { Menu, X } from 'lucide-react';
import { useAuth,logout } from '../../auth';

const LoggedInLinks = () => {
  return (
    <>
      {/* <li><Link to="/home">Home</Link></li> */}
      <li><Link to="/">Form</Link></li>
      <li><Link to="/createform">Create Form</Link></li>
      <li><a href='#' onClick={() => logout()}>Log Out</a></li>
    </>
  );
};

const LoggedOutLinks = () => {
  return (
    <>
      <li><Link to="/">Home</Link></li>
      <li><a href="#about">About</a></li>
      <li><a href="#contact">Contact</a></li>
      <li><Link to="/signup">Signup</Link></li>
      <li><Link to="/login">Login</Link></li>
    </>
  );
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };
  const [logged] = useAuth();

  return (
    <nav className="Navbar-nav">
      <header className="Navbar-header">
        <div className="logo"><Link to="/"><h1 className="fw-bold">Statify</h1></Link></div>
        <ul className="center-item">
          {logged ? <LoggedInLinks /> : <LoggedOutLinks />}
        </ul>
        <div className="menu-button">
          <button onClick={toggleNavbar}>{isOpen ? <X /> : <Menu />}</button>
        </div>
        {isOpen && (
          <ul className="sidebar">
            {logged ? <LoggedInLinks /> : <LoggedOutLinks />}
          </ul>
        )}
      </header>
    </nav>
  );
};

export default Navbar;
