import React, {useState} from 'react';
import './Login.css';
import PageForm from '../PageForm/PageForm';
import logo from '../../img/logo-min.png';
import { Link } from 'react-router-dom';

function Login({onLogin}) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleChangeEmail(e) {
    setEmail(e.target.value);
  }

  function handleChangePassword(e) {
    setPassword(e.target.value);
  }

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
              // value={email}
              onChange={handleChangeEmail}
            />
            <span className="input__error input__error-email">Ошибка почты</span>
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
            <span className="input__error input__error-password">Ошибка пароля</span>
          </label>
        </fieldset>
        <div className="form__submit">
          <button type="submit" className="form__submit-button">Войти</button>
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