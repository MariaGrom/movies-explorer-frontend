import React, { useContext, useState, useEffect } from 'react';
import './Profile.css';
import Header from '../Header/Header';
import { CurrentUserContext } from '../../contexts/CurrentUserContext'

function Profile(props) {

  const { loggedIn, logOut, onUpdateUser, statusRequest } = props;

  // Подписываемся на контекст CurrentUserContext
  const currentUser = useContext(CurrentUserContext)

  // Переменные состояния данных пользователя
  const [name, setName] = useState(currentUser.name);
  const [email, setEmail] = useState(currentUser.email);

  // Переменные валидности полей при заполнении
  const [nameValid, setNameValid] = useState(false);
  const [emailValid, setEmailValid] = useState(false);

  // Переменная состояния статуса изменений
  const [messageStatus, setMessageStatus] = useState("!!");

  // Переменная состония валидности формы
  const [formValid, setFormValid] = useState(false);

  const [isEditDone, setIsEditDone] = useState(false);


  // Внесение данных
  const [initChange, setInitChange] = useState(true);


  // После загрузки текущего пользователя из API его данные будут использованы в управляемых компонентах.
  useEffect(() => {
    setName(currentUser.name);
    setEmail(currentUser.email);
  }, [currentUser.name, currentUser.email]);


  // Обработка запроса с сервера
  function handleStatusRequest() {
    if (statusRequest === 409) {
      setMessageStatus("Пользователь с такой почтой уже существует");
      setFormValid(false);
    } else if (statusRequest === 500) {
      setMessageStatus("Произошла ошибка сервера. Попробуйте ввести изменения позднее");
      setFormValid(false);
    } else if (statusRequest === 400) {
      setMessageStatus("Некорректно введены данные");
      setFormValid(false);
    } else if (statusRequest === 200) {
      setMessageStatus("Данные успешно обновлены");
      setFormValid(false);
    } else {
      setMessageStatus("");
      setFormValid(true);
    }
  }

  // Отслеживание состояния ответов с сервера
  useEffect(() => {
    handleStatusRequest()
  }, [statusRequest, isEditDone])

  // Функция изменения имени
  function handleChangeName(e) {
    setName(e.target.value);
    setMessageStatus('');
    setInitChange(false)
    const nameRegex = /^[а-яА-ЯёЁa-zA-Z -]+$/g

    if (e.target.value.length < 2 || e.target.value.length > 30) {
      setMessageStatus('Имя пользователя должно быть длинее 2 и меньше 30');
      setNameValid(false);
    } else if (e.target.value.length === 0) {
      setMessageStatus('Поле "Имя" не может быть пустым');
      setNameValid(false);
    } else if (!nameRegex.test(String(e.target.value).toLocaleLowerCase())) {
      setMessageStatus('Используется недопустимый символ в поле "Имя"');
      setNameValid(false);
    } else {
      setMessageStatus('');
      setNameValid(true);
    }
  }

  // Функция изменения почты
  function handleChangeEmail(e) {
    setEmail(e.target.value);
    setMessageStatus('');
    setInitChange(false)
    const emailRegex = /^([\w]+@([\w-]+\.)+[\w-]{2,4})?$/;
    if (!emailRegex.test(String(e.target.value).toLocaleLowerCase())) {
      setMessageStatus('Некорректный email');
      setEmailValid(false);
    } else if (e.target.value.length === 0) {
      setMessageStatus('Поле "E-mail" не может быть пустым');
      setEmailValid(false);
    } else {
      setMessageStatus('');
      setEmailValid(true);
    }
  }

  // Функция проверки валидности полей 
  function inputValid() {
    if (!nameValid || !emailValid) {
      setFormValid(false);
      return;
    }
    setFormValid(true);
  }

  // Отслеживание состояния полей инпутов
  useEffect(() => {
    inputValid()
  }, [name, email])

  // Обработчик формы при submit
  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();
    setIsEditDone(true);
    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateUser({ name, email, setIsEditDone });
    setMessageStatus('Данные успешно обновлены');
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
        {initChange && <span className="profile__change">Для обновления данных нужно внести изменения в форму</span>}
          <span className={`profile__message ${(isEditDone && (statusRequest === 200)) ? "profile__message_success" : ""}`}>{messageStatus}</span>
          <button type="submit" onSubmit={handleSubmit} disabled={!formValid} className={`profile__button profile__edit ${formValid ? "" : "profile__button_disabled"}`} >Редактировать</button>
          <button type="button" className="profile__button profile__checkout" onClick={logOut}>Выйти из аккаунта</button>
        </div>
      </form>
    </div>
  );
}

export default Profile