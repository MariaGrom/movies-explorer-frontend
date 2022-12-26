import React from 'react';
import './Footer.css'

function Footer(){
  return(
<div className="footer">
  <p className="footer__text">Учебный проект Яндекс.Практикум х BeatFilm.</p>
  <div className="footer__border"></div>
  <div className="footer__navigation">
    <p className="footer__copyright">&copy; 2022</p>
    <div className="footer__links">
      <a href="#" className="footer__link">Яндекс.Практикум</a>
      <a href="#" className="footer__link">Github</a>
    </div>
  </div>
</div>
  );
}

export default Footer