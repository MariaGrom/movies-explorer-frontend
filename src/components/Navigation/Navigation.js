import React from "react";
import './Navigation.css';
import '../Header/Header.css';
import { Link } from "react-router-dom";

function Navigation(props) {

  const { loggedIn } = props

  // Стилизация навигации для залогиненного пользователя и нет
  const navigationClass = (`navigation ${loggedIn ? 'navigation__login' : ''}`)

  // Стилизация кнопки для залогиненного пользователя и нет
  const buttonText = loggedIn ? '' : 'Войти';
  const buttonClass = (
    `navigation__button ${loggedIn ? 'navigation__button_login' : 'navigation__button_logout'}`
  )

  // Стилизация ссылки для залогиненного пользователя и нет
  const linkText = loggedIn ? 'Аккаунт' : 'Регистрация';
  const linkClass = (
    `navigation__link ${loggedIn ? 'navigation__link_login' : 'navigation__link_logout'}`
  )
  const linkPath = loggedIn ? '/profile' : '/signup';

  return (
    <nav className={navigationClass}>

      {loggedIn && <div className="navigation__menu">
        <Link to="/movies" className="navigation__title navigation__title_active">Фильмы</Link>
        <Link to='/saved-movies' className="navigation__title">Сохранённые фильмы</Link>
      </div>}

      <div className="navigation__profile">
        <div className="navigation__account">
          <Link to={linkPath} className={linkClass}>{linkText}</Link>
          <button className={buttonClass}>{buttonText}</button>
        </div>
      </div>
    </nav>
  )
}

export default Navigation