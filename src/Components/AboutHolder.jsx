import React from "react";
import './AboutHolder.css';

export default function AboutHolder(props) {

  return (
  <div className="about-holder">
      <button type="button" className="closeFullInfoWindow" onClick={props.onCloseAbout}></button>
      <div className="about-text">
        <h2>Volando voy</h2>
        <p>Volando voy es un programa de televisión de España que se estrenó el 19 de julio de 2015 y es presentado por Jesús Calleja. 
            La programa tiene 6 temporads y 42 episodios en total. 
            Volando voy, es un formado de aventuras de Jesús Calleja que junto a ciudadanos españoles recorrerá toda la geografía española desde un helicóptero.
            La mapa presente todos lo citios de esa programa. Puedes conocer mejor citios espectaculares de España, viendo desde helicoptero los paisajes, y conozer gente de zona.</p>
      </div>
  </div>
  );
}