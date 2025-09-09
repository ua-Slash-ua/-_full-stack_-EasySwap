'use client'
import s from './CurrenciesInfo.module.css'
import Image from 'next/image'
import React from 'react'
import { usePopup } from '@/context/PopupContext'
import { currencies } from '@/config/currencies.config'

export default function CurrenciesInfo({ iconUSD, iconEUR }: { iconUSD: string; iconEUR: string }) {
  const { close } = usePopup()
  return (
    <>
      <div className={s.popup_backgraund} onClick={close}>
        <div
          onClick={e => e.stopPropagation()}
          className={s.popup_container}
          id={'currencies_info'}
        >
          <div className={s.btn_close} onClick={close}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
            >
              <path
                d="M6.99688 8.40078L2.09687 13.3008C1.91354 13.4841 1.68021 13.5758 1.39688 13.5758C1.11354 13.5758 0.880208 13.4841 0.696875 13.3008C0.513541 13.1174 0.421875 12.8841 0.421875 12.6008C0.421875 12.3174 0.513541 12.0841 0.696875 11.9008L5.59688 7.00078L0.696875 2.10078C0.513541 1.91745 0.421875 1.68411 0.421875 1.40078C0.421875 1.11745 0.513541 0.884114 0.696875 0.700781C0.880208 0.517448 1.11354 0.425781 1.39688 0.425781C1.68021 0.425781 1.91354 0.517448 2.09687 0.700781L6.99688 5.60078L11.8969 0.700781C12.0802 0.517448 12.3135 0.425781 12.5969 0.425781C12.8802 0.425781 13.1135 0.517448 13.2969 0.700781C13.4802 0.884114 13.5719 1.11745 13.5719 1.40078C13.5719 1.68411 13.4802 1.91745 13.2969 2.10078L8.39688 7.00078L13.2969 11.9008C13.4802 12.0841 13.5719 12.3174 13.5719 12.6008C13.5719 12.8841 13.4802 13.1174 13.2969 13.3008C13.1135 13.4841 12.8802 13.5758 12.5969 13.5758C12.3135 13.5758 12.0802 13.4841 11.8969 13.3008L6.99688 8.40078Z"
                fill="#0F0E13"
              />
            </svg>
          </div>
          <div className={s.popup_content}>
            <div className={s.info_icon}>
              <Image src={currencies.iconFooter} alt={'info'} width={25} height={25} />
            </div>
            <div className={s.title}>
              <h3>Зверніть увагу!</h3>
            </div>
            <div className={s.container_first}>
              <h3>Пояснення до таблиці:</h3>
              <ul>
                <li>
                  <div
                    className={s.li_icon}
                    dangerouslySetInnerHTML={{ __html: currencies.iconInfo }}
                  />
                  <div className={s.text}>
                    <span>USD</span>
                    <div className={s.curr_age}>
                      <Image
                        src={currencies.iconAgeNew.url}
                        alt={currencies.iconAgeNew.alt}
                        width={25}
                        height={25}
                      />
                    </div>

                    <p> - нові доларові купюри,</p>
                    <p> введені в обіг після 2009 рр.;</p>
                  </div>
                </li>
                <li>
                  <div
                    className={s.li_icon}
                    dangerouslySetInnerHTML={{ __html: currencies.iconInfo }}
                  />
                  <div className={s.text}>
                    <span>USD</span>
                    <div className={s.curr_age}>
                      <Image
                        src={currencies.iconAgeOld.url}
                        alt={currencies.iconAgeOld.alt}
                        width={25}
                        height={25}
                      />
                    </div>

                    <p>- старіші доларові купюри,</p>
                    <p> 2000-2006 рр.;</p>
                  </div>
                </li>
                <li>
                  <div
                    className={s.li_icon}
                    dangerouslySetInnerHTML={{ __html: currencies.iconInfo }}
                  />
                  <div className={s.text}>
                    <p>Від 10000 у.о. курс уточнюйте індивідуально у менеджера.</p>
                  </div>
                </li>
              </ul>
            </div>
            <div className={s.container_second}>
              <h3>По оптовому курсу ми приймаємо лише:</h3>
              <ul>
                <li className={s.text}>
                  <div className={s.icon_currencies}>
                    <Image src={iconUSD} alt={'USD'} width={25} height={25} />
                  </div>
                  <p>
                    $ 100 доларові купюри, від 2000р випуску, без потерностей, печаток чи інших
                    маркувань та без пошкоджень;
                  </p>
                </li>
                <li className={s.text}>
                  <div className={s.icon_currencies}>
                    <Image src={iconEUR} alt={'EUR'} width={25} height={25} />
                  </div>
                  <p>€ лише купюри 50, 100, 200, 500 без значних дефектів</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
