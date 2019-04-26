import React from 'react';
import ReactDOM from 'react-dom';
import Cards from '../jsx/cards';
import NavBar from '../jsx/navbar';
// import SolarSystemModel from '../jsx/solarSystemModel';

it('cards render', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Cards />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('navbar renders', () => {
  const nav = document.createElement('nav');
  ReactDOM.render(<NavBar />, nav);
  ReactDOM.unmountComponentAtNode(nav);
});

// it('solar system model renders', () => {
//   const model = document.createElement('model');
//   ReactDOM.render(<SolarSystemModel />, model);
//   ReactDOM.unmountComponentAtNode(model);
// });