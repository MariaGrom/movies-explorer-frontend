import React from 'react';
import link from '../../../img/link.svg';
import './Portfolio.css';

function Portfolio(){
return(
  <div className="portfolio">
  <h4 className="portfolio__title">Портфолио</h4>
  <div className="portfolio__links">
    <a href="#" className="portfolio__subtitle">Статичный сайт</a>
    <img className="portfolio__link" src={link} alt="Ссылка" />
  </div>
  <div className="portfolio__links">
    <a href="#" className="portfolio__subtitle">Адаптивный сайт</a>
    <img className="portfolio__link" src={link} alt="Ссылка" />
  </div>
  <div className="portfolio__links">
    <a href="#" className="portfolio__subtitle">Одностраничное приложение</a>
    <img className="portfolio__link" src={link} alt="Ссылка" />
  </div>
</div>
)
}

export default Portfolio