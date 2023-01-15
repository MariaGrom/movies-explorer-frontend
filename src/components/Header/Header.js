import React from 'react';
import logo from '../../img/logo.svg'
import './Header.css';
import { Link, useLocation } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';

function Header(props) {

  const {loggedIn} = props

  // const location = React.useLocation();
  // Стилизация ссылки для залогиненного пользователя и нет
  // const linkText = loggedIn ? 'Аккаунт' : 'Регистрация';
  // const linkClass = (
  //   `header__link ${loggedIn ? 'header__link_login' : 'header__link_logout'}`
  // )

  // Стилизация шапки для залогиненного пользователя и нет
  const headerClass = (
    `header ${loggedIn ? 'header_movie' : 'header_main' }`
  )
  
  // // Стилизация кнопки для залогиненного пользователя и нет
  // const buttonText = loggedIn ? '' : 'Войти';
  // const buttonClass = (
  //   `header__button ${loggedIn ? 'header__button_login' : 'header__button_logout'}`
  // )

  return (
    
    <div className={headerClass}>
     <Link to="/" className="header__logo-link"><img className="header__logo" src={logo} alt="Логотип" /></Link>
      
      {/* <div className="header__menu">
        <Link to="/signup" className={linkClass}>{linkText}</Link> 
         <button className={buttonClass}>{buttonText}</button> 
      </div> */}
      <Navigation loggedIn={loggedIn}/>
    </div>
  );
}

export default Header