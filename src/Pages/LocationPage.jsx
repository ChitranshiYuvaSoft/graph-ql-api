import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { citiesData, countryData, statesData } from "../Redux/location/locationSlice";
import { Link } from "react-router-dom";

const LocationPage = () => {
  const dispatch = useDispatch();
  const { countries, allStates, cities } = useSelector((state) => state.location);

  const [countryId, setCountryId] = useState("");
  const [stateId, setStatesId] = useState("");

  const getCountryId = (id) => {
    setCountryId(id);
    dispatch(statesData({ statesId: countryId }));
  };

  const getStatesId = (id) => {
    setStatesId(id);
    dispatch(citiesData({ citiesId: stateId }));
  };

  const showCountryData = () => {
    dispatch(countryData());
  };

  return (
    <div className="location-container">
      <header className="location-header">
        <h2 className="title">Location Data</h2>
        <Link to="/home" className="home-link">
          Home
        </Link>
      </header>

      <div className="location-card">
        <div className="location-section">
          <div className="section-header">
            <button onClick={showCountryData} className="section-button">Countries</button>
          </div>
          <ul className="list">
            {countries.map((item, index) => (
              <li key={index} className="list-item" onClick={() => getCountryId(item.id)}>
                {item.name}
              </li>
            ))}
          </ul>
        </div>

        <div className="location-section">
          <div className="section-header">States</div>
          {allStates && allStates.length > 0 ? (
            <ul className="list">
              {allStates.map((item, index) => (
                <li key={index} className="list-item" onClick={() => getStatesId(item.id)}>
                  {item.name}
                </li>
              ))}
            </ul>
          ) : (
            <h2 className="placeholder-text">Select Country</h2>
          )}
        </div>

        <div className="location-section">
          <div className="section-header">Cities</div>
          {cities && cities.length > 0 ? (
            <ul className="list">
              {cities.map((item, index) => (
                <li key={index} className="list-item">
                  {item.name}
                </li>
              ))}
            </ul>
          ) : (
            <h2 className="placeholder-text">Select State</h2>
          )}
        </div>
      </div>
    </div>
  );
};

export default LocationPage;
