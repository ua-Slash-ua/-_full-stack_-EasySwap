'use client'
import s from './CurrenciesSection.module.css'
import { currencies } from '@/config/currencies.config'
import BtnSwitcher from '@/components/layout/BtnSwitcher/BtnSwitcher'
import { useEffect, useState } from 'react'
import { CurrencyMeta, RateByCurrency } from '@/props/CurrenciesProps'
import Image from 'next/image'
import BtnExchange from '@/components/layout/BtnExchange/BtnExchange'
import { usePopup } from '@/context/PopupContext'

function formatDateToShort(dateString: string): string {
  const date = new Date(dateString)
  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0') // місяці з 0
  const year = String(date.getFullYear()).slice(-2) // останні 2 цифри

  return `${day}.${month}.${year}`
}

export default function CurrenciesSection({ block }: { block: CurrencyMeta[] }) {
  const countCurrencies: number = 1
  const [width, setWidth] = useState<number>(0)

  const [activeFiat, setActiveFiat] = useState(true)
  const [activeCrypto, setActiveCrypto] = useState(false)
  const constSeeAll = width > 1024

  const [seeAll, setSeeAll] = useState(constSeeAll)
  const [column, setColumn] = useState<{ left: boolean; right: boolean }>({
    left: true,
    right: false,
  })

  function handleColumn(left: boolean, right?: boolean) {
    right = right ?? !left
    setColumn({
      left: left,
      right: right,
    })
  }

  function handleSeAll(seAll: boolean) {
    setSeeAll(seAll)
  }

  const [lastUpdate, setLastUpdate] = useState('')

  // const currUAN: CurrUAN = block.find((item: any) => item.code === 'UAN').ratesByCurrency
  const iconUSD: string = block.find((item: CurrencyMeta) => item.code === 'USD')!.icon.url
  const iconEUR: string = block.find((item: CurrencyMeta) => item.code === 'EUR')!.icon.url

  const filteredCurrencies = block.filter(item => {
    if (activeFiat) return item.cat_type === 'fiat'
    if (activeCrypto) return item.cat_type === 'crypto'
    return true // fallback: показати всі
  })

  const visibleCurrencies = seeAll
    ? filteredCurrencies.slice(0, countCurrencies)
    : filteredCurrencies

  useEffect(() => {
    if (block.length === 0) return

    const latest = block
      .map(item => new Date(item.updatedAt))
      .reduce((max, curr) => (curr > max ? curr : max))

    const formatted = formatDateToShort(latest.toISOString())
    setLastUpdate(formatted)
  }, [block])
  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth / 4)
    handleResize() // виставляємо ширину одразу після маунту

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])
  return (
    <>
      <section className={s.currencies_section} id={'courses'}>
        <div className={s.currencies_header}>
          <h3>Актуальний курс валют</h3>
          {width > 376 && (
            <div
              className={s.currencies_icon}
              dangerouslySetInnerHTML={{ __html: currencies.iconMain }}
            />
          )}
          <div className={s.calc_header}>
            <BtnSwitcher
              content={'Фіат'}
              active={activeFiat}
              func={() => {
                setActiveCrypto(false)
                setActiveFiat(true)
              }}
            />
            <BtnSwitcher
              content={'Криптовалюта'}
              active={activeCrypto}
              func={() => {
                setActiveCrypto(true)
                setActiveFiat(false)
              }}
            />
          </div>
        </div>
        <div className={s.currencies_table_container}>
          {width >= 1024 ? (
            <>
              <div className={s.currencies_table}>
                <div className={s.table_head}>
                  <div className={s.head_1}>
                    <div
                      className={`${s.head_item} ${s.border_gradient_vertical} ${s.border_gradient_bottom_left}`}
                    >
                      Валюта
                    </div>
                    <div className={`${s.head_item} ${s.border_gradient_vertical}`}>Купівля</div>
                    <div className={`${s.head_item} ${s.border_gradient_vertical}`}>Продаж</div>
                    <div className={`${s.head_item} ${s.border_gradient_vertical}`}>Купівля</div>
                    <div className={`${s.head_item} ${s.border_gradient_vertical}`}>Продаж</div>
                    <div
                      className={`${s.head_item} ${s.border_gradient_vertical} ${s.border_gradient_bottom}`}
                    >
                      Заявка на обмін
                    </div>
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
                {visibleCurrencies.map(
                  (item: CurrencyMeta) =>
                    item.name !== 'UAN' && (
                      <div key={item.id} className={s.body_line}>
                        <div className={s.body_item}>
                          <div className={s.icon_currencies}>
                            <Image
                              src={item.icon.url}
                              alt={item.icon.alt}
                              width={100}
                              height={100}
                            />
                          </div>
                          {item.code}
                          <div className={s.curr_age}>
                            {item.cat_date === 'new' ? (
                              <Image
                                src={currencies.iconAgeNew.url}
                                alt={currencies.iconAgeNew.alt}
                              />
                            ) : item.cat_date === 'old' ? (
                              <Image
                                src={currencies.iconAgeOld.url}
                                alt={currencies.iconAgeOld.alt}
                              />
                            ) : (
                              <></>
                            )}
                          </div>
                        </div>
                        {item.ratesByCurrency.map(
                          (curr: RateByCurrency, index) =>
                            curr.currency.code === 'UAN' && <TableLine key={index} curr={curr} />,
                        )}
                      </div>
                    ),
                )}
              </div>
              <div className={s.currencies_table_footer}>
                <div className={s.btn_see_all} onClick={() => setSeeAll(!seeAll)}>
                  <span>{seeAll ? currencies.seeAll.text : currencies.seeSome.text}</span>

                  <div
                    className={s.see}
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
            </>
          ) : (
            <CurrencyTableMobile
              icons={[iconUSD, iconEUR]}
              isLeft={column}
              activeFiat={activeFiat}
              visibleCurrencies={visibleCurrencies}
              handlerColumn={handleColumn}
              seeAll={seeAll}
              handlerSeeAll={handleSeAll}
              lastUpdate={lastUpdate}
            />
          )}
        </div>
        {width >= 1024 ? (
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
                  <div className={s.curr_age}>
                    <Image
                      src={currencies.iconAgeNew.url}
                      alt={currencies.iconAgeNew.alt}
                      width={25}
                      height={25}
                    />
                  </div>

                  <p> - нові доларові купюри, введені в обіг після 2009 рр.;</p>
                </li>
                <li>
                  <div dangerouslySetInnerHTML={{ __html: currencies.iconInfo }} />
                  <span>USD</span>
                  <div className={s.curr_age}>
                    <Image
                      src={currencies.iconAgeOld.url}
                      alt={currencies.iconAgeOld.alt}
                      width={25}
                      height={25}
                    />
                  </div>

                  <p>- старіші доларові купюри, 2000-2006 рр.;</p>
                </li>
                <li>
                  <div dangerouslySetInnerHTML={{ __html: currencies.iconInfo }} />
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
        ) : null}
      </section>
    </>
  )
}

