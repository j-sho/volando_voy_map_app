import React, { useState, useEffect, useRef } from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import googleMapStyles from './GoogleMapStyles';
import { seriesData } from './seriesData';
import InfoWindowEx from './Components/InfoWindowEx';
import FullInfoWindow from './Components/FullInfoWindow';
import Dropdown from './Components/DropdownSelection';
import AboutHolder from './Components/AboutHolder';
import './App.css';

const mapStyles = {
  width: '100%',
  height: '100%'
};

// const mapIdStyle = "3d1e60297734aef6";

const MapContainer = (props) => {
  const [showingInfoWindow, setShowingInfoWindow] = useState(false); // Hides or shows the InfoWindow
  const [activeMarker, setActiveMarker] = useState({}); // Shows the active marker upon click
  const [selectedPlace, setSelectedPlace] = useState({}); // Shows the InfoWindow to the selected place upon a marker
  const [activeData, setActiveData] = useState({}); //Saves all date to the selected place upon a marker
  const [showFullInfoWindow, setShowFullInfoWindow] = useState(false); //Hides or shows Full date
  const [filteredData, setFilteredData] = useState(seriesData); //Saves all filtered data
  const [centerRegion, setCenterRegion] = useState({
    lat: 37.26389554350538, 
    lng: -6.9450125131839995
    });
  const [zoom, setZoom] = useState(4.4);
  const [isClicked, setClicked] = useState(false);

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

  const onCloseAbout = () => {
    if (isClicked) {
      setClicked(false);
    };
  }

  const onChosedRegion = (region, center) => {
    if (region === 'Todos') {
      setFilteredData(seriesData);
      setCenterRegion(center);
      setZoom(4.4);
    } else {
      const items = seriesData.filter(item => item.placeRegion === region);
      setFilteredData(items);
      setCenterRegion(center);
      setZoom(6);
    }
  }


  return (
    <Map
        // mapId = {mapIdStyle}
        google={props.google}
        zoom={zoom}
        style={mapStyles}
        initialCenter={centerRegion}
        center={centerRegion}
      >
      <React.Fragment>
        <div className="menu-holder">
            <h1 className="about-header"><a className={isClicked ? 'clicked' : ''} onClick={() => setClicked(!isClicked)}>Acerca de</a></h1>
            <Dropdown
            searchRegion={onChosedRegion}
            ></Dropdown>
            { isClicked ? 
            <AboutHolder
            onCloseAbout={onCloseAbout}
            /> 
            : null}
            </div>
        </React.Fragment>
        {filteredData.map((marker, index) => (
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

GoogleApiWrapper.defaultProps = googleMapStyles;

export default GoogleApiWrapper({
  apiKey: "AIzaSyAHkqN4H0q6zSWvVQOW1lHgHUYTrzWBndc"
  // apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
})(MapContainer);