import { MapContainer, TileLayer } from "react-leaflet";
import "./map.scss";
import "leaflet/dist/leaflet.css";
import Pin from "../pin/Pin";

const Map = ({ items }) => {
  return (
    <MapContainer
      center={items.length === 1 ? [items[0].latitude, items[0].longitude] : [25.105497, 121.597366]}
      zoom={8}
      scrollWheelZoom={false}
      className="map"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {items &&
        items.map((item) => {
          return <Pin key={item.id} item={item} />;
        })}
    </MapContainer>
  );
};

export default Map;