function TableLine({
  curr,
  isLeft,
  mobile = false,
}: {
  curr: RateByCurrency
  isLeft?: {
    left: boolean
    right: boolean
  }
  mobile?: boolean
}) {
  return (
    <>
      {mobile ? (
        isLeft?.left ? (
          <>
            <div className={s.table_item}>{curr.from_1000?.buy1000 ?? '—'}</div>
            <div className={s.table_item}>{curr.from_1000?.sell1000 ?? '—'}</div>
          </>
        ) : (
          <>
            <div className={s.table_item}>{curr.from_5000?.buy5000 ?? '—'}</div>
            <div className={s.table_item}>{curr.from_5000?.sell5000 ?? '—'}</div>
          </>
        )
      ) : (
        <>
          <div className={s.body_item}>{curr.from_1000?.buy1000 ?? '—'}</div>
          <div className={s.body_item}>{curr.from_1000?.sell1000 ?? '—'}</div>
          <div className={s.body_item}>{curr.from_5000?.buy5000 ?? '—'}</div>
          <div className={s.body_item}>{curr.from_5000?.sell5000 ?? '—'}</div>
          <div className={s.body_item}>
            <BtnExchange />
          </div>
        </>
      )}
    </>
  )
}

function CurrencyTableMobile({
  icons,
  isLeft,
  activeFiat,
  handlerColumn,
  visibleCurrencies,
  seeAll,
  lastUpdate,
  handlerSeeAll,
}: {
  icons: string[]
  isLeft: {
    left: boolean
    right: boolean
  }
  visibleCurrencies: any[]
  seeAll: boolean
  activeFiat?: boolean
  handlerSeeAll: Function
  handlerColumn: Function
  lastUpdate: string
}) {
  const { setOpen } = usePopup()
  const [textHeader, setTextHeader] = useState<string>(currencies.text.fiat.fist)
  useEffect(() => {
    if (activeFiat) {
      if (isLeft.left) {
        setTextHeader(currencies.text.fiat.fist)
      } else {
        setTextHeader(currencies.text.fiat.second)
      }
    } else {
      if (isLeft.right) {
        setTextHeader(currencies.text.crypto.second)
      } else {
        setTextHeader(currencies.text.crypto.fist)
      }
    }
  }, [activeFiat, isLeft.left])
  return (
    <>
      <div className={s.currencies_table}>
        <div className={s.table_header}>
          <div className={s.table_head_1}>
            <span>{textHeader}</span>
            <div className={s.head_switch}>
              <div
                className={`${s.arrow} ${isLeft.right ? s.active : ''}`}
                onClick={() => {
                  handlerColumn(true, false)
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="8"
                  height="16"
                  viewBox="0 0 8 16"
                  fill="none"
                >
                  <path
                    d="M8 14.2741L6.8102 15.5L0.329635 8.81881C0.225172 8.71176 0.142269 8.58445 0.0856964 8.44422C0.0291242 8.304 0 8.15362 0 8.00174C0 7.84985 0.0291242 7.69947 0.0856964 7.55925C0.142269 7.41902 0.225172 7.29171 0.329635 7.18466L6.8102 0.5L7.99888 1.72591L1.91641 8L8 14.2741Z"
                    fill="white"
                    fillOpacity="0.2"
                  />
                </svg>
              </div>
              <div
                className={`${s.arrow} ${isLeft.left ? s.active : ''}`}
                onClick={() => {
                  handlerColumn(false, true)
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="8"
                  height="16"
                  viewBox="0 0 8 16"
                  fill="none"
                >
                  <path
                    d="M0 1.72591L1.1898 0.5L7.67036 7.18119C7.77483 7.28824 7.85773 7.41555 7.9143 7.55578C7.97088 7.696 8 7.84638 8 7.99826C8 8.15015 7.97088 8.30053 7.9143 8.44075C7.85773 8.58098 7.77483 8.70829 7.67036 8.81534L1.1898 15.5L0.00112152 14.2741L6.08359 8L0 1.72591Z"
                    fill="white"
                    fillOpacity="0.2"
                  />
                </svg>
              </div>
            </div>
          </div>
          <div className={s.table_head_2}>
            <div className={s.table_item}>Валюта</div>
            <div className={s.table_item}>Купівля</div>
            <div className={s.table_item}>Продаж</div>
          </div>
        </div>
        <div className={s.table_body}>
          {visibleCurrencies.map(
            (item: CurrencyMeta) =>
              item.name !== 'UAN' && (
                <div key={item.id} className={s.table_body_line}>
                  <div className={s.table_item}>
                    <div className={s.icon_currencies}>
                      <Image src={item.icon.url} alt={item.icon.alt} width={100} height={100} />
                    </div>
                    {item.code}
                    <div className={s.curr_age}>
                      {item.cat_date === 'new' ? (
                        <Image src={currencies.iconAgeNew.url} alt={currencies.iconAgeNew.alt} />
                      ) : item.cat_date === 'old' ? (
                        <Image src={currencies.iconAgeOld.url} alt={currencies.iconAgeOld.alt} />
                      ) : (
                        <></>
                      )}
                    </div>
                  </div>
                  {item.ratesByCurrency.map(
                    (curr: RateByCurrency, index) =>
                      curr.currency.code === 'UAN' && (
                        <TableLine key={index} curr={curr} mobile={true} isLeft={isLeft} />
                      ),
                  )}
                </div>
              ),
          )}
        </div>
        <div className={s.table_footer}>
          <div className={s.btn_details} onClick={() => setOpen('currencies_info',{iconUSD:icons[0], iconEUR:icons[1]})}>
            <span>Деталі обміну</span>
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
              >
                <rect
                  x="0.664062"
                  y="0.667969"
                  width="16.6667"
                  height="16.6667"
                  rx="8.33333"
                  stroke="#0D0D0D"
                />
                <path
                  d="M6.5 9H11.5"
                  stroke="#0D0D0D"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M9 6.5L9 11.5"
                  stroke="#0D0D0D"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>

          <div className={s.status_update}>
            <div dangerouslySetInnerHTML={{ __html: currencies.iconStatus }} />
            <span>{lastUpdate}</span>
          </div>
        </div>
      </div>
    </>
  )
}
