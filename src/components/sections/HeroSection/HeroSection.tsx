'use client'
import AnimateTitle from '@/components/AnimateTitle/AnimateTitle'
import BtnSwitcher from '@/components/layout/BtnSwitcher/BtnSwitcher'
import NewExchanger from '@/components/NewExchanger/NewExchanger'
import HeroItem from '@/components/sections/HeroSection/HeroItem/HeroItem'
import { currencies as currenciesData } from '@/config/currencies.config'
import { heroItem } from '@/config/heroItem.config'
import { usePopup } from '@/context/PopupContext'
import {
  calculateCrossRate,
  canExchange,
} from '@/plugin/sl_SimpleTableCurrenciesRates/helpers/calculateCrossRate'
import { CurrencyMeta } from '@/props/CurrenciesProps'
import { motion } from 'framer-motion'
import Image from 'next/image'
import icon_2 from 'public/hero/euro.png'
import back from 'public/hero/Hero_bg.png'
import back_mob from 'public/hero/hero_mob.svg'
import icon_1 from 'public/hero/return.png'
import { useEffect, useState } from 'react'
import s from './HeroSection.module.css'

export default function HeroSection({ block, departments }: { block: any[]; departments: any[] }) {
  const { setOpen } = usePopup()
  const [activeFiat, setActiveFiat] = useState(true)
  const [activeCrypto, setActiveCrypto] = useState(false)
  const [currencyCode, setCurrencyCode] = useState<{
    currency: string
    course: string
    currencyId?: string
    courseId?: string
  }>({
    currency: 'USD ',
    course: 'UAN',
  })

  const [currencyValues, setCurrencyValues] = useState<{ up: number; down: number }>({
    up: 0,
    down: 0,
  })
  const [currencies, setCurrencies] = useState<CurrencyMeta[]>(
    filterByCategory(block)
  )
  const [currencyAge, setCurrencyAge] = useState<{ currency: string; course: string }>(() => {
    const currencyAge: CurrencyMeta = getCurrency(currencies, currencyCode.currency)
    const courseAge: CurrencyMeta = getCurrency(currencies, currencyCode.course)

    return {
      currency: currencyAge.cat_date,
      course: courseAge.cat_date,
    }
  })
  const [multiples, setMultiples] = useState<{
    first: { buy: number | string; sell: number | string }
    second: { buy: number | string; sell: number | string }
  }>({
    first: { buy: 1, sell: 1 },
    second: { buy: 1, sell: 1 },
  })

  useEffect(() => {
    const filtered = filterByCategory(block)
    setCurrencies(filtered)
  }, [block, activeFiat, activeCrypto])


  function filterByCategory(block: CurrencyMeta[]): CurrencyMeta[] {
    return block.filter(item => {
      // Фільтр по категорії
      if (activeFiat && item.cat_type !== 'fiat') return false;
      if (activeCrypto && item.cat_type !== 'crypto') return false;

      // Фільтр по viewed
      return item.viewed;


    });
  }


  function handleCurrencyValues(isMain: boolean, value: number) {
    const multiple = value >= 5000 ? multiples.second : multiples.first

    if (isMain) {
      setCurrencyValues({
        up: value,
        down: Math.round(value * changeBuyOrSell(multiple) * 100) / 100, // округлено до 2 знаків
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
      down: Math.round(currencyValues.up * changeBuyOrSell(multiple) * 100) / 100, // округлено до 2 знаків
    })
  }

  function handleCurrencyCode(
    currCodeOrId?: string,
    courseCodeOrId?: string,
    fromCurrencyObj?: CurrencyMeta,
    toCurrencyObj?: CurrencyMeta,
  ) {
    // Якщо передано об'єкт валюти - використовуємо його напряму
    let fromCurrency = fromCurrencyObj
    let toCurrency = toCurrencyObj

    // Якщо об'єкт не передано - шукаємо за id або code в block (повний список)
    if (!fromCurrency) {
      if (currCodeOrId) {
        fromCurrency =
          block.find(item => item.id === currCodeOrId) ??
          block.find(
            item => item.code?.trim().toUpperCase() === currCodeOrId.trim().toUpperCase(),
          ) ??
          block.find(
            item => item.code?.trim().toUpperCase() === currencyCode.currency.trim().toUpperCase(),
          )
      } else {
        fromCurrency = block.find(
          item => item.code?.trim().toUpperCase() === currencyCode.currency.trim().toUpperCase(),
        )
      }
    }

    if (!toCurrency) {
      if (courseCodeOrId) {
        toCurrency =
          block.find(item => item.id === courseCodeOrId) ??
          block.find(
            item => item.code?.trim().toUpperCase() === courseCodeOrId.trim().toUpperCase(),
          ) ??
          block.find(
            item => item.code?.trim().toUpperCase() === currencyCode.course.trim().toUpperCase(),
          ) ??
          block.find(item => item.code?.trim().toUpperCase() === 'UAN')
      } else {
        toCurrency =
          block.find(
            item => item.code?.trim().toUpperCase() === currencyCode.course.trim().toUpperCase(),
          ) ?? block.find(item => item.code?.trim().toUpperCase() === 'UAN')
      }
    }

    if (!fromCurrency || !toCurrency) {
      console.warn('Currency not found', {
        currCodeOrId,
        courseCodeOrId,
        fromCurrency,
        toCurrency,
        currentCurrencyCode: currencyCode,
        blockLength: block.length,
        currenciesLength: currencies.length,
        availableInBlock: block.map(c => ({ id: c.id, code: c.code })),
      })
      return
    }

    // Перевіряємо, чи не намагаються обміняти валюту саму на себе (з однаковим кодом та cat_date)
    if (
      fromCurrency.code?.trim().toUpperCase() === toCurrency.code?.trim().toUpperCase() &&
      fromCurrency.cat_date === toCurrency.cat_date
    ) {
      console.warn('Cannot exchange currency to itself', {
        fromCurrency: { code: fromCurrency.code, cat_date: fromCurrency.cat_date },
        toCurrency: { code: toCurrency.code, cat_date: toCurrency.cat_date },
      })
      return
    }

    const code = toCurrency.code

    setCurrencyCode({
      currency: fromCurrency.code,
      course: code,
      currencyId: fromCurrency.id,
      courseId: toCurrency.id,
    })
    handleMultiples(fromCurrency, toCurrency)
  }

  function handleMultiples(fromCurrency: any, toCurrency: any) {
    if (!fromCurrency || !toCurrency) {
      console.warn('Currency data not available', { fromCurrency, toCurrency })
      return
    }

    // Використовуємо calculateCrossRate для обчислення курсів
    // Для відображення: 1 одиниця fromCurrency = X одиниць toCurrency
    const amount = 1

    // Купівля від 1000
    const buy1000 = calculateCrossRate(fromCurrency, toCurrency, amount, 1000, true)
    const sell1000 = calculateCrossRate(fromCurrency, toCurrency, amount, 1000, false)

    // Купівля від 5000
    const buy5000 = calculateCrossRate(fromCurrency, toCurrency, amount, 5000, true)
    const sell5000 = calculateCrossRate(fromCurrency, toCurrency, amount, 5000, false)

    // Форматуємо значення: якщо < 1 - до 3 знаків, інакше до 2 знаків
    const formatRate = (value: number): number => {
      if (value <= 0) return 0
      // Якщо значення < 1 - обмежуємо до 3 знаків після коми
      if (value < 1) {
        return parseFloat(value.toFixed(3))
      }
      // Якщо значення >= 1 - обмежуємо до 2 знаків після коми
      return parseFloat(value.toFixed(2))
    }

    const first = {
      buy: buy1000 > 0 ? formatRate(buy1000) : 0,
      sell: sell1000 > 0 ? formatRate(sell1000) : 0,
    }
    const second = {
      buy: buy5000 > 0 ? formatRate(buy5000) : 0,
      sell: sell5000 > 0 ? formatRate(sell5000) : 0,
    }

    setMultiples({ first: first, second: second })
  }

  function reverseCurrency() {
    const { currency, course } = currencyCode

    // Знаходимо валюти у повному списку block
    const newFromCurrency = getCurrencyFull(block, currencies, course)
    const newToCurrency = getCurrencyFull(block, currencies, currency)

    if (!newFromCurrency || !newToCurrency) {
      console.error('Currency not found', { course, currency })
      return
    }

    // Перевіряємо, чи можна обміняти ці валюти
    // Використовуємо type assertion для сумісності типів
    if (!canExchange(newFromCurrency as any, newToCurrency as any)) {
      console.warn('Exchange not available', { from: newFromCurrency.code, to: newToCurrency.code })
      // Якщо не можна обміняти - використовуємо UAN як проміжну
      if (newFromCurrency.code !== 'UAN' && newToCurrency.code !== 'UAN') {
        const uanCurrency = currencies.find(item => item.code === 'UAN')
        if (uanCurrency) {
          setCurrencyCode({
            currency: newFromCurrency.code,
            course: 'UAN',
            currencyId: newFromCurrency.id,
            courseId: uanCurrency.id,
          })
          handleMultiples(newFromCurrency, uanCurrency)
          return
        }
      }
    }

    // Перемикаємо тип валюти якщо потрібно
    if (newFromCurrency.cat_type === 'fiat' && !activeFiat) {
      setActiveFiat(true)
      setActiveCrypto(false)
    } else if (newFromCurrency.cat_type === 'crypto' && !activeCrypto) {
      setActiveFiat(false)
      setActiveCrypto(true)
    }

    // Оновлюємо коди валют (міняємо місцями)
    setCurrencyCode({
      currency: newFromCurrency.code,
      course: newToCurrency.code,
      currencyId: newFromCurrency.id,
      courseId: newToCurrency.id,
    })

    // Оновлюємо множники
    handleMultiples(newFromCurrency, newToCurrency)
  }

  useEffect(() => {
    if (!currencies || currencies.length === 0) return
    const fromCurrency = getCurrency(currencies, currencyCode.currency.trim())
    const toCurrency =
      getCurrency(currencies, currencyCode.course.trim()) ??
      currencies.find(item => item.code === 'UAN')

    if (fromCurrency && toCurrency) {
      handleMultiples(fromCurrency, toCurrency)
    }
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
    setCurrencies(
      filterByCategory(block)
    )
  }, [setActiveFiat, setActiveCrypto, activeCrypto, activeFiat, block])
  useEffect(() => {
    if (!currencies || currencies.length === 0) return

    // Перевіряємо чи поточна валюта є в новому списку
    const currentCurrencyExists = currencies.find(
      item => item.code === currencyCode.currency.trim(),
    )

    if (!currentCurrencyExists) {
      // Якщо поточної валюти немає - встановлюємо першу доступну
      const firstCurrency = currencies[0]
      const uanCurrency = currencies.find(item => item.code === 'UAN') ?? currencies[0]

      setCurrencyCode({
        currency: firstCurrency.code,
        course: uanCurrency.code,
        currencyId: firstCurrency.id,
        courseId: uanCurrency.id,
      })

      handleMultiples(firstCurrency, uanCurrency)

      // Скидаємо значення
      setCurrencyValues({
        up: 0,
        down: 0,
      })
    }
  }, [currencies])

  // Автоматичний вибір першої доступної пари для криптовалюти
  useEffect(() => {
    // Знаходимо поточну валюту в block
    const fromCurrency = block.find(
      item => item.code?.trim().toUpperCase() === currencyCode.currency.trim().toUpperCase(),
    )

    // Якщо вибрана криптовалюта і course дорівнює currency (не встановлена пара)
    if (
      fromCurrency &&
      fromCurrency.cat_type === 'crypto' &&
      currencyCode.course.trim().toUpperCase() === currencyCode.currency.trim().toUpperCase()
    ) {
      // Знаходимо першу доступну валюту з exchangeableWith
      let firstAvailableCurrency: CurrencyMeta | null = null

      if (fromCurrency.exchangeableWith && fromCurrency.exchangeableWith.length > 0) {
        // Шукаємо першу валюту з exchangeableWith
        for (const exchangeableItem of fromCurrency.exchangeableWith) {
          const exchangeableId =
            typeof exchangeableItem === 'string'
              ? exchangeableItem
              : exchangeableItem.id || exchangeableItem.code
          const exchangeableCode =
            typeof exchangeableItem === 'string' ? null : exchangeableItem.code

          // Шукаємо валюту за ID або кодом
          const foundCurrency =
            block.find(item => item.id === exchangeableId) ??
            (exchangeableCode
              ? block.find(
                  item => item.code?.trim().toUpperCase() === exchangeableCode.trim().toUpperCase(),
                )
              : null)

          if (foundCurrency && foundCurrency.code !== fromCurrency.code) {
            firstAvailableCurrency = foundCurrency
            break
          }
        }
      }

      // Якщо не знайдено в exchangeableWith - використовуємо UAN
      if (!firstAvailableCurrency) {
        firstAvailableCurrency = block.find(item => item.code?.trim().toUpperCase() === 'UAN')
      }

      // Якщо знайдено доступну валюту - встановлюємо її
      if (firstAvailableCurrency) {
        setCurrencyCode({
          currency: fromCurrency.code,
          course: firstAvailableCurrency.code,
          currencyId: fromCurrency.id,
          courseId: firstAvailableCurrency.id,
        })
        handleMultiples(fromCurrency, firstAvailableCurrency)
      }
    }
  }, [currencyCode.currency, block])

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
            <div className={s.calc_content}>
              <NewExchanger
                isMain={true}
                handleCurrencyValues={handleCurrencyValues}
                handleCurrencyCode={handleCurrencyCode}
                currencyValues={currencyValues}
                currencies={currencies}
                currencyCode={currencyCode}
                multiples={multiples}
                content={
                  <div
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
                  </div>
                }
              />
              <NewExchanger
                isMain={false}
                handleCurrencyValues={handleCurrencyValues}
                handleCurrencyCode={handleCurrencyCode}
                currencyValues={currencyValues}
                currencies={(() => {
                  // Додаємо логування для діагностики
                  if (currencyCode.currency.trim().toUpperCase() === 'USDT') {
                    console.log('Looking for USDT in block:', {
                      blockLength: block.length,
                      currenciesInBlock: block.map(c => ({
                        code: c.code,
                        trimmedCode: c.code?.trim(),
                        id: c.id,
                        cat_type: c.cat_type,
                      })),
                      searchCode: currencyCode.currency.trim(),
                      allCryptoCurrencies: block
                        .filter(c => c.cat_type === 'crypto')
                        .map(c => ({ code: c.code, trimmed: c.code?.trim() })),
                    })
                  }

                  const filtered = block.filter(curr => {
                    // Знаходимо вихідну валюту в повному списку block (щоб включити всі валюти)
                    const searchCode = currencyCode.currency.trim()
                    // Шукаємо без урахування регістру та пробілів, але з урахуванням ID (якщо є в currencyCode)
                    let fromCurrency = null

                    // Якщо є currencyId - використовуємо його для точного пошуку
                    if (currencyCode.currencyId) {
                      fromCurrency = block.find(item => item.id === currencyCode.currencyId)
                    }

                    // Якщо не знайдено за ID - шукаємо за кодом
                    if (!fromCurrency) {
                      fromCurrency = block.find(
                        item => item.code?.trim().toUpperCase() === searchCode.toUpperCase(),
                      )
                    }

                    if (!fromCurrency) {
                      console.log('fromCurrency not found for:', searchCode, {
                        availableCodes: block.map(c => ({
                          code: c.code,
                          id: c.id,
                          cat_date: c.cat_date,
                          trimmed: c.code?.trim(),
                          upper: c.code?.trim().toUpperCase(),
                        })),
                      })
                      return false
                    }

                    // Не показуємо поточну валюту (порівнюємо за ID, якщо є, інакше за кодом та cat_date)
                    if (currencyCode.currencyId && curr.id === currencyCode.currencyId) {
                      return false
                    }
                    // Виключаємо валюти з однаковим кодом та cat_date (наприклад, старий долар на старий долар)
                    if (
                      curr.code?.trim().toUpperCase() === fromCurrency.code?.trim().toUpperCase() &&
                      curr.cat_date === fromCurrency.cat_date
                    ) {
                      return false
                    }

                    // Перевіряємо, чи можна обміняти
                    const canExchangeResult = canExchange(fromCurrency as any, curr as any)
                    if (!canExchangeResult) {
                      console.log(`Cannot exchange ${fromCurrency.code} -> ${curr.code}`, {
                        fromCurrency: {
                          code: fromCurrency.code,
                          cat_type: fromCurrency.cat_type,
                          exchangeableWith: fromCurrency.exchangeableWith,
                        },
                        toCurrency: {
                          code: curr.code,
                          id: curr.id,
                          cat_type: curr.cat_type,
                        },
                      })
                      return false
                    }

                    // Якщо активна вкладка "Фіат" - показуємо тільки фіатні валюти (окрім UAN, який доступний завжди)
                    if (activeFiat && !activeCrypto) {
                      if (curr.code === 'UAN') {
                        // UAN завжди доступний
                        return true
                      }
                      // Для фіатної вкладки показуємо тільки фіатні валюти
                      if (curr.cat_type !== 'fiat') return false
                    }

                    // Якщо активна вкладка "Криптовалюта"
                    if (activeCrypto && !activeFiat) {
                      // UAN завжди доступний
                      if (curr.code === 'UAN') {
                        return true
                      }
                      // Якщо вибрана криптовалюта - показуємо фіатні валюти з exchangeableWith
                      if (fromCurrency.cat_type === 'crypto') {
                        // Якщо це фіатна валюта і вона в exchangeableWith криптовалюти - показуємо
                        if (curr.cat_type === 'fiat') {
                          // canExchange вже перевірив exchangeableWith
                          return true
                        }
                        // Для крипто-вкладки також показуємо інші криптовалюти
                        if (curr.cat_type === 'crypto') {
                          return true
                        }
                      } else {
                        // Якщо вибрана фіатна валюта на крипто-вкладці - показуємо тільки криптовалюти
                        if (curr.cat_type !== 'crypto') return false
                      }
                    }

                    return true
                  })
                  console.log(
                    'Filtered currencies for',
                    currencyCode.currency.trim(),
                    ':',
                    filtered.length,
                    filtered.map(c => c.code),
                  )

                  // Якщо фільтрація повернула порожній масив - встановлюємо UAN як дефолтну валюту
                  if (filtered.length === 0 && currencyCode.course === currencyCode.currency) {
                    const uanCurrency = block.find(item => item.code?.trim() === 'UAN')
                    if (uanCurrency) {
                      // Викликаємо handleCurrencyCode асинхронно, щоб уникнути проблем з оновленням під час рендеру
                      setTimeout(() => {
                        handleCurrencyCode(
                          currencyCode.currency,
                          'UAN',
                          block.find(item => item.code?.trim() === currencyCode.currency.trim()),
                          uanCurrency,
                        )
                      }, 0)
                    }
                  }

                  return filtered
                })()}
                currencyCode={currencyCode}
                multiples={multiples}
              />

              <div className={s.calc_course}>
                <div className={s.calc_course_container}>
                  Курс: 1 <span>{currencyCode.currency}</span>
                  <div className={s.curr_age}>
                    {currencyAge?.currency === 'new' ? (
                      <Image
                        src={currenciesData.iconAgeNew.url}
                        alt={currenciesData.iconAgeNew.alt}
                      />
                    ) : currencyAge?.currency === 'old' ? (
                      <Image
                        src={currenciesData.iconAgeOld.url}
                        alt={currenciesData.iconAgeOld.alt}
                      />
                    ) : null}
                  </div>
                  ={' '}
                  <span>
                    {currencyValues.up >= 5000
                      ? changeBuyOrSell(multiples.second)
                      : changeBuyOrSell(multiples.first)}
                  </span>
                  <span>{currencyCode.course ?? '...'}</span>
                  <div className={s.curr_age}>
                    {currencyAge?.course === 'new' ? (
                      <Image
                        src={currenciesData.iconAgeNew.url}
                        alt={currenciesData.iconAgeNew.alt}
                      />
                    ) : currencyAge?.course === 'old' ? (
                      <Image
                        src={currenciesData.iconAgeOld.url}
                        alt={currenciesData.iconAgeOld.alt}
                      />
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
        <div className={`${s.phone_container} hide`}></div>
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

function changeBuyOrSell(value: { buy: number | string; sell: number | string }) {
  return value.buy as number
}
