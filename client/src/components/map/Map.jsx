import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "./map.scss";
import "leaflet/dist/leaflet.css";
import Pin from "../pin/Pin";

const Map = ({ items }) => {
  const { latitude, longitude } = items[0];
  return (
    <MapContainer center={[latitude, longitude]} zoom={7} scrollWheelZoom={false} className="map">
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {items.map((item) => {
        return <Pin key={item.id} item={item} />;
      })}
    </MapContainer>
  );
};

export default Map;
