'use client'
import s from './SupportSection.module.css'
import './SupportSection.css'
import { supportData } from '@/config/support.config'
import Aurora from '@/libs/Aurora/Aurora'
import Link from 'next/link'

export default function SupportSection({
  block,
  locale,
  telegram,
}: {
  block: any
  locale: string
  telegram?: string
}) {
  return (
    <>
      <section className={s.support_section}>
        <div className={s.support_container}>
          <Aurora
            colorStops={['#755AAD', '#391E7E', '#4B24CA']}
            blend={0.5}
            amplitude={1.0}
            speed={0.5}
            className={s.support_back}
          />
          <div className={s.support_content}>
            <div className={s.icons}>
              {supportData.icons.map((icon, index) => (
                <div key={index} dangerouslySetInnerHTML={{ __html: icon }} />
              ))}
            </div>
            <div className={s.title}>
              <h3 dangerouslySetInnerHTML={{ __html: block.title }} />
            </div>
            <div className={s.description}>
              <p>{block.description}</p>
            </div>
            <Link href={telegram ?? '#main'} className={s.support_btn} target={'_blank'}>
              <svg
                width="25"
                height="24"
                viewBox="0 0 25 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M22.4362 5.1682L19.4062 19.3532C19.1802 20.3522 18.6002 20.5772 17.7622 20.1262L13.2172 16.7742L10.9922 18.9012C10.7672 19.1272 10.5412 19.3532 10.0252 19.3532L10.3802 14.6782L18.8582 6.9742C19.2122 6.6192 18.7612 6.4902 18.3102 6.7812L7.76916 13.4212L3.22316 12.0352C2.22416 11.7132 2.22416 11.0352 3.44916 10.5852L21.1142 3.7182C21.9842 3.4602 22.7262 3.9122 22.4362 5.1682Z"
                  fill="#0F0E13"
                />
              </svg>
              <span>Написати в Telegram</span>
            </Link>
          </div>
        </div>
        <div className={`${s.circle} hide`}></div>
      </section>
    </>
  )
}
