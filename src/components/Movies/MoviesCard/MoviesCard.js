import React from "react";
import './MoviesCard.css';
import movie from '../../../img/movie-min.png';

function MoviesCard() {
  return (
      <li className="moviescard">
        <img className="moviescard__image" alt="Фильм" src={movie} />
        <div className="moviescard__description">
          <div className="moviescard__text">
            <h2 className="moviescard__title">33 слова о дизайне</h2>
            <h3 className="moviescard__subtitle">2ч42м</h3>
          </div>
          <button className="moviescard__button moviescard__button_delete"></button>
        </div>
      </li>
  )
}

export default MoviesCard;