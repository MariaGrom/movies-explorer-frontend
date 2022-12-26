import React from 'react';
import './NavTab.css'

function NavTab() {
  return (
    <div className="navigation">
      <ul className="navigation__list">
        <li className="navigation__list-item"><a href="#" className="navigation__link">О проекте</a></li>
        <li className="navigation__list-item"><a href="#" className="navigation__link">Технологии</a></li>
        <li className="navigation__list-item"><a href="#" className="navigation__link">Студент</a></li>
      </ul>
    </div>
  );
}

export default NavTab