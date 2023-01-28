import React, { useState } from "react";
import './Navigation.css';
import '../Header/Header.css';
import { Link, useLocation } from "react-router-dom";

function Navigation({ loggedIn }) {

  //Переменная состояния боковой навигации
  const [isNavigationSidebar, setIsNavigationSidebar] = useState(false);

  // Функция открытия боковой навигации 
  function openNavigationSidebar() {
    setIsNavigationSidebar(true)
  }

  // Функция закрытия боковой навигации
  function closeNavigationSidebar() {
    setIsNavigationSidebar(false)
  }

  // Стилизация навигации для залогиненного пользователя и нет
  const navigationClass = (`navigation ${loggedIn ? '' : 'navigation_logout'}`)

  // Стилизация кнопки для залогиненного пользователя и нет
  const buttonText = loggedIn ? '' : 'Войти';
  const buttonClass = (`navigation__button ${loggedIn ? 'navigation__button_logged' : 'navigation__button_logout'}`)

  // Стилизация ссылки для залогиненного пользователя и нет
  const linkText = loggedIn ? 'Аккаунт' : 'Регистрация';
  const linkClass = (`navigation__link ${loggedIn ? 'navigation__link_logged' : 'navigation__link_logout'}`)
  const linkPath = loggedIn ? '/profile' : '/signup';
  const buttonPath = loggedIn ? '/profile' : '/signin';
  const location = useLocation();
  const linkMovies = (location.pathname === '/movies') ? "navigation__title_active" : "";
  const linkSavedMovies = (location.pathname === '/saved-movies') ? "navigation__title_active" : "";
  const linkMoviesSidebar = (location.pathname === '/movies') ? "navigation__title-sidebar_active" : "";
  const linkSavedMoviesSidebar = (location.pathname === '/saved-movies') ? "navigation__title-sidebar_active" : "";



  return (
    <nav className={navigationClass}>

      {loggedIn && <ul className="navigation__menu">
        <li><Link to='/movies' className={`navigation__title ${linkMovies}`}>Фильмы</Link></li>
        <li><Link to='/saved-movies' className={`navigation__title  ${linkSavedMovies}`}>Сохранённые фильмы</Link></li>
      </ul>}

      <div className='navigation__account'>
        <Link to={linkPath} className={linkClass}>{linkText}</Link>
        <Link to={buttonPath} className={buttonClass}>{buttonText}</Link>
      </div>

      {loggedIn && <button className="navigation__burger" onClick={openNavigationSidebar}></button>}

      {loggedIn && <div className={`navigation__sidebar ${isNavigationSidebar ? 'navigation__sidebar_opened' : ''}`} >
        <div className="navigation__content-sidebar">
          <ul className="navigation__menu-sidebar">
            <li className="navigation__title-sidebar"><Link to='/' className="navigation__link-sidebar">Главная</Link></li>
            <li className={`navigation__title-sidebar ${linkMoviesSidebar}`}><Link to='/movies' className="navigation__link-sidebar">Фильмы</Link></li>
            <li className={`navigation__title-sidebar ${linkSavedMoviesSidebar}`}><Link to='/saved-movies' className="navigation__link-sidebar">Сохранённые фильмы</Link></li>
          </ul>
          <div className="navigation__account-sidebar">
            <Link to='/profile' className="navigation__link navigation__link_logged">Аккаунт</Link>
            <Link to='/profile' className="navigation__button navigation__button_logged"></ Link>
          </div>
          <button className="navigation__button-close" onClick={closeNavigationSidebar}></button>
        </div>
      </div>}
    </nav>
  )
}

export default Navigation