'use client'
import s from './HeaderScroll.module.css'
import Logo from '@/components/Logo/Logo'
import Menu from '@/components/Header/Menu/Menu'
import BtnPhone from '@/components/layout/BtnPhone/BtnPhone'
import { contacts } from '@/config/contacts.config'
import BtnSendApplication from '@/components/layout/BtnSendApplication/BtnSendApplication'
import { useEffect, useState } from 'react'
import { usePopup } from '@/context/PopupContext'

export default function HeaderScroll({
  block,
  className,
}: {
  block: any
  className: string
}) {
  const { setOpen } = usePopup()
  const [width, setWidth] = useState<number>(0)
  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth )
    handleResize() // виставляємо ширину одразу після маунту

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <>
      <header className={`${s.header} ${className ?? ''}`}>
        <div className={s.rside}>
          <Logo />
        </div>
        {width > 1024 ? <Menu /> : null}

        <div className={s.lside}>
          {width > 1024 ? (
            <BtnSendApplication
              svgIcon={contacts.iconMail}
              text={'Залишити заявку'}
              isReversed={true}
            />
          ) : null}
          <BtnPhone
            svgIcon={contacts.iconPhone.replace('#7C4DF5', 'white')}
            phone={block.phone}
            isReversed={true}
            isMobileMenu={true}
          />
          {width <= 1024 ? (
            <div
              className={s.header_menu}
              onClick={() =>
                setOpen('menu_mobile', {phone:block.phone, social_network:block.social_networks})
              }
            >
              <span>Меню</span>
            </div>
          ) : null}
        </div>
      </header>
    </>
  )
}
