'use client'
import { ServiceItemBlockProps } from '@/props/ServiceItemBlockProps'
import { serviceData } from '@/config/services.config'
import s from './ItemBlock.module.css'
import { useEffect, useState } from 'react'

export default function ItemBlock({ isLeft, points }: ServiceItemBlockProps) {
  const serviceConst = isLeft ? serviceData[0] : serviceData[1]
  const [active, setActive] = useState(false)
  const [width, setWidth] = useState<number>(0)
  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth/4)
    handleResize() // виставляємо ширину одразу після маунту

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])
  return (
    <>
      <div className={s.item_block}>
        <div className={s.item_header}>
          <h4>{serviceConst.title}</h4>
          {!isLeft && (
            <div
              className={`${s.arrow} show ${active ? s.active : ''}`}
              onClick={() => setActive(!active)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="8"
                viewBox="0 0 16 8"
                fill="none"
              >
                <path
                  d="M14.2741 0L15.5 1.1898L8.81881 7.67036C8.71176 7.77483 8.58445 7.85773 8.44422 7.9143C8.304 7.97088 8.15362 8 8.00174 8C7.84985 8 7.69947 7.97088 7.55925 7.9143C7.41902 7.85773 7.29171 7.77483 7.18466 7.67036L0.5 1.1898L1.72591 0.00112152L8 6.08359L14.2741 0Z"
                  fill="white"
                />
              </svg>
            </div>
          )}
        </div>
        {(
          isLeft ||
          (!isLeft && (width > 376 || (active && width <= 376)))
        ) && (

          <ul>
            {points.map((point, index) => (
              <li key={index}>
                <div className={s.item_block_line}>
                  <div className={s.item_block_icon}>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: serviceConst.icon || `<span>${index + 1}</span>`,
                      }}
                    />
                  </div>
                  <p>{point}</p>
                </div>
              </li>
            ))}
          </ul>
        )}


      </div>
    </>
  )
}
