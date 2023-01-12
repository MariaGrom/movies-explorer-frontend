import React from 'react';
import './Profile.css'

function Profile() {
  return (
    <div className="profile">
      <h2 className="profile__greetings">Привет, Виталий!</h2>
      <div className="profile__user">
        <div className="profile__data">
          <p className="profile__data-field">Имя</p>
          <p className="profile__name">Виталий</p>
        </div>
        <div className="profile__data">
          <p className="profile__data-field">E-mail</p>
          <p className="profile__email">pochta@yandex.ru</p>
        </div>
      </div>
      <div className="profile__buttons">
        <button className="profile__button profile__edit">Редактировать</button>
        <button className="profile__button profile__checkout">Выйти из аккаунта</button>
      </div>
    </div>
  );
}

export default Profile