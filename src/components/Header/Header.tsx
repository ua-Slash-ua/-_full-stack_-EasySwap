'use client'

import s from './Header.module.css'
import Logo from '@/components/Logo/Logo'
import Menu from '@/components/Header/Menu/Menu'
import BtnPhone from '@/components/layout/BtnPhone/BtnPhone'
import { contacts } from '@/config/contacts.config'
import BtnSendApplication from '@/components/layout/BtnSendApplication/BtnSendApplication'
import HeaderScroll from '@/components/Header/HeaderScroll/HeaderScroll'
import { useEffect, useState } from 'react'
import { usePopup } from '@/context/PopupContext'
import { motion } from 'framer-motion'

export default function Header({ block }: { block: any }) {
  const [scrolled, setScrolled] = useState(false)
  const [mobile, setMobile] = useState(false)
  const [width, setWidth] = useState<number>(0)
  const { setOpen } = usePopup()

  let threshold

  useEffect(() => {
    const handleScroll = () => {
      let threshold: number

      if (width > 1024) {
        threshold = window.innerWidth * 0.1
        setMobile(false)
      } else {
        threshold = window.innerWidth * 2.0
        setMobile(true)
      }

      const currentScrollY = window.scrollY

      // 10% до кінця сторінки
      const windowHeight = window.innerHeight
      const docHeight = document.documentElement.scrollHeight
      const distanceFromBottom = docHeight - (currentScrollY + windowHeight)

      if (currentScrollY > threshold && distanceFromBottom > docHeight * 0.1) {
        setScrolled(true) // показуємо меню
      } else {
        setScrolled(false) // ховаємо меню
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // одразу на рендері

    return () => window.removeEventListener('scroll', handleScroll)
  }, [width])

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth)
    handleResize() // виставляємо ширину одразу після маунту

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <>
      {width !== 0 ? (
        <>
          <motion.header
            className={`${s.header} ${!scrolled ? s.visible : s.hidden}`}
            initial={{
              opacity: 0,
              y: -100,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.3, ease: 'easeOut',
            }}

          >
            <div className={s.rside}>
              <Logo />
              {width > 1024 ? <Menu /> : null}
            </div>
            <div className={s.lside}>
              {width > 1024 ? (
                <BtnPhone
                  svgIcon={contacts.iconPhone.replace('#7C4DF5', 'white')}
                  phone={block.phone}
                />
              ) : (
                <BtnPhone
                  svgIcon={contacts.iconPhone.replace('#7C4DF5', 'white')}
                  phone={block.phone}
                  isReversed={true}
                />
              )}
              {width > 1024 ? (
                <BtnSendApplication svgIcon={contacts.iconMail} text={'Залишити заявку'} />
              ) : (
                <div
                  className={s.header_menu}
                  onClick={() =>
                    setOpen('menu_mobile', {
                      phone: block.phone,
                      social_network: block.social_networks,
                    })
                  }
                >
                  <span>Меню</span>
                </div>
              )}
            </div>
          </motion.header>

          <HeaderScroll
            isMobile={mobile}
            block={block}
            className={`${s.headerScroll} ${scrolled ? s.visible : s.hidden}`}
          />
        </>
      ) : (
        ''
      )}
    </>
  )
}
