import React, { useState, useEffect } from 'react';
import './App.css';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Register from '../Register/Register';
import Login from '../Login/Login'
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import NotFound from '../NotFound/NotFound';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import mainApi from '../../utils/MainApi'
import { defaultCurrentUser, CurrentUserContext } from '../../contexts/CurrentUserContext';


function App() {

  // Переменные состояния зарегистрированного пользователя
  const [loggedIn, setLoggedIn] = useState(true);
  // Переменная состояния пользователя 
  const [currentUser, setCurrentUser] = useState(defaultCurrentUser);
  // Переменная состояния обработки запросов
  const [statusRequest, setStatusRequest] = useState(null);


  // Навигация 
  let navigate = useNavigate();


  // Функция получения токена
  function checkToken() {
    const token = localStorage.getItem('jwt');
    mainApi.setToken(token)
    if (token) {
      mainApi.getUserInfo()
        .then((user) => {
          if (user && user.data) {
            setCurrentUser(user.data);
            setLoggedIn(true);
          } else {
            setLoggedIn(false);
            navigate('/signin');
          }
        })
        .catch((err) => {
          console.log('Ошибка токена в АПИ' , err)
          setLoggedIn(false)
        })
    } else {
      setLoggedIn(false);
    }
  };

  useEffect(() => {
    checkToken();
  }, [loggedIn])


  // Функция регистрации пользователя 
  function handleRegister(registrationData) {
    const email = registrationData.email;
    const password = registrationData.password;
    mainApi.register(registrationData)
      .then((result) => {
        if (result && result.data) {
          handleLogin({email, password });
          setStatusRequest(200)
        } else {
          setLoggedIn(false);
        }
      })
      .catch((err) => {
        setLoggedIn(false);
        setStatusRequest(err)
        console.log('Ошибка #2 при регистрации', err)
      })
  };

  // Функция логина пользователя 
  function handleLogin(loginData) {
    mainApi.login(loginData)
      .then((result) => {
        if (result && result.token) {
          localStorage.setItem('jwt', result.token);
          navigate('/movies');
          setLoggedIn(true);
          setStatusRequest(200)
        } else {
          setLoggedIn(false);
        }
      })
      .catch((err) => {
        setLoggedIn(false);
        setStatusRequest(err);
        console.log('Ошибка логирования #2', err)
      })
  }


  // Функция выхода из аккаунта
  function logOut() {
    setLoggedIn(false);
    setCurrentUser(defaultCurrentUser);
    localStorage.clear();
    navigate('/signin');
    console.log('Выход')
  }

  // Функция обновления пользователя 
  function handleUpdateUser(userData) {
    mainApi.setUserInfo(userData)
      .then((userDataServer) => {
        setCurrentUser({ ...currentUser, ...userDataServer })
        setStatusRequest(200);
      })
      .catch((err) => {
        console.log(err);
        setStatusRequest(err);
      })
  };


  return (
    <CurrentUserContext.Provider value={currentUser} >

      <div className="app">
        <Routes>
          <Route
            path='/signup'
            element={
              <ProtectedRoute loggedIn={!loggedIn}>
                <Register
                  onRegister={handleRegister} 
                  statusRequest={statusRequest}
                  />
              </ProtectedRoute>}
          />

          <Route
            path='/signin'
            element={
              <ProtectedRoute loggedIn={!loggedIn}>
                <Login
                  onLogin={handleLogin} 
                  statusRequest={statusRequest}
                  />
              </ProtectedRoute>}
          />

          <Route path='/'
            element={
              <Main loggedIn={loggedIn}
              />}
          />

          <Route path='/movies' element={
            <ProtectedRoute loggedIn={loggedIn}>
              <Movies
                loggedIn={loggedIn} />
            </ProtectedRoute>
          } />

          <Route path='/saved-movies' element={
            <ProtectedRoute loggedIn={loggedIn}>
              <SavedMovies
                loggedIn={loggedIn} />
            </ProtectedRoute>
          } />

          <Route path='/profile' element={
            <ProtectedRoute loggedIn={loggedIn}>
              <Profile
                loggedIn={loggedIn}
                logOut={logOut}
                dataUser={currentUser}
                onUpdateUser={handleUpdateUser}
                statusRequest={statusRequest}
              />
            </ProtectedRoute>
          } />

          <Route path='/*'
            element={<NotFound />}
          />


        </Routes>
      </div >
    </CurrentUserContext.Provider>
  );
}

export default App;
