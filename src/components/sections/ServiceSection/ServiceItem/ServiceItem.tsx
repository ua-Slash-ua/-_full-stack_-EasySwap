'use client'
import s from './ServiceItem.module.css'
import { ServiceItemProps } from '@/props/ServiceItemProps'
import ItemBlock from '@/components/sections/ServiceSection/ServiceItem/ItemBlock/ItemBlock'
import { usePopup } from '@/context/PopupContext'
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function ServiceItem({
                                      service,
                                      isActive,
                                      setActive,
                                    }: {
  service: ServiceItemProps
  isActive: boolean
  setActive: (active: boolean) => void
}) {
  const { setOpen } = usePopup()
  const [animate, setAnimate] = useState(false)

  // Запуск анімації при зміні service
  useEffect(() => {
    setAnimate(false) // скидаємо стан
    const timer = setTimeout(() => setAnimate(true), 200) // невелика затримка для повторного запуску
    return () => clearTimeout(timer)
  }, [service])

  return (
    <div className={s.service_item}>
      {/* Заголовок */}
      <AnimatePresence mode="wait">
        <motion.div
          key={service.id} // Тепер працює правильно
          className={s.item_header}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        >
          <div
            className={s.header_icon}
            dangerouslySetInnerHTML={{ __html: service.service_icon }}
          />
          <h3>{service.service_title}</h3>
        </motion.div>
      </AnimatePresence>

      {/* Контент */}
      <motion.div
        className={s.item_content_double}
        key={service.id}

        initial={{ opacity: 0, y: 50 }}
        animate={animate ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.5, ease: 'easeOut', delay: 0.2 }}
      >
        <ItemBlock
          isLeft={true}
          points={service.how_does_it_work.map(
            (item) => item.how_does_it_work_description
          )}
          isActive={isActive}
          setActive={setActive}
        />
        <ItemBlock
          isLeft={false}
          points={service.features.map((item) => item.features_description)}
          isActive={isActive}
          setActive={setActive}
        />
      </motion.div>

      {/* Кнопка */}
      <div className={s.item_btn} onClick={() => setOpen('create_application')}>
        <svg width="22" height="20" viewBox="0 0 22 20" fill="none">
          {/* SVG шлях */}
        </svg>
        <span>Залишити заявку</span>
      </div>
    </div>
  )
}
