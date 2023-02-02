import React from 'react';
import './NotFound.css';
import { useNavigate } from 'react-router-dom';

function NotFound() {

  // Функция навигации кнопки "Назад"
  const navigate = useNavigate();
  const goBack = () => navigate(-1);

  return (
    <div className="notfound">
      <h2 className="notfound__title">404</h2>
      <p className="notfound__subtitle">Страница не найдена</p>
      <button type="button" onClick={goBack} className="notfound__button">Назад</button>
    </div>
  )
}

export default NotFound