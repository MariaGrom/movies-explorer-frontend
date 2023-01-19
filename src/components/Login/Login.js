import React from 'react';
import './Login.css';
import PageForm from '../PageForm/PageForm';

function Login() {
  return (
    <PageForm
      title="Рады видеть!"
      buttonText="Войти"
      spanText="Ещё не зарегистрированы?"
      linkText="Регистрация"
      linkPath="/signup"
    />
  );
}

export default Login