import React, { useState, useEffect } from 'react';
import './SavedMovies.css';
import SearchForm from '../Movies/SearchForm/SearchForm';
import MoviesCardList from '../Movies/MoviesCardList/MoviesCardList';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import mainApi from '../../utils/MainApi';


function SavedMovies({ loggedIn }) {
  // Переменная состояния карточек
  const [cards, setCards] = useState([]);
  // Переменная состояния для фильтрации карточек
  const [filteredCards, setFilteredCards] = useState([]);
  // Переменная состояния прелоадера
  const [statusPreloader, setStatusPreloader] = useState(false);


  // Функция фильтрации карточек
  const filterCards = (search) => {
    setFilteredCards(cards.filter((card) => {
      const isNameMovie = card.nameRU.toLowerCase().includes(search.name.toLowerCase());
      const isShortsMovie = search.isShortsMovie ? card.duration <= 40 : true;
      return isNameMovie && isShortsMovie;
    }))
  }

  useEffect(() => {
    const token = localStorage.getItem('jwt');
    mainApi.setToken(token)
    setStatusPreloader(true);
    const savedMovies = JSON.parse(localStorage.getItem('saved-movies') || '[]');
    if (savedMovies.length === 0) {
      mainApi.getAllCards()
        .then((serverCards) => {
          localStorage.setItem('saved-movies', JSON.stringify(serverCards.data));
          setCards(serverCards.data);
          setFilteredCards(serverCards.data);
          setStatusPreloader(false);
        });
    } else {
      setCards(savedMovies);
      setFilteredCards(savedMovies);
      setStatusPreloader(false);
    }
  }, [])

  const handleSavedCard = (card) => {
    mainApi.deleteCard(card._id)
      .then(() => {
        setFilteredCards((savedCards) => {
          const localMovies = JSON.parse(localStorage.getItem('local-movies') || '[]');
          const editedLocalMovies = localMovies.map((movie) => {
            if (movie.id === card.movieId) {
              movie.saved = false;
            }
            return movie;
          })
          localStorage.setItem('local-movies', JSON.stringify(editedLocalMovies));
          const filteredSavedCards = savedCards.filter(savedCard => savedCard._id !== card._id);
          localStorage.setItem('saved-movies', JSON.stringify(filteredSavedCards));
          return filteredSavedCards;
        })
      })
  }

  return (
    <section className="savedmovies">
      <Header loggedIn={loggedIn} />

      <SearchForm
        filterCards={filterCards}
        required={false}
        page="saved-movies" />

      <MoviesCardList
        cards={filteredCards}
        handleSavedCard={handleSavedCard}
        statusPreloader={statusPreloader}
      />

      <Footer />
    </section>
  );
}

export default SavedMovies