import React from 'react';
import './Profile.css';
import Header from '../Header/Header';
import {CurrentUserContext} from '../../contexts/CurrentUserContext'

function Profile(props) {

  const { loggedIn, logOut, onUpdateUser  } = props

  // Подписываемся на контекст CurrentUserContext
  const currentUser=React.useContext(CurrentUserContext)

  const [name, setName] = React.useState(currentUser.name);
  const [email, setEmail] = React.useState(currentUser.email);

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeEmail(e) {
    setEmail(e.target.value);
  }

  //   После загрузки текущего пользователя из API
  // его данные будут использованы в управляемых компонентах.
  React.useEffect(() => {
    setName(currentUser.name);
    setEmail(currentUser.email);
  }, [currentUser.name, currentUser.email]);



    // Обработчик формы при submit
    function handleSubmit(e) {
      // Запрещаем браузеру переходить по адресу формы
      e.preventDefault();
  
      // Передаём значения управляемых компонентов во внешний обработчик
      onUpdateUser({name,email});
      console.log('Данные успешно обновились!')
    }

  return (
    <div>
      <Header loggedIn={loggedIn} />
      <form className="profile" onSubmit={handleSubmit} >
        <h2 className="profile__greetings">Привет, {name}!</h2>
        <fieldset className="profile__user">
          <label className="profile__data">
            <p className="profile__data-field">Имя</p>
            <input
              id="profile__name"
              className="profile__input"
              type="text"
              name="name"
              placeholder="Виталий"
              value={name}
              onChange={handleChangeName}
            />
          </label>
          <label className="profile__data">
            <p className="profile__data-field">E-mail</p>
            <input
              id="profile__email"
              className="profile__input"
              type="text"
              name="email"
              placeholder='pochta@yandex.ru'
              value={email}
              onChange={handleChangeEmail}
            />
          </label>
        </fieldset >
        <div className="profile__buttons">
          <span className="profile__error">При обновлении профиля произошла ошибка.</span>
          <button type="submit" className="profile__button profile__edit" onSubmit={handleSubmit}>Редактировать</button>
          <button type="button" className="profile__button profile__checkout" onClick={logOut}>Выйти из аккаунта</button>
        </div>
      </form>
    </div>
  );
}

export default Profile