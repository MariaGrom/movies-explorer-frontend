import React, { useContext, useState, useEffect } from 'react';
import './Profile.css';
import Header from '../Header/Header';
import { CurrentUserContext } from '../../contexts/CurrentUserContext'

function Profile(props) {

  const { loggedIn, logOut, onUpdateUser, userStatusRequest } = props

  // Подписываемся на контекст CurrentUserContext
  const currentUser = useContext(CurrentUserContext)

  // Переменные состояния данных пользователя
  const [name, setName] = useState(currentUser.name);
  const [email, setEmail] = useState(currentUser.email);

  // Переменные состояния ошибок при заполнении полей
  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);

  // Переменная состония валидности формы
  const [formValid, setFormValid] = useState(false);

  // Переменная состояния статуса изменений
  const [messageStatus, setMessageStatus] = useState("");


  // Функция изменения имени
  function handleChangeName(e) {
    setName(e.target.value);
    setMessageStatus('');
    const nameRegex = /^[а-яА-ЯёЁa-zA-Z -]+$/g
    if (e.target.value.length < 2 || e.target.value.length > 30) {
      setMessageStatus('Имя пользователя должно быть длинее 2 и меньше 30');
      setNameError(false);
      setFormValid(false);
    } else if (e.target.value.length === 0) {
      setMessageStatus('Поле "Имя" не может быть пустым');
      setNameError(false);
      setFormValid(false);
    } else if (!nameRegex.test(String(e.target.value).toLocaleLowerCase())) {
      setMessageStatus('Используется недопустимый символ в поле "Имя"');
      setNameError(false);
      setFormValid(false);
    } else {
      setMessageStatus('');
      setNameError(true);
      setFormValid(true);
    }
  }

  // Функция изменения почты
  function handleChangeEmail(e) {
    setEmail(e.target.value);
    setMessageStatus('');
    const emailRegex = /^([\w]+@([\w-]+\.)+[\w-]{2,4})?$/;
    if (!emailRegex.test(String(e.target.value).toLocaleLowerCase())) {
      setMessageStatus('Некорректный email');
      setEmailError(false);
      setFormValid(false);
    } else if (e.target.value.length === 0) {
      setMessageStatus('Поле "E-mail" не может быть пустым');
      setEmailError(false);
      setFormValid(false);
    } else {
      setMessageStatus('');
      setEmailError(true);
      setFormValid(true);
    }
  }

  // Отслеживание состояния валидности формы
  useEffect(() => {
    if (nameError || emailError) {
      setFormValid(false)
    } else {
      setFormValid(true)
    }
  }, [nameError, emailError])

  //   После загрузки текущего пользователя из API его данные будут использованы в управляемых компонентах.
  useEffect(() => {
    setName(currentUser.name);
    setEmail(currentUser.email);
  }, [currentUser.name, currentUser.email,]);


  // Обработка запроса
  function handleStatusRequest() {
    if (userStatusRequest === 200) {
      setMessageStatus("Изменения успешно сохранены")
    } else if (userStatusRequest === 409) {
      setMessageStatus("Пользователь с такой почтой уже существует")
    } else if (userStatusRequest === 500) {
      setMessageStatus("Произошла ошибка сервера. Попробуйте ввести изменения позднее")
    } else if (userStatusRequest === 400) {
      setMessageStatus("Некорректно внесы изменения")
    } else {
      setMessageStatus("")
    }
  }

  // Обработка сообщений с сервера
  useEffect(() => {
    handleStatusRequest()
  }, [userStatusRequest])


  // Отслеживание состония валидности формы
  useEffect(() => {
    if (nameError || emailError) {
      setFormValid(false)
    } else {
      setFormValid(true)
    }
  }, [nameError, emailError])


  // Обработчик формы при submit
  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateUser({ name, email });
    setMessageStatus("Изменения успешно сохранены");
  }


  // Определение свойств css сообщения об ошибке
  const classMessageStatus = (userStatusRequest === 200) ? 'profile__message profile__message_success' : 'profile__message';

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
              required
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
              required
            />
          </label>
        </fieldset >
        <div className="profile__buttons">
          <span className={classMessageStatus}>{messageStatus}</span>
          <button type="submit" onSubmit={handleSubmit} disabled={!formValid} className={`profile__button profile__edit ${formValid ? "" : "profile__button_disabled"}`} >Редактировать</button>
          <button type="button" className="profile__button profile__checkout" onClick={logOut}>Выйти из аккаунта</button>
        </div>
      </form>
    </div>
  );
}

export default Profile