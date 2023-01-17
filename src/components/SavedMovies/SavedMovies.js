import React from 'react';
import './SavedMovies.css';
import SearchForm from '../Movies/SearchForm/SearchForm';
import MoviesCardList from '../Movies/MoviesCardList/MoviesCardList';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';


function SavedMovies(props) {

const {loggedIn} = props

  return (
    <div className="savedmovies">
      <Header loggedIn={loggedIn}/>
      <SearchForm />
      <MoviesCardList />
      <div className="movies__add-button savedmovies__add-button">
        <button className="movies__button movies__button_hidden">Ещё</button>
      </div>
      <Footer />
    </div>
  );
}

export default SavedMovies