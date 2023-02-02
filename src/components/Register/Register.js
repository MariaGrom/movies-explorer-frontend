import React, { useState, useEffect } from 'react';
import './Register.css';
import PageForm from '../PageForm/PageForm';
import logo from '../../img/logo-min.png';
import { Link } from 'react-router-dom';

function Register({ onRegister, statusRequest }) {

  // Переменные состояния полей почты и пароля 
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // Переменные состояния ошибок при заполнении полей
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordlError] = useState('');
  // Переменные валидности полей при заполнении
  const [nameValid, setNameValid] = useState(false);
  const [emailValid, setEmailValid] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);
  // Переменная состояния статуса изменений
  const [messageStatus, setMessageStatus] = useState("");
  // Переменная состония валидности формы
  const [formValid, setFormValid] = useState(false);

  // Обработка запроса с сервера
  function handleStatusRequest() {
    if (statusRequest === 409) {
      setMessageStatus("Пользователь с такой почтой уже существует");
    } else if (statusRequest === 500) {
      setMessageStatus("Произошла ошибка сервера. Попробуйте ввести изменения позднее");
    } else if (statusRequest === 400) {
      setMessageStatus("Некорректно введены данные");
    } else {
      setMessageStatus("");
    }
  }

  // Отслеживание состояния ответов с сервера
  useEffect(() => {
    handleStatusRequest()
  }, [statusRequest])


  // Функция изменения имени пользователя и проверка формы
  const handleChangeName = (e) => {
    setName(e.target.value);
    setMessageStatus("");
    const nameRegex = /^[а-яА-ЯёЁa-zA-Z -]+$/g

    if (e.target.value.length === 0) {
      setNameError('Поле не может быть пустым');
      setNameValid(false);
    } else if (e.target.value.length < 2 || e.target.value.length > 30) {
      setNameError('Имя пользователя должно быть длинее 2 и меньше 30');
      setNameValid(false);
    } else if (!nameRegex.test(String(e.target.value).toLocaleLowerCase())) {
      setNameError('Некорректное имя');
      setNameValid(false);
    } else {
      setNameError('');
      setNameValid(true);
    }
  }

  // Функция изменения почты пользователя и проверка формы
  function handleChangeEmail(e) {
    setEmail(e.target.value);
    setMessageStatus("");
    const emailRegex = /^([\w]+@([\w-]+\.)+[\w-]{2,4})?$/;

    if (e.target.value.length === 0) {
      setEmailError('Поле не может быть пустым');
      setEmailValid(false);
    } else if (!emailRegex.test(String(e.target.value).toLocaleLowerCase())) {
      setEmailError('Некорректный email');
      setEmailValid(false);
    } else {
      setEmailError('');
      setEmailValid(true);
    }
  }

  // Функция изменения пароля пользователя и проверка формы
  function handleChangePassword(e) {
    setPassword(e.target.value);
    setMessageStatus("");

    if (!e.target.value) {
      setPasswordlError('Поле не может быть пустым');
      setPasswordValid(false);
    } else {
      setPasswordlError('');
      setPasswordValid(true);
    }
  }

  // Функция проверки валидности полей 
  function inputValid() {
    if (!nameValid || !emailValid || !passwordValid) {
      setFormValid(false);
      return;
    }
    setFormValid(true);
  }

  // Функция сохранения формы
  function handleSubmit(e) {
    e.preventDefault()
    onRegister({ name, email, password })
  }

  // Отслеживание состояния полей инпутов
  useEffect(() => {
    inputValid()
  }, [name, email, password])

  return (
    <form onSubmit={handleSubmit} className="form">
      <div className="form__greetings" >
        <Link to="/"><img className="form__logo" src={logo} alt="логотип" /></Link>
        <h2 className="form__title">Добро пожаловать!</h2>
      </div>
      <div className="form__main">
        <fieldset className="form__fields">
          <label className="form__field">
            <p className="form__text">Имя</p>
            <input
              id="input__name"
              className="form__input"
              type="text"
              name="name"
              required
              value={name}
              onChange={handleChangeName}
            />
            <span className="input__error input__error-name">{nameError}</span>
          </label>
          <label className="form__field">
            <p className="form__text">E-mail</p>
            <input
              id="input__email"
              className="form__input"
              type="text"
              name="email"
              required
              value={email}
              onChange={handleChangeEmail}
            />
            <span className="input__error input__error-email">{emailError}</span>
          </label>
          <label className="form__field">
            <p className="form__text">Пароль</p>
            <input
              id="input__password"
              className="form__input"
              type="password"
              name="password"
              value={password}
              onChange={handleChangePassword}
              required
            />
            <span className="input__error input__error-password">{passwordError}</span>
          </label>
        </fieldset>
        <div className="form__submit">
          <span className="form__status-request">{messageStatus}</span>
          <button type="submit" disabled={!formValid} className={`form__submit-button ${formValid ? "" : "form__submit-button_disabled"}`}>Зарегистрироваться</button>
          <span className="form__subtitle">Уже зарегистрированы?<Link to="/signin" className="form__link">Войти</Link></span>
        </div>
      </div>
    </form>
  );
}

export default Register