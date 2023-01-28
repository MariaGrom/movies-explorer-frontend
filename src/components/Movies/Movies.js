import React, { useState } from 'react';
import './Movies.css';
import SearchForm from './SearchForm/SearchForm';
import MoviesCardList from './MoviesCardList/MoviesCardList';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import moviesApi from '../../utils/MoviesApi';
import Preloader from './Preloader/Preloader';
import mainApi from '../../utils/MainApi';

const calcCardCounter = () => {
  const counters = {
    start: 12,
    load: 3
  }
  if (window.innerWidth < 990) {
    counters.start = 8;
    counters.load = 2;
  }
  if (window.innerWidth < 767) {
    counters.start = 5;
    counters.load = 1;
  }
  return counters
}


function Movies({ loggedIn }) {

  const counters = calcCardCounter();

  // Переменная состония контейнера для карточек
  const [cardsCounter, setCardsCounter] = useState(counters.start)
  // Переменная состония для карточек 
  const [cards, setCards] = useState([]);
  // Переменная состония для фильтрации фильмов
  const [filteredCards, setFilteredCards] = useState([]);
  // Переменная поиска
  const [searchFormWasInit, setSearchFormWasInit] = useState(false);
  // Переменная прелоадера
  const [statusPreloader, setStatusPreloader] = useState(false);


  // Функция загрузки карточек
  const loadCards = () => {
    const counters = calcCardCounter();
    setCardsCounter(cardsCounter + counters.load)
  }

  // Функция фильтрации карточек
  const filterCards = (search) => {
    setSearchFormWasInit(true)
    // Фильтр карточек по названию и продолжительности
    const filter = (cards) => {
      setFilteredCards(cards.filter((card) => {
        const isName = card.nameRU.toLowerCase().includes(search.name.toLowerCase());
        const isShorts = search.isShorts ? card.duration <= 40 : true;
        return isName && isShorts;
      }))
    }
    if (cards.length === 0) {
      const localMovies = JSON.parse(localStorage.getItem('local-movies') || '[]');

      if (localMovies.length === 0) {
        const token = localStorage.getItem('jwt');
        mainApi.setToken(token);
        setStatusPreloader(true);
        Promise.all([moviesApi.getAllCards(), mainApi.getAllCards()])
          .then(([beatCards, { data: myCards }]) => {
            const preparedCards = beatCards.map(card => {
              const myCard = myCards.find((myCard) => myCard.movieId === card.id);
              // Задаем единое название для карточек с битфильма и карточек с нашего сервера
              card._id = myCard !== undefined ? myCard._id : '';
              card.movieId = card.id;
              card.thumbnail = `https://api.nomoreparties.co/${card.image.url}`;
              card.saved = myCard !== undefined;
              return card;
            })
            setCards(preparedCards);
            filter(preparedCards);
            // Сохраняем фильмы с Битфильма в localStorage
            localStorage.setItem('local-movies', JSON.stringify(preparedCards));
            setStatusPreloader(false);
          });
      } else {
        setCards(localMovies);
        filter(localMovies);
      }
    } else {
      filter(cards);
      setCardsCounter(counters.start)
    }
  }

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
                beatCard._id = serverCard._id;
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
        page="movies"
        searchFormWasInit={searchFormWasInit}
      />

      <MoviesCardList
        cards={filteredCards.filter((_, i) => i < cardsCounter)}
        handleSavedCard={handleSavedCard}
        loadCards={loadCards}
        searchFormWasInit={searchFormWasInit}
      />

      {statusPreloader && <Preloader />}

      {(filteredCards.length > cardsCounter) &&
       <div className="movies__add-button">
        <button className="movies__button" onClick={loadCards}>Ещё</button>
      </div>}

      <Footer />
    </section>
  );
}

export default Movies
