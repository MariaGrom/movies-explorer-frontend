import React from 'react';
import './InfoTooltip.css';
import {Link} from 'react-router-dom';

function InfoTooltip(){
  return(
    <div className="infotooltip">
    <h2 className="infotooltip__title">404</h2>
    <p className="infotooltip__subtitle">Страница не найдена</p>
    <Link to="/" className="infotooltip__link">Назад</Link>
    </div>
  )
}

export default InfoTooltip