import React, { useEffect, useState } from 'react';
import './Movies.css';
import SearchForm from './SearchForm/SearchForm';
import MoviesCardList from './MoviesCardList/MoviesCardList';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import moviesApi from '../../utils/MoviesApi';
import MoviesCard from './MoviesCard/MoviesCard';
import Preloader from './Preloader/Preloader';
import mainApi from '../../utils/MainApi';


function Movies(props) {

  const { loggedIn } = props

  // Переменные состояния
  const [buttonSearch, setButtonSearch] = useState(false);


  const [cards, setCards] = useState([]);

  // Переменная состония для фильтрации фильмов
  const [filteredCards, setFilteredCards] = useState([]);

  // Функция фильтрации карточек
  const filterCards = (search) => {
    setFilteredCards(cards.filter((card) => {
      const isName = card.nameRU.toLowerCase().includes(search.name.toLowerCase());
      const isShorts = search.isShorts ? card.duration <= 40 : true;
      return isName && isShorts;
    }))
  }


  // Задаем единое название для карточек с битфильма и карточек с нашего сервера
  useEffect(() => {

// if(cards.length === 0) {
//   const localMovies = JSON.parse(localStorage.getItem('local-movies') || '[]');
// if (localMovies.length === 0 {

// })
// }

    const token = localStorage.getItem('jwt');
    mainApi.setToken(token);

    Promise.all([moviesApi.getAllCards(), mainApi.getAllCards()])
      .then(([beatCards, { data: myCards }]) => {

        // Сохраняем фильмы с Битфильма в localStorage
        localStorage.setItem('local-movies', JSON.stringify(beatCards));

        const preparedCards = beatCards.map(card => {
          const myCard = myCards.find((myCard) => myCard.movieId === card.id);
          card._id = myCard !== undefined ? myCard._id : '';
          card.movieId = card.id;
          card.thumbnail = `https://api.nomoreparties.co/${card.image.url}`;
          card.saved = myCard !== undefined;
          return card;
        })
        setCards(preparedCards);
        setFilteredCards(preparedCards);
      });
  }, []);

  // Сохранение фильмов 
  const handleSavedCard = (card) => {
    if (card.saved) {
      mainApi.deleteCard(card._id)
        .then(() => {
          setCards((beatCards) => {
            const updatedCards = beatCards.map(beatCard => {
              if (beatCard._id === card._id) {
                beatCard.saved = false;
              }
              return beatCard;
            })
            localStorage.setItem('local-movies', JSON.stringify(updatedCards));
            return updatedCards;
          })
          localStorage.removeItem('saved-movies');
        })
    } else {
      const newCard = {
        country: card.country,
        director: card.director,
        duration: card.duration,
        year: card.year,
        description: card.description,
        image: `https://api.nomoreparties.co/${card.image.url}`,
        trailerLink: card.trailerLink,
        thumbnail: `https://api.nomoreparties.co/${card.image.url}`,
        owner: card.owner,
        movieId: card.id,
        nameRU: card.nameRU,
        nameEN: card.nameEN,
      }
      mainApi.savedCard(newCard)
        .then((serverCard) => {
          setCards((beatCards) => {
            localStorage.removeItem('saved-movies');
            const updatedCards = beatCards.map(beatCard => {
              if (beatCard.id === serverCard.movieId) {
                beatCard.saved = true;
                beatCard._id = serverCard.id;
                beatCard.movieId = serverCard.movieId;
                beatCard.thumbnail = serverCard.thumbnail;
              }
              return beatCard;
            })
            localStorage.setItem('local-movies', JSON.stringify(updatedCards));
            return updatedCards;
          })
        })
    }
  }
  return (

    <section className="movies">
      <Header loggedIn={loggedIn} />
      <SearchForm
        filterCards={filterCards}
      />

      <MoviesCardList
        cards={filteredCards}
        handleSavedCard={handleSavedCard}
      />

      {buttonSearch ? <Preloader /> : null}
      <div className="movies__border"></div>
      <div className="movies__add-button">
        {cards ? <button className="movies__button">Ещё</button> : ''}
      </div>
      <Footer />
    </section>
  );
}

export default Movies