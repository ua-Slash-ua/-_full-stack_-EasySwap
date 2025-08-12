
import s from './Header.module.css'
import Logo from '@/components/Logo/Logo'
import Menu from '@/components/Header/Menu/Menu'
import StarBorder from '@/libs/StarBorder/StarBorder'
import BtnPhone from '@/components/layout/BtnPhone/BtnPhone'
import { contacts } from '@/config/contacts.config'
import BtnSendApplication from '@/components/layout/BtnSendApplication/BtnSendApplication'
import CreateApplication from '@/components/PopUps/CreateApplication/CreateApplication'

export default function Header({ block, locale }: { block: any; locale: string }) {

  return (
    <>
      <header className={s.header}>
        <div className={s.rside}>
          <Logo />
          <Menu />
        </div>
        <div className={s.lside}>
          <BtnPhone
            svgIcon={contacts.iconPhone.replace('#7C4DF5', 'white')}
            phone={block.phone}
          />
          <BtnSendApplication
            svgIcon={contacts.iconMail}
            text={'Залишити заявку'}
          />
        </div>

      </header>
    </>
  )
}
