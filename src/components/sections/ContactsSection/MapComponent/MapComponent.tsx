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
          url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
          attribution="&copy; Stadia Maps, OpenMapTiles & OpenStreetMap contributors"
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
