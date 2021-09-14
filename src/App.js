import React, { useState, useEffect, useRef } from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import { seriesData } from './seriesData';
import InfoWindowEx from './Components/InfoWindowEx';
import FullInfoWindow from './Components/FullInfoWindow';
import './App.css';

const mapStyles = {
  width: '100%',
  height: '100%'
};

const MapContainer = (props) => {
  const [showingInfoWindow, setShowingInfoWindow] = useState(false); // Hides or shows the InfoWindow
  const [activeMarker, setActiveMarker] = useState({}); // Shows the active marker upon click
  const [selectedPlace, setSelectedPlace] = useState({}); // Shows the InfoWindow to the selected place upon a marker
  const [activeData, setActiveData] = useState({}); //Saves all date to the selected place upon a marker
  const [showFullInfoWindow, setShowFullInfoWindow] = useState(false); //Hides or shows Full date

  const ref = useRef();

  useEffect(() => {

    const checkIfClickedOutside = e => {
      if (showFullInfoWindow && ref.current && !ref.current.contains(e.target)) {
        setShowFullInfoWindow(false);
      }
    }
    
    document.addEventListener("mousedown", checkIfClickedOutside)

    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", checkIfClickedOutside);
    }
  }, [showFullInfoWindow])

  const onMarkerClick = (props, marker, e) => {
    setSelectedPlace(props);
    setActiveMarker(marker);
    setShowingInfoWindow(true);
    setShowFullInfoWindow(false);
    setActiveData(seriesData[marker.id]);
    var infoWindow = document.getElementById("openFullInfoWindow");
    if (infoWindow) {
      document.getElementById("openFullInfoWindow").onclick=onInfoWindow;
    }
  }

  const onClose = (props) => {
    if (showingInfoWindow) {
      setShowingInfoWindow(false);
      setActiveMarker({});
      setActiveData({});
    };
  }

  const onInfoWindow = () => {
    setShowFullInfoWindow(true);
    setShowingInfoWindow(false);
  }

  const onCloseFullWindow = () => {
    if (showFullInfoWindow) {
      setShowFullInfoWindow(false);
      setActiveMarker({});
      setActiveData({});
    };
  }


  return (
    <Map
        google={props.google}
        zoom={5}
        style={mapStyles}
        initialCenter={
          {
            lat: 40.416775, 
            lng: -3.703790
          }
        }
      >
        {seriesData.map((marker, index) => (
        <Marker
          key={index}
          id={index}
          position={marker.placeCenter}
          onClick={onMarkerClick}
          name={marker.name}
        />
          ))}

        <InfoWindowEx
          marker={activeMarker}
          visible={showingInfoWindow}
          onClose={onClose}
          className="info-window-holder"
          >
          <div className="info-window">
            <h4>{selectedPlace.name}</h4>
            <img src={activeData.imgLink} alt="imagen del capitulo"/>
            <button type="button" id="openFullInfoWindow" onClick={onInfoWindow}>Ver Mas</button>
          </div>
        </InfoWindowEx>
        { showFullInfoWindow ? 
        <FullInfoWindow
          data={activeData}
          onCloseFullWindow={onCloseFullWindow}
          innerRef={ref}
        /> 
        : null}
      </Map>
  )
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyAHkqN4H0q6zSWvVQOW1lHgHUYTrzWBndc"
  // apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
})(MapContainer);