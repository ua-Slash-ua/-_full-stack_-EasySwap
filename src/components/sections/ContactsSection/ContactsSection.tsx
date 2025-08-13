'use client'
import s from './ContactsSection.module.css'
import LocationItem from '@/components/sections/ContactsSection/LocationItem/LocationItem'
import SocialNetworkItem from '@/components/sections/ContactsSection/SocialNetworkItem/SocialNetworkItem'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import 'leaflet-defaulticon-compatibility'
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css'

export default function ContactsSection({ block, locale }: { block: any; locale: string }) {
  const locations: any[] = block.locations
  const social_networks: any = block.social_networks
  const defaultCenter: [number, number] = [50.4501, 30.5234];

  const center = locations.find(loc => loc.is_location)?.coords ?? defaultCenter;


  return (
    <>
      <section className={s.contacts_section} id="contacts">
        <aside className={s.main}>
          <div className={s.content}>
            <h3>Контакти і локації</h3>
            <ul className={s.content_list_address}>
              {locations.map((item, index) =>
                item.is_location ? <LocationItem key={index} {...item} /> : '',
              )}
            </ul>
          </div>
          <ul className={s.content_list_social}>
            {Object.entries(social_networks).map(([key, value], index) => (
              <SocialNetworkItem key={index} {...social_networks[key]} />
            ))}
          </ul>
        </aside>
        <MapContainer
          center={center}
          zoom={6}
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
      </section>
    </>
  )
}
