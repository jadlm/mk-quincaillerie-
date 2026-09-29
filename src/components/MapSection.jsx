import L from 'leaflet'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import markerIcon from 'leaflet/dist/images/marker-icon.png'
import markerIconRetina from 'leaflet/dist/images/marker-icon-2x.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'
import { MapPin, Navigation } from 'lucide-react'
import store from '../data/store.json'
import { location } from '../config/contact.js'
import { googleMapsUrl } from '../utils/catalog.js'

const storeMarkerIcon = L.icon({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIconRetina,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
})

export default function MapSection() {
  const hasCoordinates = Number.isFinite(location.latitude) && Number.isFinite(location.longitude)
  return (
    <section className="map-section">
      <div className="map-copy"><span className="eyebrow">À PROXIMITÉ</span><h2>Nous trouver</h2><p><MapPin size={17} />{store.address}, {store.city}, {store.country}</p><a href={googleMapsUrl()} target="_blank" rel="noreferrer" className="button button-dark">Itinéraire <Navigation size={16} /></a></div>
      {hasCoordinates ? <div className="map-frame"><MapContainer center={[location.latitude, location.longitude]} zoom={15} scrollWheelZoom={false} aria-label="Carte de localisation de MK Quincaillerie"><TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" /><Marker position={[location.latitude, location.longitude]} icon={storeMarkerIcon}><Popup>MK QUINCAILLERIE</Popup></Marker></MapContainer></div> : <div className="map-placeholder"><span className="map-crosshair"><MapPin size={30} /></span><span>EMPLACEMENT À CONFIGURER</span><small>Ajoutez les coordonnées GPS dans <code>src/data/store.json</code></small></div>}
    </section>
  )
}