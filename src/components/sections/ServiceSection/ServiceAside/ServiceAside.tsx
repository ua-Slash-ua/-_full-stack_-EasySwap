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
                className={`${s.aside_scroll_item} ${activeService === index ? s.active_scroll : ''}`}
                style={{
                  height: `${100 / menuItems.length}%`,
                  '--target-height': `${100 / menuItems.length}%`,
                } as React.CSSProperties}
                onClick={() => func(index)}
              ></div>

            ))}
          </div>
          <ul>
            {menuItems.map((item, index) => (
              <li
                key={index}
                onClick={() => {
                  func(index)
                }}
              >
                <span className={activeService === index ? s.active : ''}>{item.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </>
  )
}
