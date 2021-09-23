import React, { useState, useEffect } from "react";
import axios from 'axios';
import './FullInfoWindow.css';

export default function FullInfoWindow(props) {
    const [results, setResults] = useState([]);
    console.log(results[0]);

    useEffect(() => {
        const search = async () => {
          const { data } = await axios.get('https://es.wikipedia.org/w/api.php', 
          { params: {
           action: 'query',
           list: 'search',
           origin: '*',
           format: 'json',
           srsearch: props.data.placeName
           },
          });
          if (data.query.search) {

            setResults(() => {
                return (
                    <div className="item" key={data.query.search[0].pageid}>
                
                  <div className="content">
                      <h3 className="header">
                          { data.query.search[0].title }
                      </h3>
                      <span className="wiki-text" dangerouslySetInnerHTML={{ __html: data.query.search[0].snippet }}></span>
                  </div><br></br>
                  <div className="right floated content">
                    <a className="link" target="_blank" rel="noreferrer" href={`https://es.wikipedia.org?curid=${data.query.search[0].pageid}`}>Leer mas en Wikipedia</a>
                </div>
        
                </div>
                )
            });
          }
          };
          const timeoutId = setTimeout(() => {
              if (props.data) {
              search();
           }
          }, 800);
       
          return () => {
              clearTimeout(timeoutId);
          };
        }, [props.data]);



  return (
  <div className="full-info-window" ref={props.innerRef}>
      <button type="button" className="closeFullInfoWindow" onClick={props.onCloseFullWindow}></button>
      <div className="full-info-image">
          <a className="full-info-link" href={props.data.videoLink} target="_blank" rel="noreferrer">Ver video</a>
          <img alt="imagen del capitulo" className="full-info-photo" src={props.data.imgLink} />
      </div>
      <div className="full-info-left-column">
          <h2>{props.data.name}</h2>
          <h3>Region: {props.data.placeRegion}</h3>
          <h3>Temporada: {props.data.temporada} Seria: {props.data.series}</h3>
          <p>{props.data.shortDescription}</p>
      </div>
      <div className="full-info-right-column">
          { results ? results : null }
      </div>
  </div>
  );
}