'use client'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import 'leaflet-defaulticon-compatibility'
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css'

import './MapComponent.css'
import s from './MapComponent.module.css'

import { useEffect, useState } from 'react'
import L from 'leaflet'
import iconMap from 'public/map/map-icon.png'

// утиліта для конвертації vw → px
const vw = (value: number) => (window.innerWidth / 100) * value

export default function MapComponent({
  locations,
  center,
}: {
  locations: any[]
  center: [number, number]
}) {
  const [width, setWidth] = useState<number>(0)

  const [icon, setIcon] = useState<L.Icon>()
  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);

    // виставити відразу при монтуванні
    handleResize();

    // підписатися на зміни
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    console.log('MAPwidth = ', width)
    let customIcon
    if (width > 1024) {
      console.log('+++')
      // створюємо іконку з розмірами у vw
      customIcon = L.icon({
        iconUrl: iconMap.src,
        iconSize: [vw(2), vw(2)],
        iconAnchor: [vw(2), vw(2)],
        // className:s.map_popup,
        popupAnchor: [-vw(0.6), -vw(2)],
      })
    } else {
      console.log('---')

      customIcon = L.icon({
        iconUrl: iconMap.src,
        iconSize: [vw(9.57447), vw(9.57447)],
        iconAnchor: [vw(1), vw(2)],
        className:s.map_popup,
        popupAnchor: [vw(3.6), -vw(2)],
      })
    }

    setIcon(customIcon)
  }, [width])
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
          subdomains={['a', 'b', 'c', 'd']}
        />
        {locations.map((item, index) =>
          item.is_location ? (
            <Marker key={index} position={item.coords} icon={icon}>
              <Popup
                className={s.map_popup}
              >{`${item.address}`}</Popup>
            </Marker>
          ) : null,
        )}
      </MapContainer>
    </>
  )
}
