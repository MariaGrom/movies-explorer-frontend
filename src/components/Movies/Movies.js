import React, { useState } from 'react';
import './Movies.css';
import SearchForm from './SearchForm/SearchForm';
import MoviesCardList from './MoviesCardList/MoviesCardList';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import moviesApi from '../../utils/MoviesApi';
import mainApi from '../../utils/MainApi';

// Постоянная, определяющая количество отображаемых карточек на экране
const displayOfCards = () => {
  const display = {
    start: 12,
    load: 3
  }
  if (window.innerWidth < 990) {
    display.start = 8;
    display.load = 2;
  }
  if (window.innerWidth < 767) {
    display.start = 5;
    display.load = 1;
  }
  return display
}

function Movies({ loggedIn }) {

  // Переменная отображения карточек на экране
  const display = displayOfCards();
  // Переменная состояния для карточек 
  const [cards, setCards] = useState([]);
  // Переменная состояния для фильтрации карточек
  const [filteredCards, setFilteredCards] = useState([]);
  // Переменная поиска
  const [searchQuery, setSearchQuery] = useState(false);
  // Переменная состояния контейнера для карточек
  const [displayedCards, setDisplayedCards] = useState(display.start);
  // Переменная прелоадера
  const [statusPreloader, setStatusPreloader] = useState(false);

  // Функция загрузки карточек
  const loadingCards = () => {
    const display = displayOfCards();
    setDisplayedCards(displayedCards + display.load)
  }

  // Функция фильтрации карточек
  const filterCards = (search) => {
    setSearchQuery(true)
    // Фильтр карточек по названию и продолжительности
    const filter = (cards) => {
      setFilteredCards(cards.filter((card) => {
        const isNameMovie = card.nameRU.toLowerCase().includes(search.name.toLowerCase());
        const isShortsMovie = search.isShortsMovie ? card.duration <= 40 : true;
        return isNameMovie && isShortsMovie;
      }))
    }
    if (cards.length === 0) {
      const localMovies = JSON.parse(localStorage.getItem('local-movies') || '[]');

      if (localMovies.length === 0) {
        const token = localStorage.getItem('jwt');
        mainApi.setToken(token);
        setStatusPreloader(true);
        Promise.all([moviesApi.getAllCards(), mainApi.getAllCards()])
          .then(([beatCards, { data: localCards }]) => {
            const combinedCards = beatCards.map(card => {
              const localCard = localCards.find((localCard) => localCard.movieId === card.id);
              // Задаем единое название для карточек с битфильма и карточек с нашего сервера
              card._id = localCard !== undefined ? localCard._id : '';
              card.movieId = card.id;
              card.thumbnail = `https://api.nomoreparties.co/${card.image.url}`;
              card.saved = localCard !== undefined;
              return card;
            })
            setCards(combinedCards);
            filter(combinedCards);
            // Сохраняем фильмы с Битфильма в localStorage
            localStorage.setItem('local-movies', JSON.stringify(combinedCards));
            setStatusPreloader(false);
          });
      } else {
        setCards(localMovies);
        filter(localMovies);
      }
    } else {
      filter(cards);
      setDisplayedCards(display.start)
    }
  }

  // Взаимодействие с карточками (постановка и снятие лайка с карточки)
  const handleSavedCard = (card) => {
    if (card.saved) {
      mainApi.deleteCard(card._id)
        .then(() => {
          setCards((beatCards) => {
            const editedCards = beatCards.map(beatCard => {
              if (beatCard._id === card._id) {
                beatCard.saved = false;
              }
              return beatCard;
            })
            localStorage.setItem('local-movies', JSON.stringify(editedCards));
            return editedCards;
          })
          localStorage.removeItem('saved-movies');
        })
    } else {
      const recentCard = {
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
      mainApi.savedCard(recentCard)
        .then((serverCard) => {
          setCards((beatCards) => {
            localStorage.removeItem('saved-movies');
            const editedCards = beatCards.map(beatCard => {
              if (beatCard.id === serverCard.movieId) {
                beatCard.saved = true;
                beatCard._id = serverCard._id;
                beatCard.movieId = serverCard.movieId;
                beatCard.thumbnail = serverCard.thumbnail;
              }
              return beatCard;
            })
            localStorage.setItem('local-movies', JSON.stringify(editedCards));
            return editedCards;
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
      />

      <MoviesCardList
        cards={filteredCards.filter((_, i) => i < displayedCards)}
        handleSavedCard={handleSavedCard}
        searchQuery={searchQuery}
        statusPreloader={statusPreloader}
      />

      {(filteredCards.length > displayedCards) &&
        <div className="movies__add-button">
          <button className="movies__button" onClick={loadingCards}>Ещё</button>
        </div>}

      <Footer />
    </section>
  );
}

export default Movies
