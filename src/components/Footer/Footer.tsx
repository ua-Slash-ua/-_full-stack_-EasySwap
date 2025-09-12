'use client'
import s from './Footer.module.css'
import Logo from '@/components/Logo/Logo'
import Link from 'next/link'
import BtnPhone from '@/components/layout/BtnPhone/BtnPhone'
import { contacts } from '@/config/contacts.config'
import BtnSendApplication from '@/components/layout/BtnSendApplication/BtnSendApplication'
import Magnet from '@/libs/Magnet/Magnet'
import { useEffect, useState } from 'react'
import { footerConfig } from '@/config/footer.config'
import AnimateTitle from '@/components/AnimateTitle/AnimateTitle'
import blurIconDesktop from 'public/blur_footer_desktop.svg'
import blurIconMobile from 'public/blur_footer_mobile.svg'
import Image from 'next/image'

export default function Footer({
  block,
  slug_privacy_policy,
}: {
  block: any
  slug_privacy_policy: string
}) {
  const socialMedia = block.social_networks
  const footerWords = block.footer_words
  const [width, setWidth] = useState<number>(0)

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth)
    handleResize() // виставляємо ширину одразу після маунту

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])
  return (
    <>
      <footer className={s.footer}>
        <div className={`${s.circle}`}></div>
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
            {width > 1024 && (
              <div className={s.lside}>
                <BtnPhone
                  svgIcon={contacts.iconPhone.replace('#7C4DF5', 'white')}
                  phone={block.phone}
                />
                <BtnSendApplication svgIcon={contacts.iconMail} text={'Залишити заявку'} />
              </div>
            )}
          </div>
          <div className={s.footer_title}>
            <p>
              <AnimateTitle tagName={'span'} text={'easy'} className={s.easy} duration={0.8}/>
              <AnimateTitle tagName={'span'} text={'swap'} delayCount={0.7} whiteEnd={false} duration={0.8}/>
              {/*<span>easy </span>*/}
              {/*swap*/}
            </p>
          </div>
          <div className={s.footer_words}>
            <div className={s.word_container}>
              {Object.entries(footerWords).map(([key, value], index) => (
                <div key={index} className={s.word_item_container}>
                  <Magnet
                    className={s.word_item}
                    padding={0}
                    disabled={false}
                    magnetStrength={1.5}
                  >
                    {footerWords[key]}
                  </Magnet>
                  {index === 1 && (
                    width > 1024 ? (
                      <Image src={blurIconDesktop} alt="blur icon" width={1000} height={1000} />
                    ) : (
                      <Image src={blurIconMobile} alt="blur icon" width={1000} height={1000} />
                    )
                  )}

                </div>
              ))}
            </div>
          </div>
          {width <= 1024 && (
            <div className={s.lside}>
              <BtnPhone
                svgIcon={contacts.iconPhone.replace('#7C4DF5', 'white')}
                phone={block.phone}
                isReversed={true}
              />
              <BtnSendApplication svgIcon={contacts.iconMail} text={'Залишити заявку'} />
            </div>
          )}
          <ul className={s.footer_footer}>
            <li>
              <p>©2025 Easy Swap. All Rights Reserved.</p>
            </li>
            <li>
              <Link href={`/${slug_privacy_policy}`}>
                <p>Політика конфіденційності</p>
              </Link>
            </li>
            <li>
              <div>
                <p>Дизайн & Розробка:</p>
                <Link
                  href={
                    'https://www.instagram.com/before_after.agency/?igsh=MTVyMTIxaTE4ZmRobA%3D%3D#'
                  }
                  target={'_blank'}
                >
                  <span>Before/After</span>
                </Link>
                <p> & </p>
                <Link href={'https://projection-ua.webflow.io/'} target={'_blank'}>
                  <span>PROJECTION</span>
                </Link>
              </div>
            </li>
          </ul>
          <Link href={'#main'} className={s.footer_to_up}>
            <div dangerouslySetInnerHTML={{ __html: footerConfig.toUp }} />
          </Link>
        </div>
      </footer>
    </>
  )
}
