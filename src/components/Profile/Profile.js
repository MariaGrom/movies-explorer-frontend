import React from 'react';
import './Profile.css';
import Header from '../Header/Header';

function Profile(props) {

  const { loggedIn } = props

  return (
    <div>
      <Header loggedIn={loggedIn} />
      <section className="profile">
        <h2 className="profile__greetings">Привет, Виталий!</h2>
        <fieldset className="profile__user">
          <label className="profile__data">
            <p className="profile__data-field">Имя</p>
            <input
              id="profile__name"
              className="profile__input"
              type="text"
              name="name"
              placeholder="Виталий"
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
            />
          </label>
        </fieldset >
        <div className="profile__buttons">
          <span className="profile__error">При обновлении профиля произошла ошибка.</span>
          <button className="profile__button profile__edit">Редактировать</button>
          <button className="profile__button profile__checkout">Выйти из аккаунта</button>
        </div>
      </section>
    </div>
  );
}

export default Profile