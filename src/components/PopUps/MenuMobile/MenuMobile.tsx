import s from './MenuMobile.module.css'
import React from 'react'
import { usePopup } from '@/context/PopupContext'
import { menu } from '@/config/menu.config'
import MenuItem from '@/components/Header/Menu/MenuItem/MenuItem'
import Logo from '@/components/Logo/Logo'
import { contacts } from '@/config/contacts.config'
import Image from 'next/image'
import bg from 'public/menu_bg_mobile.png'
import BtnPhone from '@/components/layout/BtnPhone/BtnPhone'
import BtnSendApplication from '@/components/layout/BtnSendApplication/BtnSendApplication'
import SocialNetworkItem from '@/components/sections/ContactsSection/SocialNetworkItem/SocialNetworkItem'
import { motion } from 'framer-motion'

type MenuMobileProps = {
  phone: string
  social_network: any
}
export default function MenuMobile({ phone, social_network }: MenuMobileProps) {
  const { close, setOpen } = usePopup()
  return (
    <>
      <div className={s.popup_backgraund}>
        <motion.div
          className={s.popup_container}
          id={'menu_mobile'}
          initial={{ opacity: 0, y:100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: 'linear' }}
        >
          <div className={s.bg_container}>
            <Image src={bg} alt={'Bg_mobile'} />
          </div>
          <div className={s.header}>
            <Logo />
            <div className={s.lside}>
              <BtnPhone
                svgIcon={contacts.iconPhone}
                isReversed={true}
                phone={phone}
                isMobileMenu={true}
              />
              <div className={s.header_menu} onClick={close}>
                <span>Закрити</span>
              </div>
            </div>
          </div>
          <div className={s.menu_container}>
            <nav className={s.menu_items}>
              <span>Меню</span>
              <ul>
                {menu.map((item, index) =>
                  item.main ? <MenuItem link={item.link!} text={item.text!} key={index} /> : '',
                )}
              </ul>
            </nav>
          </div>
          <div className={s.menu_btn}>
            <BtnSendApplication svgIcon={contacts.iconMail} text={'Залишити заявку'} />
          </div>
          <div className={s.social_networks}>
            {Object.entries(social_network).map(([key, value], index) => (
              <SocialNetworkItem key={`${index}-0`} {...social_network[key]} />
            ))}
          </div>
        </motion.div>
      </div>
    </>
  )
}
