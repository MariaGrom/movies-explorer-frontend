import React from 'react';
import link from '../../../img/link-min.png';
import './Portfolio.css';

function Portfolio(){
return(
  <div className="portfolio">
  <h4 className="portfolio__title">Портфолио</h4>
  <div className="portfolio__links">
    <a href="https://mariagrom.github.io/how-to-learn/" className="portfolio__subtitle" target="_blank">Статичный сайт</a>
    <a href="https://mariagrom.github.io/how-to-learn/" target="_blank"><img className="portfolio__link" src={link} alt="Ссылка" /></a>
  </div>
  <div className="portfolio__links">
    <a href="https://mariagrom.github.io/russian-travel/" className="portfolio__subtitle" target="_blank">Адаптивный сайт</a>
    <a href="https://mariagrom.github.io/russian-travel/" target="_blank"><img className="portfolio__link" src={link} alt="Ссылка" /></a>
  </div>
  <div className="portfolio__links">
    <a href="https://mariagrom.github.io/mesto/" className="portfolio__subtitle" target="_blank">Одностраничное приложение</a>
    <a href="https://mariagrom.github.io/mesto/" target="_blank"><img className="portfolio__link" src={link} alt="Ссылка" /></a>
  </div>
</div>
)
}

export default Portfolio