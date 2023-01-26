import React from 'react';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList({ cards, handleSavedCard }) {

  return (
    <section className="moviescardlist">
      <ul className="moviescardlist__list">
        {cards.map((card) =>
          <MoviesCard
            key={card.movieId}
            card={card}
            handleSavedCard={handleSavedCard}
          />)}
      </ul>
    </section>
  )
}

export default MoviesCardList