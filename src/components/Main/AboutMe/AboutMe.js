import React from 'react';
import './AboutMe.css';
import avatar from '../../../img/profile_avatar.png';


function AboutMe() {
  return (
    <div className="aboutme" id="aboutme">
      <div className="info__border">
        <h2 className="info__title">Студент</h2>
      </div>
      <div className="aboutme__profile">
        <div className="aboutme__discription">
          <h3 className="aboutme__name">Виталий</h3>
          <p className="aboutme__job">Фронтенд-разработчик, 30 лет</p>
          <p className="aboutme__text">Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена
            и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. С&nbsp;2015 года работал
            в компании «СКБ Контур». После того, как прошёл курс по веб-&nbsp;разработке, начал заниматься
            фриланс-&nbsp;заказами и ушёл с постоянной работы.</p>
          <a className="aboutme__link" href="https://github.com/MariaGrom" target="_blank">Github</a>
        </div>
        <img className="aboutme__avatar" src={avatar} alt="Аватар" />
      </div>
    </div>
  )
}

export default AboutMe