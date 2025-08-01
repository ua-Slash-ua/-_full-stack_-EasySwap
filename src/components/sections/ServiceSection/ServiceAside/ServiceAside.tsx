import s from './ServiceAside.module.css'
import { ServiceAsideProps } from '@/props/ServiceAsideProps'

export default function ServiceAside({ title, menuItems }: ServiceAsideProps) {
  return (
    <>
      <aside className={s.service_aside}>
        <h3 dangerouslySetInnerHTML={{ __html: title }}/>
        <div className={s.aside_menu}>
          <div className={s.aside_scroll}>

          </div>
          <ul>
            {menuItems.map((item, index) => (
              <li key={index}>
                <span>{item.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </>
  )
}
