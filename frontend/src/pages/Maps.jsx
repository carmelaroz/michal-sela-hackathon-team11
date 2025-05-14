
// src/Maps.jsx
import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import axios from 'axios';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './SafeMap.css';

// תיקון האייקונים ב-Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const Maps = () => {
    const [safePlaces, setSafePlaces] = useState([]);
    const centerPosition = [32.0853, 34.7818]; // תל אביב

    // הבאת הנתונים מה-API
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/safe-places');
                setSafePlaces(response.data);
            } catch (error) {
                console.error("Error fetching safe places:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <MapContainer center={centerPosition} zoom={12} style={{ height: '500px', width: '100%' }}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {safePlaces.map((place) => (
                <Marker key={place.id} position={[place.latitude, place.longitude]}>
                    <Popup>
                        <b>{place.name}</b><br />
                        {place.description}<br />
                        {place.address}
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    );
};

export default Maps;
