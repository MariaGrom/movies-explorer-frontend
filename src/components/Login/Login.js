import React, { useState, useEffect } from 'react';
import './Login.css';
import PageForm from '../PageForm/PageForm';
import logo from '../../img/logo-min.png';
import { Link } from 'react-router-dom';

function Login({ onLogin }) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Переменные состояния пустых полей
  const [emailDirty, setEmailDirty] = useState(false);
  const [passwordDirty, setPasswordDirty] = useState(false);

  // Переменные состояния ошибок при заполнении полей
  const [emailError, setEmailError] = useState('Поле не может быть пустым');
  const [passwordError, setPasswordlError] = useState('Поле не может быть пустым');

  // Переменная состония валидности формы
  const [formValid, setFormValid] = useState(false);


  // Функция изменения имени пользователя и проверка формы
  function handleChangeEmail(e) {
    setEmail(e.target.value);
    const re = /^([\w]+@([\w-]+\.)+[\w-]{2,4})?$/;
    if (!re.test(String(e.target.value).toLocaleLowerCase())) {
      setEmailError('Некорректный email');
    } else if (e.target.value.length === 0) {
      setEmailError('Поле не может быть пустым');
    } else {
      setEmailError('');
    }
  }

  // Функция изменения пароля пользователя и проверка формы
  function handleChangePassword(e) {
    setPassword(e.target.value);
    if (!e.target.value) {
      setPasswordlError('Поле не может быть пустым');
    } else {
      setPasswordlError('');
    }
  }

  // Функция не допускающая пустых полей в форме
  const blurHandler = (e) => {
    switch (e.target.name) {
      case 'email':
        setEmailDirty(true)
        break
      case 'password':
        setPasswordDirty(true)
        break
    }
  }

  // Отслеживание состояния валидности формы
  useEffect(() => {
    if (emailError || passwordError) {
      setFormValid(false)
    } else {
      setFormValid(true)
    }
  }, [emailError, passwordError])


  // Функция сохранения формы
  function handleSubmit(e) {
    e.preventDefault()
    onLogin({ email, password })
  }


  return (
    <form onSubmit={handleSubmit} className="form">
      <div className="form__greetings" >
        <Link to="/"><img className="form__logo" src={logo} alt="логотип" /></Link>
        <h2 className="form__title">Рады видеть!</h2>
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
              required=""
              onBlur={e => blurHandler(e)}
              value={email}
              onChange={handleChangeEmail}
            />
            {(emailDirty && emailError) && <span className="input__error input__error-email">{emailError}</span>}
          </label>
          <label className="form__field">
            <p className="form__text">Пароль</p>
            <input
              id="input__password"
              className="form__input"
              type="password"
              name="password"
              onBlur={e => blurHandler(e)}
              value={password}
              onChange={handleChangePassword}
            />
            {(passwordDirty && passwordError) && <span className="input__error input__error-password">{passwordError}</span>}
          </label>
        </fieldset>
        <div className="form__submit">
          <button type="submit" disabled={!formValid} className={`form__submit-button ${formValid ? "" : "form__submit-button_disabled"}`}>Войти</button>
          <span className="form__subtitle">Ещё не зарегистрированы?<Link to="/signup" className="form__link">Регистрация</Link></span>
        </div>
      </div>
    </form>
  );
}

export default Login

{/* <PageForm
title="Рады видеть!"
buttonText="Войти"
spanText="Ещё не зарегистрированы?"
linkText="Регистрация"
linkPath="/signup"
onSubmit={props.onLogin}
/> */}