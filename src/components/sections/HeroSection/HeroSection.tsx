'use client'
import s from './HeroSection.module.css'
import Image from 'next/image'
import back from 'public/hero/Hero_bg.png'
import back_mob from 'public/hero/hero_mob.svg'
import icon_1 from 'public/hero/return.png'
import icon_2 from 'public/hero/euro.png'
import HeroItem from '@/components/sections/HeroSection/HeroItem/HeroItem'
import { heroItem } from '@/config/heroItem.config'
import BtnSwitcher from '@/components/layout/BtnSwitcher/BtnSwitcher'
import { useEffect, useRef, useState } from 'react'
import { usePopup } from '@/context/PopupContext'
import { motion } from 'framer-motion'
import AnimateTitle from '@/components/AnimateTitle/AnimateTitle'
import NewExchanger from '@/components/NewExchanger/NewExchanger'
import { CurrencyMeta, RateByCurrency } from '@/props/CurrenciesProps'
import { currencies as currenciesData } from '@/config/currencies.config'

export default function HeroSection({ block, departments }: { block: any[]; departments: any[] }) {
  const { setOpen } = usePopup()
  const [activeFiat, setActiveFiat] = useState(true)
  const [activeCrypto, setActiveCrypto] = useState(false)
  const [currencyCode, setCurrencyCode] = useState<{ currency: string, course: string }>({
    currency: 'UAN',
    course: 'EUR',
  })

  const [currencyValues, setCurrencyValues] = useState<{ up: number, down: number }>({
    up: 0,
    down: 0,
  })
  const [currencies, setCurrencies] = useState<CurrencyMeta[]>(block.filter(item => {
    if (activeFiat) return item.cat_type === 'fiat'
    if (activeCrypto) return item.cat_type === 'crypto'
    return true
  }))
  const [currencyAge, setCurrencyAge] = useState<{ currency: string, course: string }>(() => {
      const currencyAge: CurrencyMeta = getCurrency(currencies, currencyCode.currency)
      const courseAge: CurrencyMeta = getCurrency(currencies, currencyCode.course)

      return {
        currency: currencyAge.cat_date,
        course: courseAge.cat_date,
      }
    },
  )
  const [multiples, setMultiples] = useState<{
    first: { buy: number | string, sell: number | string},
    second: { buy: number | string, sell: number | string}
  }>({
    first: { buy: 1, sell: 1 },
    second: { buy: 1, sell: 1 },
  })


  useEffect(() => {
    const filtered = block.filter(item => {
      if (activeFiat) return item.cat_type === 'fiat'
      if (activeCrypto) return item.cat_type === 'crypto'
      return true
    })
    setCurrencies(filtered)
  }, [block, activeFiat, activeCrypto])


  function handleCurrencyValues(isMain: boolean, value: number) {

    const multiple = value >= 5000 ? multiples.second : multiples.first

    if (isMain) {
      setCurrencyValues({
        up: value,
        down: Math.round((value * changeBuyOrSell(multiple)) * 100) / 100, // округлено до 2 знаків
      })
    } else {
      setCurrencyValues({
        up: Math.round((value / changeBuyOrSell(multiple)) * 100) / 100,
        down: value,
      })
    }
  }

  function handleUpdateValue() {
    const multiple = currencyValues.up >= 5000 ? multiples.second : multiples.first

    setCurrencyValues({
      up: currencyValues.up,
      down: Math.round((currencyValues.up * changeBuyOrSell(multiple)) * 100) / 100, // округлено до 2 знаків
    })
  }

  function handleCurrencyCode(currCode?: string, courseCode?: string) {
    const findRatest = currencies.find(item => item.code === currCode) ?? currencies.find(item => item.code === currencyCode.currency)
    const findRatestExc = findRatest?.ratesByCurrency.find(item => item.currency.code === courseCode)
      ?? findRatest?.ratesByCurrency.find(item => item.currency.code === currencyCode.course) ??
      findRatest?.ratesByCurrency[0]
    const code = courseCode ?? findRatestExc?.currency.code ?? currencyCode.course


    setCurrencyCode({
      currency: currCode ?? currencyCode.currency,
      course: code,
    })
    handleMultiples(findRatest?.ratesByCurrency.find((item) => item.currency.code === code)!)


  }

  function handleMultiples(currencyCoursers: RateByCurrency) {
    const first = {
      buy: currencyCoursers.from_1000?.buy1000 ?? 0,
      sell: currencyCoursers.from_1000?.sell1000 ?? 0,
    }
    const second = {
      buy: currencyCoursers.from_5000?.buy5000 ?? 0,
      sell: currencyCoursers.from_5000?.sell5000 ?? 0,
    }

    setMultiples({ first: first, second: second })

  }

  function reverseCurrency() {
    const { currency, course } = currencyCode

    // Знаходимо валюту course у повному списку block
    const newCurrency = getCurrencyFull(block, currencies, course)

    if (!newCurrency) {
      console.error('Currency not found:', course)
      return
    }

    // Знаходимо зворотній курс
    const newCourseObj = newCurrency.ratesByCurrency.find(
      item => item.currency.code === currency,
    )

    const newCourse = newCourseObj?.currency ?? newCurrency.ratesByCurrency[0]?.currency

    if (!newCourse) {
      console.error('Exchange rate not found')
      return
    }

    // Перемикаємо тип валюти якщо потрібно
    if (newCurrency.cat_type === 'fiat' && !activeFiat) {
      setActiveFiat(true)
      setActiveCrypto(false)
    } else if (newCurrency.cat_type === 'crypto' && !activeCrypto) {
      setActiveFiat(false)
      setActiveCrypto(true)
    }

    // Оновлюємо коди валют
    setCurrencyCode({
      currency: newCurrency.code,
      course: newCourse.code,
    })

    // ✅ ДОДАЙТЕ ЦЕЙ РЯДОК - оновлюємо множники!
    const newRateByCurrency = newCurrency.ratesByCurrency.find(
      item => item.currency.code === newCourse.code
    )

    if (newRateByCurrency) {
      handleMultiples(newRateByCurrency)
    }

    // Міняємо значення місцями
    // setCurrencyValues({
    //   up: currencyValues.down,
    //   down: currencyValues.up,
    // })
  }

  useEffect(() => {
    if (!currencies) return
    const currUAN: CurrencyMeta = getCurrency(currencies, 'UAN')
    const ratesByCurrency = currUAN.ratesByCurrency[0]

    handleCurrencyCode(currUAN.code, ratesByCurrency?.currency.code ?? '1')
    handleMultiples(ratesByCurrency)


  }, [])
  useEffect(() => {
    handleUpdateValue()
  }, [currencyCode])

  useEffect(() => {
    const currencyAge: CurrencyMeta = getCurrency(currencies, currencyCode.currency)
    const courseAge: CurrencyMeta = getCurrency(block, currencyCode.course)
    setCurrencyAge({
      currency: currencyAge.cat_date,
      course: courseAge.cat_date,
    })
  }, [currencyCode])
  useEffect(() => {

    setCurrencies(block.filter(item => {
      if (activeFiat) return item.cat_type === 'fiat'
      if (activeCrypto) return item.cat_type === 'crypto'
      return true
    }))
  }, [setActiveFiat, setActiveCrypto, activeCrypto, activeFiat, block])
  useEffect(() => {
    if (!currencies || currencies.length === 0) return

    // Перевіряємо чи поточна валюта є в новому списку
    const currentCurrencyExists = currencies.find(item => item.code === currencyCode.currency)

    if (!currentCurrencyExists) {
      // Якщо поточної валюти немає - встановлюємо першу доступну
      const firstCurrency = currencies[0]
      const firstRate = firstCurrency.ratesByCurrency[0]

      setCurrencyCode({
        currency: firstCurrency.code,
        course: firstRate?.currency.code ?? '',
      })

      handleMultiples(firstRate)

      // Скидаємо значення
      setCurrencyValues({
        up: 0,
        down: 0,
      })
    }
  }, [currencies])


  return (
    <>
      <section className={s.section_hero} id={'main'}>
        <div
          className={`${s.hero_main} hide`}
          style={{
            backgroundImage: `url(${back.src})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <motion.div
            className={s.hero_container}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'linear' }}
            viewport={{ once: false, amount: 0.2 }}
          >
            <div className={s.hero_header}>
              <p>
                <AnimateTitle tagName={'span'} text={'easy'} className={s.swap} />
                <AnimateTitle tagName={'span'} text={'swap'} delayCount={0.3} />

                {/*<span className={s.swap}>easy </span>*/}
                {/*swap*/}
              </p>
              <div className={s.hero_header_icons}>
                <Image src={icon_1} alt="Hero background" />
                <Image src={icon_2} alt="Hero background" />
              </div>
            </div>
            <div className={s.hero_description}>
              <AnimateTitle
                tagName={'p'}
                text={'- надійний помічник у валютних операціях'}
                delayCount={1}
              />
              {/*<p>- надійний помічник у валютних операціях</p>*/}
            </div>
          </motion.div>

          <div className={`${s.hero_items} hide`}>
            {heroItem.map((item, index) => {
              return (
                <HeroItem
                  key={index}
                  icon={item.icon}
                  title={item.title}
                  description={item.description}
                />
              )
            })}
          </div>
        </div>
        <aside className={s.hero_aside}>
          <div className={`${s.image_container} show`}>
            <Image src={back_mob.src} alt={'background'} width={100} height={100} />
            <div className={`${s.circle_mob} show`}></div>
            <div className={`${s.circle_mob_small} show`}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="126"
                viewBox="0 0 40 126"
                fill="none"
              >
                <foreignObject x="-20" y="-20" width="80" height="166">
                  <div
                    style={{
                      backdropFilter: 'blur(10px)',
                      clipPath: 'url(#bgblur_0_365_19385_clip_path)',
                      height: '100%',
                      width: '100%',
                    }}
                  />
                </foreignObject>

                <ellipse
                  data-figma-bg-blur-radius="20"
                  cx="20"
                  cy="63"
                  rx="20"
                  ry="63"
                  fill="#D9D9D9"
                  fillOpacity="0.01"
                />

                <defs>
                  <clipPath id="bgblur_0_365_19385_clip_path" transform="translate(20 20)">
                    <ellipse cx="20" cy="63" rx="20" ry="63" />
                  </clipPath>
                </defs>
              </svg>
            </div>
          </div>

          <div className={`${s.hero_container} show`}>
            <div className={s.hero_header}>
              <p>
                <span className={s.swap}>easy </span>
                swap
              </p>
              <div className={s.hero_header_icons}>
                <Image src={icon_1} alt="Hero background" />
                <Image src={icon_2} alt="Hero background" />
              </div>
            </div>
            <div className={s.hero_description}>
              <p>- надійний помічник у валютних операціях</p>
            </div>
          </div>
          <motion.div
            className={s.calculator}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut', delay: 0 }}
            // transition={{ duration: 0.5, ease: 'easeOut', delay: 1.2 }}
            viewport={{ once: false, amount: 0.2 }}
          >
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
            <div className={s.calc_content}
            >
              <NewExchanger
                isMain={true}
                handleCurrencyValues={handleCurrencyValues}
                handleCurrencyCode={handleCurrencyCode}
                currencyValues={currencyValues}
                currencies={currencies}
                currencyCode={currencyCode}
                multiples={multiples}
                content={<div
                  className={s.btn_replace}
                  onClick={() => {
                    reverseCurrency()
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                  >
                    <path
                      d="M9 15L5 19M5 19L1 15M5 19V1M19 5L15 1M15 1L11 5M15 1V19"
                      stroke="#09090A"
                      strokeWidth="2"
                      strokeMiterlimit="10"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>}

              />
              <NewExchanger
                isMain={false}
                handleCurrencyValues={handleCurrencyValues}
                handleCurrencyCode={handleCurrencyCode}
                currencyValues={currencyValues}
                currencies={currencies.find((item) => item.code === currencyCode.currency)?.ratesByCurrency!}
                currencyCode={currencyCode}
                multiples={multiples}

              />

              <div className={s.calc_course}>
                <div className={s.calc_course_container}>
                  Курс: 1 <span>{currencyCode.currency}</span>
                  <div className={s.curr_age}>
                    {currencyAge?.currency === 'new' ? (
                      <Image src={currenciesData.iconAgeNew.url} alt={currenciesData.iconAgeNew.alt} />
                    ) : currencyAge?.currency === 'old' ? (
                      <Image src={currenciesData.iconAgeOld.url} alt={currenciesData.iconAgeOld.alt} />
                    ) : null}
                  </div>

                  = <span>{currencyValues.up >= 5000 ? changeBuyOrSell(multiples.second) : changeBuyOrSell(multiples.first)}</span>
                  <span>{currencyCode.course ?? '...'}</span>
                  <div className={s.curr_age}>
                    {currencyAge?.course === 'new' ? (
                      <Image src={currenciesData.iconAgeNew.url} alt={currenciesData.iconAgeNew.alt} />
                    ) : currencyAge?.course === 'old' ? (
                      <Image src={currenciesData.iconAgeOld.url} alt={currenciesData.iconAgeOld.alt} />
                    ) : null}
                  </div>

                </div>
              </div>
            </div>
            <div
              className={s.btn_exchange}
              onClick={() => setOpen('exchange_application', departments)}
            >
              <span>Обміняти валюту</span>
            </div>
          </motion.div>
          <div className={`${s.hero_items} show`}>
            {heroItem.map((item, index) => {
              return (
                <HeroItem
                  key={index}
                  icon={item.icon}
                  title={item.title}
                  description={item.description}
                />
              )
            })}
          </div>
        </aside>
        <div className={`${s.phone_container} hide`}>

        </div>
        <div className={`${s.circle} hide`}></div>
      </section>
    </>
  )
}

function getCurrency(currencies: CurrencyMeta[], code: string) {
  return currencies.find(item => item.code === code) ?? currencies[0]
}

function getCurrencyFull(currenciesFull: CurrencyMeta[], currencies: CurrencyMeta[], code: string) {
  const findRatest = currencies.find(item => item.code === code)
  if (!findRatest) {
    const fullCurrency = currenciesFull.find(item => item.code === code)
    if (!fullCurrency) return currencies[0]

    return fullCurrency
  }
  return findRatest
}

function changeBuyOrSell(value: { buy: number | string, sell: number | string}) {
  return  value.buy as number
}

