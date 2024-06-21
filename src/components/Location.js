import React, { useState, useEffect } from "react";
import axios from "axios";

const LocationComponent = () => {
  const [location, setLocation] = useState({ latitude: null, longitude: null });
  const [address, setAddress] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setLocation({ latitude, longitude });
            getAddress(latitude, longitude);
          },
          (error) => {
            setError(error.message);
          }
        );
      } else {
        setError("Geolocation is not supported by this browser.");
      }
    };

    const getAddress = async (latitude, longitude) => {
      const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
      const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`;
      try {
        const response = await axios.get(url);
        //console.log(response.data);
        const results = response.data.results;
        if (results.length > 4) {
          const formattedAddress = results[3].formatted_address;
          setAddress(formattedAddress);
        } else {
          setError("No results found for the given coordinates.");
        }
      } catch (error) {
        setError("Error retrieving address.");
        console.error(error); // Log the error for debugging
      }
    };

    getLocation();
  }, []);

  return (
    <div>
      {error && <p>Error: {error}</p>}
      {location.latitude && location.longitude && (
        <p>
          Latitude: {location.latitude}, Longitude: {location.longitude}
        </p>
      )}
      {address ? <p>Address: {address}</p> : <p>Loading...</p>}
    </div>
  );
};

export default LocationComponent;
