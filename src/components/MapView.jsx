import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

export default function MapView({ location }) {
  if (!location) return null;

  return (
    <MapContainer
      center={[location.lat, location.lng]}
      zoom={14}
      style={{ height: "300px", width: "100%", borderRadius: "10px" }}
    >
      <TileLayer
        attribution="© OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[location.lat, location.lng]}>
        <Popup>Pickup location</Popup>
      </Marker>
    </MapContainer>
  );
}
