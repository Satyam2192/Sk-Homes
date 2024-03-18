import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';

const GeolocationPage = () => {
  const [country, setCountry] = useState('');
  const [state, setState] = useState('');
  const [address, setAddress] = useState('');
  const [coordinates, setCoordinates] = useState([25,78]);
  const [mapKey, setMapKey] = useState(0);
  const [zoomLevel, setZoomLevel] = useState(3); 

  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      try {
        const response = await axios.get('https://api.opencagedata.com/geocode/v1/json', {
          params: {
            key: 'bedcd1f180544332a2d025b5be6eedb5',
            q: `${address}, ${state}, ${country}`,
          },
        });

        const { lat, lng } = response.data.results[0].geometry;
        setCoordinates([lat, lng]);
        setMapKey((prevKey) => prevKey + 1);

        if (address) {
          setZoomLevel(15); // for specific addresses
        } else if (state) {
          setZoomLevel(10); // for states
        } else if (country) {
          setZoomLevel(5); // for countries
        }
      } catch (error) {
        console.error('Error fetching coordinates:', error);
      }
    }, 1000);

    return () => clearTimeout(delayDebounceFn);
  }, [country, state, address]);

  return (
    <div className="container mx-auto mt-[60px] p-4">
      <h1 className="text-3xl font-bold mb-4">Geolocation Page</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        <div>
          <label htmlFor="country" className="text-md font-medium">
            Country
          </label>
          <input
            type="text"
            id="country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="w-full p-2 mt-1 border rounded"
          />
        </div>

        <div>
          <label htmlFor="state" className="text-md font-medium">
            State
          </label>
          <input
            type="text"
            id="state"
            value={state}
            onChange={(e) => setState(e.target.value)}
            className="w-full p-2 mt-1 border rounded"
          />
        </div>
      </div>

      <div className="mt-2">
        <label htmlFor="address" className="text-md font-medium">
          Address
        </label>
        <input
          type="text"
          id="address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="w-full p-2 mt-1 border rounded"
        />
      </div>

      <div className="mt-5 z-0">
        <MapContainer key={mapKey} center={coordinates} zoom={zoomLevel} style={{ height: '340px', width: '100%', zIndex:1, position:'relative' }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={coordinates}>
            <Popup>{`${address}, ${state}, ${country}`}</Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
};

export default GeolocationPage;
