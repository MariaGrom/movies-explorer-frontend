import React from "react";
import './PageForm.css';
import logo from '../../img/logo.svg';
import { Link } from 'react-router-dom';

function PageForm(props) {
  const { children, title, buttonText, spanText, linkText } = props

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [emailDirty, setEmailDirty] = React.useState(false);
  const [passwordDirty, setPasswordDirty] = React.useState(false);
  const [emailError, setEmailError] = React.useState('E-mail не может быть пустым');
  const [passwordError, setPasswordlError] = React.useState('Пароль не может быть пустым');

  // Проверки поля email
  const emailHandler = (e) => {
    setEmail(e.target.value)
    const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (!re.test(String(e.target.value).toLocaleLowerCase())) {
      setEmailError('Некорректный email')
    } else {
      setEmailError("")
    }
  }

  // Проверка поля пароль
  const passwordHandler = (e) => {
    setPassword(e.target.value);
    if (e.target.value.length < 3 || e.target.value.length > 8) {
      setPasswordlError('Пароль должен быть длинее 3 и меньше 8')
      if (!e.target.value) {
        setPasswordlError('Пароль не может быть пустым')
      }
    } else {
      setPasswordlError('')
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

  return (
    <form className="form">
      <div className="form__greetings" >
        <img className="form__logo" src={logo} alt="логотип" />
        <h2 className="form__title">{title}</h2>
      </div>
      <div className="form__main">
        <fieldset className="form__fields">
          {children}
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
              onChange={e => emailHandler(e)}
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
              onChange={e => passwordHandler(e)}
            />
            {(passwordDirty && passwordError) && <span className="input__error input__error-password">{passwordError}</span>}
          </label>
        </fieldset>
        <div className="form__submit">
          <button type="submit" className="form__submit-button">{buttonText}</button>
          <span className="form__subtitle">{spanText}<Link to="/signin" className="form__link">{linkText}</Link></span>
        </div>
      </div>
    </form>
  )
}

export default PageForm