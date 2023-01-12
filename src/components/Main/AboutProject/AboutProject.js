import React from 'react';
import './AboutProject.css'

function AboutProject() {
  return (
    <div className="info">
      <div className="info__border">
        <h2 className="info__title">О проекте</h2>
      </div>
      <div className="info__container">
        <div className="info__discription">
          <p className="info__subtitle">Дипломный проект включал 5 этапов</p>
          <p className="info__text">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
        </div>
        <div className="info__discription">
          <p className="info__subtitle">На выполнение диплома ушло 5 недель</p>
          <p className="info__text">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
        </div>
      </div>

      <div className="info__timecode">
        <div className="info__timecode_backend">
          <p className="info__timecode-title info__backend_title">1 неделя</p>
          <p className="info__timecode-text">Back-end</p>
        </div>
        <div className="info__timecode_frontend">
          <p className="info__timecode-title info__frontend_title">4 недели</p>
          <p className="info__timecode-text">Front-end</p>
        </div>
      </div>
    </div>
  );
}

export default AboutProject