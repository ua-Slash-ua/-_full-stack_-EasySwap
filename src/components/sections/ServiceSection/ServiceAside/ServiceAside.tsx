import s from './ServiceAside.module.css'
import { ServiceAsideProps } from '@/props/ServiceAsideProps'

export default function ServiceAside({ title, menuItems, func }: ServiceAsideProps) {
  return (
    <>
      <aside className={s.service_aside}>
        <h3 dangerouslySetInnerHTML={{ __html: title }}/>
        <div className={s.aside_menu}>
          <div className={s.aside_scroll}>

          </div>
          <ul>
            {menuItems.map((item, index) => (
              <li key={index} onClick={() => {func(index)}}>
                <span>{item.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </>
  )
}
