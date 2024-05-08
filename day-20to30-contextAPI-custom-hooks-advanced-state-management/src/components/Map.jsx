/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./Map.module.css";
import btnstyle from "./Button.module.css";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvent,
  useMapEvents,
} from "react-leaflet";
import { useState, useEffect } from "react";
import { useCites } from "../context/Citiescontext";
import { useGeolocation } from "../context/useGeolocation";
import { useurlGps } from "../context/useurlGps";

function Map() {
  // const [params] = useSearchParams();
  const [mappostion, setmappostion] = useState([40, 0]);
  const { cities } = useCites();
  const {
    isLoading: currloading,
    position: currpostion,
    getPosition: currgetposition,
  } = useGeolocation();

  const { mlat, mlng } = useurlGps();
  // const mlat = params.get("lat");
  // const mlng = params.get("lng");

  useEffect(() => {
    if (mlat && mlng) return setmappostion([mlat, mlng]);
  }, [mlat, mlng]);

  useEffect(() => {
    if (currpostion) return setmappostion([currpostion.lat, currpostion.lng]);
  }, [currpostion]);
  return (
    //onClick={() => nav("form")}
    <div className={styles.mapContainer}>
      <button
        onClick={currgetposition}
        className={`${btnstyle.position} ${btnstyle.btn}`}
      >
        {currloading ? "loading..." : "get my coord"}
      </button>
      <MapContainer
        center={mappostion}
        // center={[mlat || 40, mlng || 0]}
        zoom={16}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />

        {cities.map((city) => (
          <Marker
            position={[city.position.lat, city.position.lng]}
            key={city.id}
          >
            <Popup>{city.cityName}</Popup>
          </Marker>
        ))}
        <Mapcenter position={mappostion} />
        <Detectevent />
      </MapContainer>
    </div>
  );
}

function Mapcenter({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}
function Detectevent() {
  const nav = useNavigate();
  useMapEvents({
    click: (e) => nav(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`),
  });
}

export default Map;
