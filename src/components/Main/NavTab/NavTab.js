import React from 'react';
import './NavTab.css';

function NavTab() {
  return (
    <div className="navtab">
      <ul className="navtab__list">
        <li className="navtab__list-item"><a href="#aboutproject" className="navtab__link">О проекте</a></li>
        <li className="navtab__list-item"><a href="#techs" className="navtab__link">Технологии</a></li>
        <li className="navtab__list-item"><a href="#aboutme" className="navtab__link">Студент</a></li>
      </ul>
    </div>
  );
}

export default NavTab