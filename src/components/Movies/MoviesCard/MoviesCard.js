import React from "react";
import './MoviesCard.css';
import { useLocation } from "react-router-dom";


function MoviesCard({ card, handleSavedCard }) {

  // Высчитываем длительность фильма
  const durationHours = card.duration >= 60 ? `${Math.floor(card.duration / 60)} ч ` : '';
  const durationMinut = card.duration === 60 ? '' : `${card.duration % 60} м`;
  const duration = durationHours + durationMinut;

  const savedCard = () => handleSavedCard(card)

  const location = useLocation();

  const ClassButton = card.saved ? " moviescard__button_saved moviescard__button" : "moviescard__button";


  return (
    <li className="moviescard">
      <a href={card.trailerLink} target="_blank" className="movies__trailerlink" rel="noreferrer">
        <img className="moviescard__image" alt={card.nameRU} src={card.thumbnail} />
      </a>
      <div className="moviescard__description">
        <div className="moviescard__text">
          <h2 className="moviescard__title">{card.nameRU}</h2>
          <h3 className="moviescard__subtitle">{duration}</h3>
        </div>
        {(location.pathname === "/movies") && <button className={ClassButton} onClick={savedCard}></button>}
        {(location.pathname === "/saved-movies") && <button className="moviescard__button_delete" onClick={savedCard}></button>}
      </div>
    </li>
  )
}

export default MoviesCard;
