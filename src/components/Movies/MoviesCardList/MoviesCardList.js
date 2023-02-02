import React from 'react';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import Preloader from '../Preloader/Preloader';

function MoviesCardList({ cards, handleSavedCard, searchQuery, statusPreloader }) {

  return (
    <section className="moviescardlist">
            {statusPreloader && <Preloader />}
      <ul className="moviescardlist__list">
        {cards.map((card) => <MoviesCard key={card.movieId} card={card} handleSavedCard={handleSavedCard} />)}
        {(cards.length === 0 && searchQuery && !statusPreloader) &&
          <li >
            <span className="moviescardlist__not-found">Ничего не найдено</span>
          </li>
        }
      </ul>


    </section>
  )
}

export default MoviesCardList