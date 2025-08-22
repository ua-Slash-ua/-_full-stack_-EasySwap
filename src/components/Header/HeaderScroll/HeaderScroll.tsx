import s from './HeaderScroll.module.css'
import Logo from '@/components/Logo/Logo'
import Menu from '@/components/Header/Menu/Menu'
import BtnPhone from '@/components/layout/BtnPhone/BtnPhone'
import { contacts } from '@/config/contacts.config'
import BtnSendApplication from '@/components/layout/BtnSendApplication/BtnSendApplication'

export default function HeaderScroll({
  block,
  locale,
  className,
}: {
  block: any
  locale: string
  className: string
}) {
  return (
    <>
      <header className={`${s.header} ${className??''}`}>
        <div className={s.rside}>
          <Logo />
        </div>
        <Menu />
        <div className={s.lside}>
          <BtnSendApplication
            svgIcon={contacts.iconMail}
            text={'Залишити заявку'}
            isReversed={true}
          />
          <BtnPhone
            svgIcon={contacts.iconPhone.replace('#7C4DF5', 'white')}
            phone={block.phone}
            isReversed={true}
          />
        </div>
      </header>
    </>
  )
}
