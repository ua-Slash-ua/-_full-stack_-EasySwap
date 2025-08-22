'use client'

import s from './Header.module.css'
import Logo from '@/components/Logo/Logo'
import Menu from '@/components/Header/Menu/Menu'
import BtnPhone from '@/components/layout/BtnPhone/BtnPhone'
import { contacts } from '@/config/contacts.config'
import BtnSendApplication from '@/components/layout/BtnSendApplication/BtnSendApplication'
import HeaderScroll from '@/components/Header/HeaderScroll/HeaderScroll'
import { useEffect, useState } from 'react'

export default function Header({ block, locale }: { block: any; locale: string }) {
  const [scrolled, setScrolled] = useState(false)
  const [width, setWidth] = useState<number>(0)

  useEffect(() => {
    const handleScroll = () => {
      // розрахунок 10vw у пікселях
      let threshold
      if (width > 1024) {
        threshold = window.innerWidth * 0.4693
      }else{
        threshold = window.innerWidth * 2.3
      }
      // const threshold = window.innerWidth * 0.1;
      const currentScrollY = window.scrollY

      if (currentScrollY > threshold) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener('scroll', handleScroll)

    // одразу викликаємо для першого рендера
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth )
    handleResize() // виставляємо ширину одразу після маунту

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <>
      <header className={`${s.header} ${!scrolled ? s.visible : s.hidden}`}>
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
            <div className={s.header_menu}><span>Меню</span></div>
          )}
        </div>
      </header>

      <HeaderScroll
        block={block}
        locale={locale}
        className={`${s.headerScroll} ${scrolled ? s.visible : s.hidden}`}
      />
    </>
  )
}
