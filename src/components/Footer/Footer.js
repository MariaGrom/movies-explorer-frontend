import React from 'react';
import './Footer.css';

function Footer(){

  return(
<div className="footer">
  <p className="footer__text">Учебный проект Яндекс.Практикум х BeatFilm.</p>
  <div className="footer__border"></div>
  <div className="footer__navigation">
    <p className="footer__copyright">&copy; 2023</p>
    <div className="footer__links">
      <a href="https://practicum.yandex.ru" className="footer__link" target="_blank">Яндекс.Практикум</a>
      <a href="https://github.com/MariaGrom" className="footer__link" target="_blank">Github</a>
    </div>
  </div>
</div>
  );
}

export default Footer