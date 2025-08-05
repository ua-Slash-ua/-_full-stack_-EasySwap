import s from './ContactsSection.module.css'
import LocationItem from '@/components/sections/ApplicationSection/LocationItem/LocationItem'

export default function ContactsSection({ block, locale }: { block: any; locale: string }) {
  const data: any[] = block.locations
  return (
    <>
      <section className={s.contacts_section} id="contacts">
        <aside className={s.main}>
          <div className={s.content}>
            <h3>Контакти і локації</h3>
            <ul className={s.content_list}>
              {data.map((item, index) =>
                item.is_location ? <LocationItem key={index} {...item} /> : '',
              )}
            </ul>
          </div>
          <div className={s.social_network}></div>
        </aside>
        <div className={s.map}></div>
      </section>
    </>
  )
}
