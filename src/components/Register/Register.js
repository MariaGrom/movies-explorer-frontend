import React, { useState } from 'react';
import './Register.css';
// import PageForm from '../PageForm/PageForm';
import logo from '../../img/logo-min.png';
import { Link } from 'react-router-dom';

function Register({ onRegister }) {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = React.useState('');
  const [passwordError, setPasswordlError] = React.useState('');

 const handleChangeName =(e) => {
    setName(e.target.value);
    if (e.target.value.length < 3 || e.target.value.length > 30) {
      setNameError('Имя пользователя должно быть длинее 2 и меньше 30')
    if (!e.target.value) {
      setNameError('Поле не может быть пустым')
    }
    } else {
      setNameError('')
    }
  }

  function handleChangeEmail(e) {
    setEmail(e.target.value);
    const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (!re.test(String(e.target.value).toLocaleLowerCase())) {
      setEmailError('Некорректный email')
    } else {
      setEmailError('')
    }
  }

  function handleChangePassword(e) {
    setPassword(e.target.value);
    if (!e.target.value) {
      setPasswordlError('Поле не может быть пустым')
    } else {
      setPasswordlError('')
    }
  }

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
              className="form__input  form__input_error"
              type="text"
              name="name"
              required=""
              // value={name}
              onChange={handleChangeName}
            />
            {nameError && <span className="input__error input__error-name">{nameError}</span>}
          </label>
          <label className="form__field">
            <p className="form__text">E-mail</p>
            <input
              id="input__email"
              className="form__input"
              type="text"
              name="email"
              required=""
              // value={email}
              onChange={handleChangeEmail}
            />
            {emailError && <span className="input__error input__error-email">{emailError}</span>}
          </label>
          <label className="form__field">
            <p className="form__text">Пароль</p>
            <input
              id="input__password"
              className="form__input"
              type="password"
              name="password"
              // value={password}
              onChange={handleChangePassword}
            />
            {passwordError && <span className="input__error input__error-password">{passwordError}</span>}
          </label>
        </fieldset>
        <div className="form__submit">
          <button type="submit" className="form__submit-button">Зарегистрироваться</button>
          <span className="form__subtitle">Уже зарегистрированы?<Link to="/signin" className="form__link">Войти</Link></span>
        </div>
      </div>
    </form>

  );
}

export default Register



    // <PageForm
    //   title="Добро пожаловать!"
    //   buttonText="Зарегистрироваться"
    //   spanText="Уже зарегистрированы?"
    //   linkText="Войти"
    //   linkPath="/signin"
    //   onSubmit={props.onRegister}
    //   children={
    //     <label className="form__field">
    //     <p className="form__text">Имя</p>
    //     <input id="input__name" className="form__input  form__input_error" />
    //     <span className="input__error input__error-name">Текст ошибки</span>
    //   </label>
    //   }
    // />