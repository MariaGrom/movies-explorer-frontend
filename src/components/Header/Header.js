import React from 'react';
import logo from '../../img/logo-min.png'
import './Header.css';
import { Link, useLocation } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';

function Header({loggedIn}) {

  const location = useLocation();
  
// Определение фона заголовка
  const headerClass = (location.pathname === '/') ? 'header header_main' : 'header header_movie'

  return (
    <header className={headerClass}>
      <Link to="/" className="header__logo-link"><img className="header__logo" src={logo} alt="Логотип" /></Link>
      <Navigation loggedIn={loggedIn} />
    </header>
  );
}

export default Header