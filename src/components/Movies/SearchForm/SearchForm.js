import React from "react";
import './SearchForm.css'


function SearchForm() {
  return (
    <div className="searchform">
      <form className="searchform__form">
        <input className="searchform__input" placeholder="Фильм" />
        <button className="searchform__button"></button>
      </form>
      <div className="searchform__checkbox">
        <p className="searchform__text">Короткометражки</p>
        {/* Место для чекбокса */}
      </div>
      <div className="searchform__border"></div>
    </div>
  )
}

export default SearchForm