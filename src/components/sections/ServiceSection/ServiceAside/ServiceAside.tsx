import s from './ServiceAside.module.css'
import { ServiceAsideProps } from '@/props/ServiceAsideProps'
import React from 'react'

export default function ServiceAside({ title, menuItems, func, activeService }: ServiceAsideProps) {
  return (
    <>
      <aside className={s.service_aside}>
        <h3 dangerouslySetInnerHTML={{ __html: title }} />
        <div className={s.aside_menu}>
          <div className={s.aside_scroll}>
            {menuItems.map((item, index) => (
              <div
                key={index}
                className={`${s.aside_scroll_item}`}
                onClick={() => func(index)}
                style={{
                  height: `${100 / menuItems.length}%`,
                }}
              >
                <div
                  className={`${s.scroll_back} ${activeService === index ? s.active_scroll : ''}`}

                ></div>
              </div>
            ))}
          </div>
          <ul>
            {menuItems.map((item, index) => (
              <li
                key={index}
                onClick={() => {
                  func(index)
                }}
                className={activeService === index ? s.active : ''}
              >
                {item.text}
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </>
  )
}
