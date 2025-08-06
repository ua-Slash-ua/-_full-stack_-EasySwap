import s from './Footer.module.css'
import Logo from '@/components/Logo/Logo'
import StarBorder from '@/libs/StarBorder/StarBorder'
import Link from 'next/link'
import BtnPhone from '@/components/layout/BtnPhone/BtnPhone'
import { contacts } from '@/config/contacts.config'
import BtnSendApplication from '@/components/layout/BtnSendApplication/BtnSendApplication'

export default function Footer({ block, locale }: { block: any; locale: string }) {
  const socialMedia = block.social_networks
  return (
    <>
      <footer className={s.footer}>
        <div className={s.footer_container}>
          <div className={s.footer_header}>
            <Logo />
            <div className={s.social_media}>
              {Object.entries(socialMedia).map(([key, value], index) => (
                <div key={index} className={s.sm_icon}>
                  <Link href={socialMedia[key].link} target="_blank">
                    <div dangerouslySetInnerHTML={{ __html: socialMedia[key].footer_icon }} />
                  </Link>
                </div>
              ))}
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
          </div>
        </div>
      </footer>
    </>
  )
}
