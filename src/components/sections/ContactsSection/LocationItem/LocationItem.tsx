import s from './LocationItem.module.css'
import { contacts } from '@/config/contacts.config'

type locationProps = {
  is_location?: boolean
  address: string
  description: string
  phone: string
  schedule: string
  coords: number[]
  id?: string
}

export default function LocationItem({
  address,
  description,
  phone,
  schedule,
  coords,
}: locationProps) {
  return (
    <>
      <li className={s.location_item}>
        <div className={s.location_header}>
          <div className={s.bg_circle}>
            <div dangerouslySetInnerHTML={{ __html: contacts.iconLocation }} />
          </div>
          <div className={s.header_title}>
            <h4>{address}</h4>
            <p>{description}</p>
          </div>
        </div>
        <ul className={s.location_content}>
          <li>
            <div className={s.bg_circle}>
              <div dangerouslySetInnerHTML={{ __html: contacts.iconSchedule }} />
            </div>
            <p>{schedule}</p>
          </li>
          <li>
            <div className={s.bg_circle}>
              <div dangerouslySetInnerHTML={{ __html: contacts.iconPhone }} />
            </div>
            <p>{phone}</p>
          </li>
        </ul>
        <div
          className={s.location_btn}
          onClick={() => {
            const [lat, lng] = coords
            window.open(
              `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`,
              '_blank'
            )
          }}
        >
          <div dangerouslySetInnerHTML={{ __html: contacts.iconBtn }} />
          <span>Прокласти маршрут</span>
        </div>

      </li>
    </>
  )
}
