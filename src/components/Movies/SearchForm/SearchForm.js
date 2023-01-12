import React from "react";
import './SearchForm.css';
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";


function SearchForm() {
  return (
    <div className="searchform">
      <form className="searchform__form">
        <input className="searchform__input" placeholder="Фильм" />
        <button className="searchform__button"></button>
      </form>
      <div className="searchform__checkbox">
        <FilterCheckbox />
        <p className="searchform__text">Короткометражки</p>
      </div>
      <div className="searchform__border"></div>
    </div>
  )
}

export default SearchForm