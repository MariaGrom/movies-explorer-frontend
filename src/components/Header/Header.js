import React from 'react';
import logo from '../../img/logo.svg'
import './Header.css';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <div className="header">
     <a href="#" className="header__logo-link"><img className="header__logo" src={logo} alt="Логотип" /></a>
      <div className="header__menu">
        <Link to="/signup" className="header__link">Регистрация</Link> 
        <button className="header__button">Войти</button>
      </div>
    </div>
  );
}

export default Header