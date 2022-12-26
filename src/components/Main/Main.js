import React from 'react';
import './Main.css';
// import { Route, Routes } from 'react-router-dom';
import Promo from './Promo/Promo';
import NavTab from './NavTab/NavTab';
import AboutProject from './AboutProject/AboutProject';
import Techs from './Techs/Techs';
import AboutMe from './AboutMe/AboutMe';
import Portfolio from './Portfolio/Portfolio';

function Main(){
  return(
<div className="Main">
<Promo />
<NavTab />
<AboutProject />
<Techs />
<AboutMe />
<Portfolio />

</div>
  );
}

export default Main