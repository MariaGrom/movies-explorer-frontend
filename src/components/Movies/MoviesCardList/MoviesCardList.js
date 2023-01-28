import React from 'react';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList({ cards, handleSavedCard, searchFormWasInit}) {

  return (
    <section className="moviescardlist">
      <ul className="moviescardlist__list">
        {cards.map((card) => <MoviesCard key={card.movieId} card={card} handleSavedCard={handleSavedCard} />)}
        {cards.length === 0 && searchFormWasInit &&
          <li >
            <span className="moviescardlist__not-found">Ничего не найдено</span>
          </li>
        }
        
      </ul>

    </section>
  )
}

export default MoviesCardList