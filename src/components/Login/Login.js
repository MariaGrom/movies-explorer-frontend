import React, { useState, useEffect } from 'react';
import './Login.css';
import logo from '../../img/logo-min.png';
import { Link } from 'react-router-dom';
import PageForm from '../PageForm/PageForm';

function Login({ onLogin, statusRequest }) {

  // Переменные состояния полей почты и пароля 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // Переменные состояния ошибок при заполнении полей
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordlError] = useState('');
  // Переменные валидности полей при заполнении
  const [emailValid, setEmailValid] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);
  // Переменная состояния статуса изменений
  const [messageStatus, setMessageStatus] = useState("");
  // Переменная состония валидности формы
  const [formValid, setFormValid] = useState(false);

  // Обработка запроса с сервера
  function handleStatusRequest() {
    if (statusRequest === 401) {
      setMessageStatus("Такого пользователя не существует. Придется регистрироваться");
    } else if (statusRequest === 500) {
      setMessageStatus("Произошла ошибка сервера. Попробуйте ввести изменения позднее");
    } else if (statusRequest === 400) {
      setMessageStatus("Некорректно введены данные");
    } else {
      setMessageStatus("");
    }
  }

  // Отслеживание состония ответов с сервера
  useEffect(() => {
    handleStatusRequest()
  }, [statusRequest])


  // Функция изменения имени пользователя и проверка формы
  function handleChangeEmail(e) {
    setEmail(e.target.value);
    setMessageStatus("");
    const re = /^([\w]+@([\w-]+\.)+[\w-]{2,4})?$/;

    if (e.target.value.length === 0) {
      setEmailError('Поле не может быть пустым');
      setEmailValid(false);
    } else if (!re.test(String(e.target.value).toLocaleLowerCase())) {
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
    if (!emailValid || !passwordValid) {
      setFormValid(false);
      return;
    }
    setFormValid(true);
  }

  // Функция сохранения формы
  function handleSubmit(e) {
    e.preventDefault()
    onLogin({ email, password })
  }

  // Отслеживание состояния полей инпутов
  useEffect(() => {
    inputValid()
  }, [email, password])

  return (
    <form onSubmit={handleSubmit} className="form">
      <div className="form__greetings" >
        <Link to="/"><img className="form__logo" src={logo} alt="логотип" /></Link>
        <h2 className="form__title">Рады!</h2>
      </div>
      <div className="form__main">
        <fieldset className="form__fields">
          <label className="form__field">
            <p className="form__text">E-mail</p>
            <input
              id="input__email"
              className="form__input"
              type="text"
              name="email"
              value={email}
              onChange={handleChangeEmail}
              required
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
          <button type="submit" disabled={!formValid} className={`form__submit-button ${formValid ? "" : "form__submit-button_disabled"}`}>Войти</button>
          <span className="form__subtitle">Ещё не зарегистрированы?<Link to="/signup" className="form__link">Регистрация</Link></span>
        </div>
      </div>
    </form>
  )
}

export default Login