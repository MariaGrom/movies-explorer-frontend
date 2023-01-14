import React from 'react';
import './Register.css';
import PageForm from '../PageForm/PageForm';

function Register() {
  return (
    <PageForm
      title="Добро пожаловать!"
      buttonText="Зарегистрироваться"
      spanText="Уже зарегистрированы?"
      linkText="Войти"
      children={
        <label className="form__field">
        <p className="form__text">Имя</p>
        <input id="input__name" className="form__input" />
        <span className="input__error input__error-name">Текст ошибки</span>
      </label>
      }
    />
  );
}

export default Register