import React from "react";
import './Navigation.css';
import '../Header/Header.css';
import { Link } from "react-router-dom";

function Navigation(props) {

  const { loggedIn } = props
  
  const [isNavigationSidebar, setIsNavigationSidebar] = React.useState(false);

  function openNavigationSidebar() {
    setIsNavigationSidebar(true)
  }

  function closeNavigationSidebar() {
    setIsNavigationSidebar(false)
  }


  // Стилизация навигации для залогиненного пользователя и нет
  const navigationClass = (`navigation ${loggedIn ? '' : 'navigation_logout'}`)

  // Стилизация кнопки для залогиненного пользователя и нет
  const buttonText = loggedIn ? '' : 'Войти';
  const buttonClass = (
    `navigation__button ${loggedIn ? 'navigation__button_logged' : 'navigation__button_logout'}`
  )

  // Стилизация ссылки для залогиненного пользователя и нет
  const linkText = loggedIn ? 'Аккаунт' : 'Регистрация';
  const linkClass = (
    `navigation__link ${loggedIn ? 'navigation__link_logged' : 'navigation__link_logout'}`
  )
  const linkPath = loggedIn ? '/profile' : '/signup';
  const buttonPath = loggedIn ? '/profile' : '/signin';

  return (
    <nav className={navigationClass}>

      {loggedIn && <ul className="navigation__menu">
        <li><Link to='/movies' className="navigation__title navigation__title_active">Фильмы</Link></li>
        <li><Link to='/saved-movies' className="navigation__title">Сохранённые фильмы</Link></li>
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
            <li className="navigation__title-sidebar navigation__title-sidebar_active"><Link to='/movies' className="navigation__link-sidebar">Фильмы</Link></li>
            <li className="navigation__title-sidebar"><Link to='/saved-movies' className="navigation__link-sidebar">Сохранённые фильмы</Link></li>
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