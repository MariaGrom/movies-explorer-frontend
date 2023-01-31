import React, { useContext, useState, useEffect } from 'react';
import './Profile.css';
import Header from '../Header/Header';
import { CurrentUserContext } from '../../contexts/CurrentUserContext'

function Profile(props) {

  const { loggedIn, logOut, onUpdateUser } = props;

  // Подписываемся на контекст CurrentUserContext
  const currentUser = useContext(CurrentUserContext);
  // Переменные состояния данных пользователя
  const [name, setName] = useState(currentUser.name);
  const [email, setEmail] = useState(currentUser.email);
  // Переменная состояния статуса изменений
  const [messageStatus, setMessageStatus] = useState("");
  // Переменная состояния валидности формы
  const [formValid, setFormValid] = useState(false);
  // Переменная состояния кнопки
  const [buttonDisabled, setButtonDisabled] = useState(true);
  // Внесение данных
  const [initChange, setInitChange] = useState(false);
  // Переменная состояния ошибок с сервера
  const [apiError, setApiError] = useState();
  //Переменная состояния успешного результата
  const [updateForm, setUpdateForm] = useState();


  // После загрузки текущего пользователя из API его данные будут использованы в управляемых компонентах.
  useEffect(() => {
    setButtonDisabled(currentUser.name === name && currentUser.email === email)
  }, [name, email, currentUser.name, currentUser.email]);


  useEffect(() => {
    setName(currentUser.name);
    setEmail(currentUser.email);
  }, [currentUser.name, currentUser.email]);


  // Функция изменения имени
  function handleChangeName(e) {
    setName(e.target.value);
    setMessageStatus(e.target.validationMessage);
    setInitChange(true);
    setFormValid(e.target.closest('form').checkValidity());
    setApiError('');
    setUpdateForm('');
  }

  // Функция изменения почты
  function handleChangeEmail(e) {
    setEmail(e.target.value);
    setInitChange(true);
    setMessageStatus(e.target.validationMessage);
    setFormValid(e.target.closest('form').checkValidity());
    setApiError('');
    setUpdateForm('');
  }

  // Обработчик формы при submit
  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();
    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateUser({ name, email }, setUpdateForm, setApiError )
  }

  return (
    <div>
      <Header loggedIn={loggedIn} />
      <form className="profile" onSubmit={handleSubmit} noValidate>
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
              minLength={2}
              maxLength={30}
              required
            />
          </label>
          <label className="profile__data">
            <p className="profile__data-field">E-mail</p>
            <input
              id="profile__email"
              className="profile__input"
              type="email"
              name="email"
              placeholder='pochta@yandex.ru'
              value={email}
              onChange={handleChangeEmail}
              required
            />
          </label>
        </fieldset >
        <div className="profile__buttons">
          {!initChange && <span className="profile__change">Для обновления данных нужно внести изменения в форму</span>}
          {messageStatus && <span className="profile__message" > {messageStatus} </span>}
          {apiError  && <span className="profile__message" >{apiError}</span>}
          {updateForm && <span className="profile__message profile__message_success">{updateForm}</span>}
          <button type="submit" onSubmit={handleSubmit} disabled={!formValid || buttonDisabled} className={`profile__button profile__edit ${formValid ? "" : "profile__button_disabled"}`} >Редактировать</button>
          <button type="button" className="profile__button profile__checkout" onClick={logOut}>Выйти из аккаунта</button>
        </div>
      </form>
    </div>
  );
}

export default Profile