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
       {/* <MoviesCard />
         <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard /> */}
      </ul>


    </div>
  )
}

export default MoviesCardList