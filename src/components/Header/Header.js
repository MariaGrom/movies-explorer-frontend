import React from 'react';
import logo from '../../img/logo.svg'
import './Header.css';
import { Link, useLocation } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';

function Header(props) {

  const { loggedIn } = props

  // Стилизация шапки для залогиненного пользователя и нет
  const headerClass = (
    `header ${loggedIn ? 'header_movie' : 'header_main'}`
  )


  return (

    <div className={headerClass}>
      <Link to="/" className="header__logo-link"><img className="header__logo" src={logo} alt="Логотип" /></Link>
      <Navigation loggedIn={loggedIn} />
    </div>
  );
}

export default Header