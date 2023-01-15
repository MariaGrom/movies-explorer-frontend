import React from "react";
import './Navigation.css';
import '../Header/Header.css';
import { Link } from "react-router-dom";

function Navigation(props) {

  const { loggedIn } = props

  // Стилизация кнопки для залогиненного пользователя и нет
  const buttonText = loggedIn ? '' : 'Войти';
  const buttonClass = (
    `header__button ${loggedIn ? 'header__button_login' : 'header__button_logout'}`
  )

  // Стилизация ссылки для залогиненного пользователя и нет
  const linkText = loggedIn ? 'Аккаунт' : 'Регистрация';
  const linkClass = (
    `header__link ${loggedIn ? 'header__link_login' : 'header__link_logout'}`
  )

  return (
    <nav className="navigation">
      <div className="navigation__menu">
        <Link to="/movies" className="navigation__link navigation__link_active">Фильмы</Link>
        <Link to='/saved-movies' className="navigation__link">Сохранённые фильмы</Link>
      </div>
      <div className="navigation__profile">
        <div className="header__menu">
          <Link to="/signup" className={linkClass}>{linkText}</Link>
          <button className={buttonClass}>{buttonText}</button>
        </div>
      </div>
    </nav>
  )
}

export default Navigation