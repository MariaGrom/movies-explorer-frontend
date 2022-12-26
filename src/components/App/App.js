import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Register from '../Register/Register';
import Login from '../Login/Login'
import Main from '../Main/Main';
import Header from '../Header/Header';
import Movies from '../Movies/Movies';
import Footer from '../Footer/Footer';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';

function App() {
  return (

    <div className="App">
      <Header />
      <Routes>
        <Route path='/signup' element={<Register />} />
        <Route path='/signin' element={<Login />} />
        <Route path='/' element={<Main />} />
        <Route path='/movies' element={<Movies />} />
        <Route path='/saved-movies' element={<SavedMovies />} />
        <Route path='/profile' element={<Profile />} />

        
    </Routes>
    <Footer />
      </div >

  
  );
}

export default App;
