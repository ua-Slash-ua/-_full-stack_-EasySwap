'use client'
import s from './MapComponent.module.css'

import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import 'leaflet-defaulticon-compatibility'
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css'

export default function MapComponent({locations, center}: { locations: any[]; center: [number, number]}) {
  return (
    <>
      <MapContainer
        center={center}
        zoom={12}
        style={{ height: '100vh', width: '100%' }}
        className={s.map}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OSM</a> contributors &copy; <a href='https://carto.com/'>CARTO</a>"
          subdomains={['a','b','c','d']}
        />
        {locations.map((item, index) =>
          item.is_location ? (
            <Marker key={index} position={item.coords}>
              <Popup>{`${item.address}, ${item.description}`}</Popup>
            </Marker>
          ) : null,
        )}
      </MapContainer>
    </>
  )
}
