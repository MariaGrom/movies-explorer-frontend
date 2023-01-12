import React from 'react';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList() {
  return (
    <div className="moviescardlist">
      <ul className="moviescardlist__list">
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
      </ul>

      <div className="moviescardlist__add-button">
        <button className="moviescardlist__button">Ещё</button>
      </div>
    </div>
  )
}

export default MoviesCardList