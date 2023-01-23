import React from 'react';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList(props) {

  const {cards} = props

  return (
    <section className="moviescardlist">
      <ul className="moviescardlist__list">

        {/* {cards.map(card=> (<MoviesCard key={item._id} card={card}/>))} */}
        
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
      </ul>
    </section>
  )
}

export default MoviesCardList