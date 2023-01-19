import React from 'react';
import logo from '../../img/logo-min.png'
import './Header.css';
import { Link } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';

function Header(props) {

  const { loggedIn } = props

  // Стилизация шапки для залогиненного пользователя и нет
  const headerClass = (
    `header ${loggedIn ? 'header_movie' : 'header_main'}`
  )


  return (

    <header className={headerClass}>
      <Link to="/" className="header__logo-link"><img className="header__logo" src={logo} alt="Логотип" /></Link>
      <Navigation loggedIn={loggedIn} />
    </header>
  );
}

export default Header