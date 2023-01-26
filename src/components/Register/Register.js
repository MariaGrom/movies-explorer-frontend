import React, { useState, useEffect } from 'react';
import './Register.css';
// import PageForm from '../PageForm/PageForm';
import logo from '../../img/logo-min.png';
import { Link } from 'react-router-dom';

function Register({ onRegister }) {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Переменные состояния пустых полей
  const [nameDirty, setNameDirty] = useState(false);
  const [emailDirty, setEmailDirty] = useState(false);
  const [passwordDirty, setPasswordDirty] = useState(false);

  // Переменные состояния ошибок при заполнении полей
  const [nameError, setNameError] = useState('Поле не может быть пустым');
  const [emailError, setEmailError] = useState('Поле не может быть пустым');
  const [passwordError, setPasswordlError] = useState('Поле не может быть пустым');

  // Переменная состония валидности формы
  const [formValid, setFormValid] = useState(false);

  // Функция изменения имени пользователя и проверка формы
  const handleChangeName = (e) => {
    setName(e.target.value);
    const nameRegex = /^[а-яА-ЯёЁa-zA-Z -]+$/g
    if (e.target.value.length < 3 || e.target.value.length > 30) {
      setNameError('Имя пользователя должно быть длинее 2 и меньше 30');
    } else if (e.target.value.length === 0) {
      setNameError('Поле не может быть пустым');
    } else if(!nameRegex.test(String(e.target.value).toLocaleLowerCase())) {
      setNameError('Некорректное имя');
    } else {
      setNameError('');
    }
  }

  // Функция изменения почты пользователя и проверка формы
  function handleChangeEmail(e) {
    setEmail(e.target.value);
    const emailRegex = /^([\w]+@([\w-]+\.)+[\w-]{2,4})?$/;
    if (!emailRegex.test(String(e.target.value).toLocaleLowerCase())) {
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
      case 'name':
        setNameDirty(true)
        break
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
    if (nameError || emailError || passwordError) {
      setFormValid(false)
    } else {
      setFormValid(true)
    }
  }, [nameError, emailError, passwordError])

  // Функция сохранения формы
  function handleSubmit(e) {
    e.preventDefault()
    onRegister({ name, email, password })
  }

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
              required=""
              onBlur={e => blurHandler(e)}
              value={name}
              onChange={handleChangeName}
            />
            {(nameDirty && nameError) && <span className="input__error input__error-name">{nameError}</span>}
          </label>
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
          <button type="submit" disabled={!formValid} className={`form__submit-button ${formValid ? "" : "form__submit-button_disabled"}`}>Зарегистрироваться</button>
          <span className="form__subtitle">Уже зарегистрированы?<Link to="/signin" className="form__link">Войти</Link></span>
        </div>
      </div>
    </form>

  );
}

export default Register