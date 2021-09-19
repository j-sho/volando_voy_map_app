import React from "react";
import './AboutHolder.css';

export default function AboutHolder(props) {

  return (
  <div className="about-holder">
      <button type="button" className="closeFullInfoWindow" onClick={props.onCloseAbout}></button>
      <div className="about-text">
        <h2>Volando voy</h2>
        <p>Programa volando voy</p>
      </div>
  </div>
  );
}