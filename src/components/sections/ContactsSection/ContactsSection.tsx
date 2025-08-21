'use client'
import s from './ContactsSection.module.css'
import LocationItem from '@/components/sections/ContactsSection/LocationItem/LocationItem'
import SocialNetworkItem from '@/components/sections/ContactsSection/SocialNetworkItem/SocialNetworkItem'
import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'

export default function ContactsSection({ block, locale }: { block: any; locale: string }) {
  const locations: any[] = block.locations
  const social_networks: any = block.social_networks
  const defaultCenter: [number, number] = [50.4501, 30.5234]
  const [width, setWidth] = useState<number>(0)

  const center = locations.find(loc => loc.is_location)?.coords ?? defaultCenter
  const DynamicMap = dynamic(
    () => import('@/components/sections/ContactsSection/MapComponent/MapComponent'),
    {
      ssr: false,
      loading: () => <p>Завантаження карти...</p>,
    },
  )
  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth / 4)
    handleResize() // виставляємо ширину одразу після маунту

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])
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
          {width > 376 && (
            <ul className={s.content_list_social}>
              {Object.entries(social_networks).map(([key, value], index) => (
                <SocialNetworkItem key={`${index}-0`} {...social_networks[key]} />
              ))}
            </ul>
          )}
        </aside>
        <DynamicMap locations={locations} center={center} />
        {width <= 376 && (
          <ul className={s.content_list_social}>
            {Object.entries(social_networks).map(([key, value], index) => (
              <SocialNetworkItem key={`${index}-0`} {...social_networks[key]} />
            ))}
          </ul>
        )}
      </section>
    </>
  )
}
