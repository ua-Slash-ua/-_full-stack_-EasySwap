'use client'
import s from './FAQSection.module.css'
import FAQItem from '@/components/sections/FAQSection/FAQItem/FAQItem'
import { FAQItemProps } from '@/props/FAQItemProps'
import { usePopup } from '@/context/PopupContext'
import AnimateTitle from '@/components/AnimateTitle/AnimateTitle'

export default function FAQSection({ block, locale }: { block: any; locale: string }) {
  const { setOpen } = usePopup()

  return (
    <>
      <section className={s.faq_section}>
        <AnimateTitle tagName={'h3'} text={'Питання та відповіді'}/>
        <div className={s.faq_container}>
          <div className={s.faq_content}>
            <ul>
              {block.elements.map((item: FAQItemProps, index: number) => (
                <FAQItem key={index} question={item.question} answer={item.answer} />
              ))}
            </ul>
          </div>
          <aside className={s.faq_aside}>
            <div className={s.container}>
              <div className={s.aside_icon}>
                <div>
                  <svg
                    width="40"
                    height="44"
                    viewBox="0 0 40 44"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M20 0C31.046 0 40 8.954 40 20C40 31.046 31.046 40 20 40C8.954 40 0 31.046 0 20C0 8.954 8.954 0 20 0ZM20 28C19.4696 28 18.9609 28.2107 18.5858 28.5858C18.2107 28.9609 18 29.4696 18 30C18 30.5304 18.2107 31.0391 18.5858 31.4142C18.9609 31.7893 19.4696 32 20 32C20.5304 32 21.0391 31.7893 21.4142 31.4142C21.7893 31.0391 22 30.5304 22 30C22 29.4696 21.7893 28.9609 21.4142 28.5858C21.0391 28.2107 20.5304 28 20 28ZM20 9C18.0772 9 16.2331 9.76384 14.8735 11.1235C13.5138 12.4831 12.75 14.3272 12.75 16.25C12.75 16.7804 12.9607 17.2891 13.3358 17.6642C13.7109 18.0393 14.2196 18.25 14.75 18.25C15.2804 18.25 15.7891 18.0393 16.1642 17.6642C16.5393 17.2891 16.75 16.7804 16.75 16.25C16.7507 15.6601 16.9119 15.0814 17.2164 14.5762C17.5209 14.0709 17.9571 13.658 18.4784 13.3818C18.9997 13.1056 19.5863 12.9765 20.1754 13.0084C20.7644 13.0402 21.3337 13.2318 21.8222 13.5625C22.3107 13.8933 22.6999 14.3508 22.9482 14.8859C23.1965 15.4211 23.2944 16.0137 23.2315 16.6003C23.1685 17.1868 22.9472 17.7452 22.591 18.2155C22.2349 18.6858 21.7575 19.0504 21.21 19.27C19.858 19.81 18 21.194 18 23.5V24C18 24.5304 18.2107 25.0391 18.5858 25.4142C18.9609 25.7893 19.4696 26 20 26C20.5304 26 21.0391 25.7893 21.4142 25.4142C21.7893 25.0391 22 24.5304 22 24C22 23.512 22.1 23.268 22.522 23.06L22.696 22.98C24.2576 22.3518 25.5521 21.1999 26.3575 19.7218C27.1628 18.2438 27.429 16.5316 27.1102 14.8788C26.7915 13.226 25.9078 11.7355 24.6105 10.6629C23.3132 9.59036 21.6832 9.00245 20 9Z"
                      fill="white"
                      fillOpacity="0.6"
                    />
                  </svg>

                </div>
                <h4 className={'show_inline'}>Маєте інше питання?</h4>
              </div>
              <div className={s.aside_text}>
                <h4 className={'hide_inline'}>Маєте інше питання?</h4>
                <p>
                  Якщо у вас залишилося запитання, яке не знайшло відповіді у цьому розділі, просто
                  напишіть нам
                </p>
              </div>
            </div>
            <div className={s.aside_btn} onClick={() => setOpen('create_application')}>
              <span>Задати питання</span>
            </div>
          </aside>
        </div>
      </section>
    </>
  )
}
