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

const MapsPage = () => {
  const mapRef = useRef(null);
  const routingRef = useRef(null);
  const userMarkerRef = useRef(null);
  const [userLocation, setUserLocation] = useState(null);

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

  useEffect(() => {
    if (mapRef.current) return;

    const map = L.map('map').setView([32.0853, 34.7818], 13);
    mapRef.current = map;

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(map);

    const geocodeAddress = async (address) => {
      try {
        const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`);
        const data = await res.json();
        if (data.length > 0) {
          const lat = parseFloat(data[0].lat);
          const lng = parseFloat(data[0].lon);
          return [lat, lng];
        }
      } catch (err) {
        console.error("שגיאה בגיאוקוד:", address, err);
      }
      return null;
    };

    const fetchAddresses = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/safeplaces');
        const data = await res.json();
        for (const place of data) {
          if (place.address) {
            const coords = await geocodeAddress(place.address);
            if (coords) {
              const marker = L.marker(coords, { icon: blueIcon }).addTo(map);
              marker.bindPopup(place.address);

              marker.on('click', () => {
                marker.openPopup();

                if (userLocation) {
                  if (routingRef.current) {
                    map.removeControl(routingRef.current);
                  }
                  routingRef.current = L.Routing.control({
                    waypoints: [
                      L.latLng(userLocation[0], userLocation[1]),
                      L.latLng(coords[0], coords[1])
                    ],
                    routeWhileDragging: false,
                    show: false
                  }).addTo(map);
                } else {
                  alert("המיקום הנוכחי שלך עדיין לא נטען");
                }
              });
            }
          }
        }
      } catch (err) {
        console.error("שגיאה בטעינת כתובות:", err);
      }
    };

    fetchAddresses();

    if (navigator.geolocation) {
      navigator.geolocation.watchPosition((position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        setUserLocation([lat, lng]);

        if (!userMarkerRef.current) {
          const marker = L.marker([lat, lng], { icon: redIcon }).addTo(map);
          marker.bindPopup("המיקום שלי").openPopup();
          userMarkerRef.current = marker;
        } else {
          userMarkerRef.current.setLatLng([lat, lng]);
        }

        map.setView([lat, lng], 14);

      }, (err) => {
        alert("לא ניתן לקבל את המיקום שלך");
      }, {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      });
    }

  }, []);

  return (
    <div style={{ position: 'relative', height: '100vh', width: '100%' }}>
      {!userLocation && (
        <div style={{
          position: 'absolute',
          top: 10,
          left: 10,
          zIndex: 1000,
          background: 'white',
          padding: '6px 12px',
          borderRadius: '5px',
          boxShadow: '0 0 5px rgba(0,0,0,0.3)'
        }}>
          טוען מיקום נוכחי...
        </div>
      )}
      <div id="map" style={{ height: '100%', width: '100%' }}></div>
    </div>
  );
};

export default MapsPage;
