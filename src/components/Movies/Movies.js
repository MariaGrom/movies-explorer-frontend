import React from 'react';
import './Movies.css';
import SearchForm from './SearchForm/SearchForm';
import MoviesCardList from './MoviesCardList/MoviesCardList';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';


function Movies() {
  return (
    <div className="Movies">
      <Header />
      <SearchForm />
      <MoviesCardList />
      <div className="movies__add-button">
        <button className="movies__button">Ещё</button>
      </div>
      <Footer />
    </div>
  );
}

export default Movies