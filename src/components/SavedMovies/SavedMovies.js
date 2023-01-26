import React, { useState, useEffect } from 'react';
import './SavedMovies.css';
import SearchForm from '../Movies/SearchForm/SearchForm';
import MoviesCardList from '../Movies/MoviesCardList/MoviesCardList';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import moviesApi from '../../utils/MoviesApi';
import mainApi from '../../utils/MainApi';


function SavedMovies(props) {

  const { loggedIn } = props;

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

  useEffect(() => {
    const token = localStorage.getItem('jwt');
    mainApi.setToken(token)
    const savedMovies = JSON.parse(localStorage.getItem('saved-movies') || '[]');
    if (savedMovies.length === 0) {
      mainApi.getAllCards()
        .then((serverCards) => {
          localStorage.setItem('saved-movies', JSON.stringify(serverCards.data));
          setCards(serverCards.data);
          setFilteredCards(serverCards.data);
        });
    } else {
      setCards(savedMovies);
      setFilteredCards(savedMovies);
    }
  }, [])

  const handleSavedCard = (card) => {
    mainApi.deleteCard(card._id)
      .then(() => {
        setFilteredCards((savedCards) => {
         const filteredSavedCards = savedCards.filter(savedCard => savedCard._id !== card._id);
         localStorage.setItem('saved-movies', JSON.stringify(filteredSavedCards));
         return filteredSavedCards;
        })
      })
  }

  return (
    <section className="savedmovies">
      <Header loggedIn={loggedIn} />
      <SearchForm filterCards={filterCards} required={false} />
      <MoviesCardList
        cards={filteredCards}
        handleSavedCard={handleSavedCard}
        
      />
      <div className="movies__add-button savedmovies__add-button">
        <button className="movies__button movies__button_hidden">Ещё</button>
      </div>
      <Footer />
    </section>
  );
}

export default SavedMovies