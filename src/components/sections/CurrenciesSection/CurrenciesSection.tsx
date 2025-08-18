'use client'
import s from './CurrenciesSection.module.css'
import { currencies } from '@/config/currencies.config'
import BtnSwitcher from '@/components/layout/BtnSwitcher/BtnSwitcher'
import { useEffect, useState } from 'react'
import { CurrencyRateItem, CurrUAN } from '@/props/CurrenciesProps'
import Image from 'next/image'
import BtnExchange from '@/components/layout/BtnExchange/BtnExchange'

function formatDateToShort(dateString: string): string {
  const date = new Date(dateString)
  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0') // місяці з 0
  const year = String(date.getFullYear()).slice(-2) // останні 2 цифри

  return `${day}.${month}.${year}`
}

export default function CurrenciesSection({ block }: { block: any }) {
  const countCurrencies: number = 1
  const [activeFiat, setActiveFiat] = useState(true)
  const [activeCrypto, setActiveCrypto] = useState(false)
  const [seeAll, setSeeAll] = useState(false)
  const [lastUpdate, setLastUpdate] = useState('')


  const currUAN: CurrUAN = block.find((item: any) => item.code === 'UAN').ratesByCurrency
  const iconUSD: string = block.find((item: any) => item.code === 'USD').icon.url
  const iconEUR: string = block.find((item: any) => item.code === 'EUR').icon.url

  const filteredCurrencies = currUAN.filter(item => {
    if (activeFiat) return item.currency.cat_type === 'fiat'
    if (activeCrypto) return item.currency.cat_type === 'crypto'
    return true // fallback: показати всі
  })

  const visibleCurrencies = seeAll
    ? filteredCurrencies.slice(0, countCurrencies)
    : filteredCurrencies

  useEffect(() => {
    if (currUAN.length === 0) return

    const latest = currUAN
      .map(item => new Date(item.currency.updatedAt))
      .reduce((max, curr) => (curr > max ? curr : max))

    const formatted = formatDateToShort(latest.toISOString())
    setLastUpdate(formatted)
  }, [currUAN])

  return (
    <>
      <section className={s.currencies_section} id={'courses'}>
        <div className={s.currencies_header}>
          <h3>Актуальний курс валют</h3>
          <div
            className={s.currencies_icon}
            dangerouslySetInnerHTML={{ __html: currencies.iconMain }}
          />
          <div className={s.calc_header}>
            <BtnSwitcher
              content={'Фіат'}
              active={activeFiat}
              func={() => {
                setActiveCrypto(!activeCrypto)
                setActiveFiat(!activeFiat)
              }}
            />
            <BtnSwitcher
              content={'Криптовалюта'}
              active={activeCrypto}
              func={() => {
                setActiveCrypto(!activeCrypto)
                setActiveFiat(!activeFiat)
              }}
            />
          </div>
        </div>
        <div className={s.currencies_table_container}>
          <div className={s.currencies_table}>
            <div className={s.table_head}>
              <div className={s.head_1}>
                <div className={s.head_item}>Валюта</div>
                <div className={s.head_item}>Купівля</div>
                <div className={s.head_item}>Продаж</div>
                <div className={s.head_item}>Купівля</div>
                <div className={s.head_item}>Продаж</div>
                <div className={s.head_item}>Заявка на обмін</div>
              </div>
              <div className={s.head_2}>
                <div className={s.head_item_one}></div>
                <div className={s.head_item_two}>
                  {activeFiat ? currencies.text.fiat.fist : currencies.text.crypto.fist}
                </div>
                <div className={s.head_item_two}>
                  {activeFiat ? currencies.text.fiat.second : currencies.text.crypto.second}
                </div>
                <div className={s.head_item_one}></div>
              </div>
            </div>
            {visibleCurrencies.map((item: CurrencyRateItem) => (
              <div key={item.id} className={s.body_line}>
                <div className={s.body_item}>
                  <div className={s.icon_currencies}>
                    <Image
                      src={item.currency.icon.url}
                      alt={item.currency.icon.alt}
                      width={100}
                      height={100}
                    />
                  </div>
                  {item.currency.code}
                  <div className={s.curr_age}>
                    {item.currency.cat_date === 'new' ? (
                      <Image src={currencies.iconAgeNew.url} alt={currencies.iconAgeNew.alt} />
                    ) : item.currency.cat_date === 'old' ? (
                      <Image src={currencies.iconAgeOld.url} alt={currencies.iconAgeOld.alt} />
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
                <div className={s.body_item}>{item.from_1000?.buy1000 ?? '—'}</div>
                <div className={s.body_item}>{item.from_1000?.sell1000 ?? '—'}</div>
                <div className={s.body_item}>{item.from_5000?.buy5000 ?? '—'}</div>
                <div className={s.body_item}>{item.from_5000?.sell5000 ?? '—'}</div>
                <div className={s.body_item}>
                  <BtnExchange />
                </div>
              </div>
            ))}
          </div>
          <div className={s.currencies_table_footer}>
            <div className={s.btn_see_all} onClick={() => setSeeAll(!seeAll)}>
              <span>{seeAll ? currencies.seeAll.text : currencies.seeSome.text}</span>

              <div
                dangerouslySetInnerHTML={{
                  __html: seeAll ? currencies.seeAll.icon : currencies.seeSome.icon,
                }}
              />
            </div>
            <div className={s.status_update}>
              <div dangerouslySetInnerHTML={{ __html: currencies.iconStatus }} />
              <span>Оновлено {lastUpdate}</span>
            </div>
          </div>
        </div>
        <div className={s.currencies_footer}>
          <div className={s.footer_first}>
            <h3>Зверніть увагу!</h3>
            <div dangerouslySetInnerHTML={{ __html: currencies.iconFooter }} />
          </div>
          <div className={s.footer_second}>
            <h3>Пояснення до таблиці:</h3>
            <ul>
              <li>
                <div dangerouslySetInnerHTML={{ __html: currencies.iconInfo }} />
                <span>USD</span>
                <Image
                  src={currencies.iconAgeNew.url}
                  alt={currencies.iconAgeNew.alt}
                  width={25}
                  height={25}
                />
                <p> - нові доларові купюри, введені в обіг після 2009 рр.;</p>
              </li>
              <li>
                <div dangerouslySetInnerHTML={{ __html: currencies.iconInfo }} />
                <span>USD</span>
                <Image
                  src={currencies.iconAgeOld.url}
                  alt={currencies.iconAgeOld.alt}
                  width={25}
                  height={25}
                />
                <p>- старіші доларові купюри, 2000-2006 рр.;</p>
              </li>
              <li>
                <div dangerouslySetInnerHTML={{ __html: currencies.iconInfo }} />
                <span>USD</span>
                <p>Від 10000 у.о. курс уточнюйте індивідуально у менеджера.</p>
              </li>
            </ul>
          </div>
          <div className={s.footer_second}>
            <h3>Пояснення до таблиці:</h3>
            <ul>
              <li>
                <div className={s.icon_currencies}>
                  <Image src={iconUSD} alt={'USD'} width={25} height={25} />
                </div>
                <p>
                  $ 100 доларові купюри, від 2000р випуску, без потерностей, печаток чи інших
                  маркувань та без пошкоджень;
                </p>
              </li>
              <li>
                <div className={s.icon_currencies}>
                  <Image src={iconEUR} alt={'EUR'} width={25} height={25} />
                </div>
                <p>€ лише купюри 50, 100, 200, 500 без значних дефектів</p>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </>
  )
}
