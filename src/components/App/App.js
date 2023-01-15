import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Register from '../Register/Register';
import Login from '../Login/Login'
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import InfoTooltip from '../InfoTooltip/InfoTooltip';


function App() {

  const [loggedIn, setLoggedIn] = React.useState(true);
  // const [user, setUser] = React.useState({
  //   name: 'Мария',
  //   email: 'pochta@pochta.ru'
  // })

  return (

    <div className="App">

      <Routes>


        <Route path='/signup' element={<Register />} />
        <Route path='/signin' element={<Login />} />
        <Route path='/' element={<Main  loggedIn={loggedIn}/>} />
        <Route path='/movies' element={<Movies loggedIn={loggedIn}/>} />
        <Route path='/saved-movies' element={<SavedMovies loggedIn={loggedIn}/>} />
        <Route path='/profile' element={<Profile loggedIn={loggedIn}/>} />
        <Route path='/*' element={<InfoTooltip />} />

        
    </Routes>
      </div >

  
  );
}

export default App;
