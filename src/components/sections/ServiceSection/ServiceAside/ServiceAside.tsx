import s from './ServiceAside.module.css'
import { ServiceAsideProps } from '@/props/ServiceAsideProps'
import React from 'react'
import AnimateTitle from '@/components/AnimateTitle/AnimateTitle'

export default function ServiceAside({  menuItems, func, activeService }: ServiceAsideProps) {
  return (
    <>
      <aside className={s.service_aside}>
        <h3>
          <AnimateTitle text={'Послуги'} tagName={'span'} className={''}/>
          <AnimateTitle text={'easy'} tagName={'span'} className={s.easy} delayCount={0.3} />
          <AnimateTitle text={'swap'} tagName={'span'} className={''} delayCount={1}/>

        </h3>
        <div className={s.aside_menu}>
          <div className={`${s.aside_scroll} hide`}>
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
          <div className={`${s.aside_scroll} show`}>
            {menuItems.map((item, index) => (
              <div
                key={index}
                className={`${s.aside_scroll_item}`}
                onClick={() => func(index)}
                style={{
                  width: `${100 / menuItems.length}%`,
                }}
              >
                <div
                  className={`${s.scroll_back} ${activeService === index ? s.active_scroll : ''}`}
                ></div>
              </div>
            ))}
          </div>
        </div>
      </aside>
    </>
  )
}
