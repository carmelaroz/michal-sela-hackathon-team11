// import React, { useEffect, useRef } from 'react';
// import 'leaflet/dist/leaflet.css';
// import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
// import L from 'leaflet';
// import 'leaflet-routing-machine';
// import './MapsPage.css'; 

// const MapsPage = () => {
//   const mapRef = useRef(null);
//   const routingRef = useRef(null);
//   const userMarkerRef = useRef(null);

//   useEffect(() => {
//     // אם כבר נוצרה מפה, לא ניצור שוב
//     if (mapRef.current) return;

//     const map = L.map('map').setView([32.0853, 34.7818], 13);
//     mapRef.current = map;

//     // שכבת טילים
//     L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//       attribution: '&copy; OpenStreetMap contributors',
//     }).addTo(map);

//     // כתובות פיקטיביות
//     const addresses = [
//       "מצדה 60, גן יבנה",
//       "מרבד הקסמים 12, חולון",
//     ];

//     const geocodeAddress = async (address) => {
//       const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`);
//       const data = await res.json();
//       if (data.length > 0) {
//         const lat = parseFloat(data[0].lat);
//         const lng = parseFloat(data[0].lon);
//         L.marker([lat, lng]).addTo(map).bindPopup(address).openPopup();
//       }
//     };

//     addresses.forEach(geocodeAddress);

//     // מיקום המשתמש
//     if (navigator.geolocation) {
//       navigator.geolocation.watchPosition((position) => {
//         const lat = position.coords.latitude;
//         const lng = position.coords.longitude;

//         if (!userMarkerRef.current) {
//           const marker = L.marker([lat, lng], {
//             icon: L.icon({
//               iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
//               iconSize: [25, 41],
//               iconAnchor: [12, 41],
//               popupAnchor: [1, -34],
//               shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
//               shadowSize: [41, 41],
//             })
//           }).addTo(map);
//           userMarkerRef.current = marker;
//         } else {
//           userMarkerRef.current.setLatLng([lat, lng]);
//         }

//         map.setView([lat, lng], 14);

//         // ניתוב
//         if (!routingRef.current) {
//           routingRef.current = L.Routing.control({
//             waypoints: [
//               L.latLng(lat, lng),
//               L.latLng(32.079, 34.78),
//             ],
//             routeWhileDragging: true,
//           }).addTo(map);
//         } else {
//           routingRef.current.setWaypoints([
//             L.latLng(lat, lng),
//             L.latLng(32.079, 34.78),
//           ]);
//         }

//       }, (err) => {
//         alert("לא ניתן לקבל את המיקום שלך");
//       }, {
//         enableHighAccuracy: true,
//         timeout: 5000,
//         maximumAge: 0
//       });
//     }

//   }, []);

//   return <div id="map"></div>;
// };

// export default MapsPage;






import React, { useEffect, useRef, useState } from 'react';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import L from 'leaflet';
import 'leaflet-routing-machine';
import './MapsPage.css';
import axios from 'axios';

const MapsPage = () => {
  const mapRef = useRef(null);
  const routingRef = useRef(null);
  const userMarkerRef = useRef(null);
  const [userLocation, setUserLocation] = useState(null);
  const [safePlaces, setSafePlaces] = useState([]);

  const redIcon = L.icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    shadowSize: [41, 41],
  });

  const blueIcon = L.icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    shadowSize: [41, 41],
  });

  // פונקציה להמיר כתובת לקואורדינטות
  const getCoordsFromAddress = async (address) => {
    try {
      const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`);
      const data = await res.json();
      if (data && data[0]) {
        return { lat: parseFloat(data[0].lat), lon: parseFloat(data[0].lon) }; // מחזיר את הקואורדינטות
      }
    } catch (err) {
      console.error("שגיאה בהפיכת כתובת לקואורדינטות:", err);
      return null;
    }
  };

  // שימוש ב-axios כדי להוריד את המקומות מהדאטה-בייס
  const fetchSafePlaces = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/safeplaces');
      setSafePlaces(response.data); // מחזיר את הנתונים שהתקבלו מה־API
    } catch (err) {
      console.error('Error fetching safe places:', err);
    }
  };

  useEffect(() => {
    if (mapRef.current) return;

    const map = L.map('map').setView([32.0853, 34.7818], 13); // מיקום ברירת מחדל של המפה
    mapRef.current = map;

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(map);

    // טוענים את המקומות מהדאטה-בייס
    fetchSafePlaces();

    // פוקנציה לצפות במיקום המשתמש
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(async (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        setUserLocation([lat, lng]);

        if (!userMarkerRef.current) {
          const marker = L.marker([lat, lng], { icon: redIcon }).addTo(map);
          marker.bindPopup(`המיקום שלי`).openPopup();
          userMarkerRef.current = marker;
        } else {
          userMarkerRef.current.setLatLng([lat, lng]);
        }

        map.setView([lat, lng], 14); // מיקום המפה משתנה בהתאם למיקום המשתמש
      }, (err) => {
        alert("לא ניתן לקבל את המיקום שלך");
      }, {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      });
    }

    // שמירת marker של מקום בטוח ולחיצה עליהם לנבוט למיקום
    safePlaces.forEach((place) => {
      if (place.address) { // לוודא שהמקום מכיל כתובת
        getCoordsFromAddress(place.address).then((coords) => {
          if (coords) {
            const { lat, lon } = coords;
            const marker = L.marker([lat, lon], { icon: blueIcon }).addTo(map);
            marker.bindPopup(place.address);

            marker.on('click', () => {
              if (userLocation) {
                if (routingRef.current) {
                  map.removeControl(routingRef.current);
                }
                routingRef.current = L.Routing.control({
                  waypoints: [
                    L.latLng(userLocation[0], userLocation[1]),
                    L.latLng(lat, lon)
                  ],
                  routeWhileDragging: false,
                  show: false
                }).addTo(map);
              } else {
                alert("המיקום הנוכחי שלך עדיין לא נטען");
              }
            });
          }
        });
      }
    });

  }, [safePlaces]); // זה יקרה כל פעם שהסייפפלייסים יתעדכנו

  return <div id="map" style={{ height: '100vh', width: '100%' }}></div>;
};

export default MapsPage;
