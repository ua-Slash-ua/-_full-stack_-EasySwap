'use client'
import { useEffect, useState, useRef } from 'react'
import Image from 'next/image'
import s from './SelectCurrencies.module.css'

type CurrencyIcon = {
  url: string
  alt: string
}

type Currency = {
  code: string
  name?: string
  icon: CurrencyIcon
  ratesByCurrency?: RateItem[]
  cat_date?: 'standard' | 'new' | 'old'
}

type RateItem = {
  currency: Currency
  from_1000?: {
    sell1000?: number
  }
}

type SelectCurrenciesProps = {
  currency: Currency[]
  currCode: { code: string; isAge: string }
  currCodeExc: { code: string; isAge: string }
  changeCurrCode: Function | null
  changeCurrCount: Function | null
  changeCurrCodeExc: Function | null
}

export default function SelectCurrencies({
                                           currency,
                                           changeCurrCode,
                                           changeCurrCount,
                                           currCode,
                                           currCodeExc,
                                           changeCurrCodeExc,
                                         }: SelectCurrenciesProps) {
  const defaultCurrency: Currency = {
    code: 'UAN',
    icon: { url: '/api/media/file/Vector%20(10).svg', alt: 'USD' },
  }

  const [selectedCurrency, setSelectedCurrency] = useState<Currency>(defaultCurrency)
  const [active, setActive] = useState(false)
  const containerRef = useRef<HTMLDivElement | null>(null)

  // Закриття при кліку поза контейнером
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setActive(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  useEffect(() => {
    if (changeCurrCode) {
      const findCurren = currency.find(item => item.code === currCode.code)
      if (findCurren) {
        // console.log('currCode.code is found', currCode.code)
        setSelectedCurrency({
          code: findCurren.name!.trim(),
          icon: findCurren.icon,
        })
        if(findCurren.code !== currCode.code){
          changeCurrCode(findCurren.code, findCurren.cat_date)
        }

      }
      else

      if (currency.length > 0) {
        // console.log('Take 1-st element')
        setSelectedCurrency({ icon: currency[0].icon, code: currency[0].name!.trim() })
        if (currency[0].code !== currCode.code) {
          changeCurrCode(currency[0].code, currency[0].cat_date)
        }
      } else {
        // console.log('Default currency')
        setSelectedCurrency(defaultCurrency)
      }
    } else {

      const found = currency.find(item => item.code === currCode.code)
      const firstRate = found?.ratesByCurrency?.[0]
      const itemCurrExc = found?.ratesByCurrency?.find(
        item => item.currency.code === currCodeExc.code,
      )
      if (itemCurrExc) {
        setSelectedCurrency({
          code: itemCurrExc.currency.name!.trim(),
          icon: itemCurrExc.currency.icon,
        })

        if (currCodeExc.code == itemCurrExc.currency.code ){
          const el  = found?.ratesByCurrency?.find((item)=>{
            return item.currency.code === currCodeExc.code
          })
          changeCurrCount?.(el?.from_1000?.sell1000)
        }
        // console.log('Take element  currCode = ', itemCurrExc.currency)
      } else if (firstRate?.currency && firstRate?.from_1000?.sell1000) {
        setSelectedCurrency({
          code: firstRate.currency.name!.trim(),
          icon: firstRate.currency.icon,
        })

        if (firstRate?.currency.code && firstRate?.currency.code !== currCodeExc.code) {
          changeCurrCodeExc?.(firstRate.currency.code, firstRate.currency.cat_date)
          changeCurrCount?.(firstRate?.from_1000?.sell1000)
        }
        firstRate?.from_1000?.sell1000
        // console.log('Take 1-st element with currCode = ', firstRate.currency)
      } else {
        // console.log('Def')
        setSelectedCurrency(defaultCurrency)
      }
    }
  }, [currency,currCode])

  const handleSelect = (item: Currency | RateItem) => {
    const code = changeCurrCode ? (item as Currency).code : (item as RateItem).currency.code?.trim()
    const isAge = changeCurrCode ? (item as Currency).cat_date : (item as RateItem).currency.cat_date?.trim()
    setSelectedCurrency(changeCurrCode ? (item as Currency) : (item as RateItem).currency)
    setActive(false)
    changeCurrCode?.(code,isAge)

    changeCurrCodeExc?.((item as RateItem).currency.code, (item as RateItem).currency.cat_date)
    changeCurrCount?.((item as RateItem).from_1000!.sell1000)
  }

  return (
    <div className={s.select_container} ref={containerRef}>
      <div className={s.select} onClick={() => setActive(!active)}>
        <div className={s.info}>
          <div className={s.icon_back}>
            <Image
              src={selectedCurrency.icon.url}
              alt={selectedCurrency.icon.alt}
              width={24}
              height={12}
            />
          </div>
          <span className={s.choose_code}>{selectedCurrency.code.trim()}</span>
        </div>
        <svg
          className={`${s.btn_arrow} ${active ? s.rotate : ''}`}
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 12"
          fill="none"
        >
          <g clipPath="url(#clip0_767_2997)">
            <path
              d="M17.4178 2.45199L18.4778 3.51299L12.7008 9.29199C12.6082 9.38514 12.4982 9.45907 12.3769 9.50952C12.2557 9.55997 12.1256 9.58594 11.9943 9.58594C11.863 9.58594 11.733 9.55997 11.6117 9.50952C11.4905 9.45907 11.3804 9.38514 11.2878 9.29199L5.50781 3.51299L6.56781 2.45299L11.9928 7.87699L17.4178 2.45199Z"
              fill="white"
            />
          </g>
          <defs>
            <clipPath id="clip0_767_2997">
              <rect width="12" height="24" fill="white" transform="matrix(0 1 -1 0 24 0)" />
            </clipPath>
          </defs>
        </svg>
      </div>

      {active && (
        <ul className={s.select_options}>
          {changeCurrCode ? (
            currency.map((item, index) => {
              return (
                <li key={item.code.trim() + index} onClick={() => handleSelect(item)} className={s.li}>
                  <div className={s.icon_back_reverse}>
                    <Image src={item.icon.url} alt={item.icon.alt} width={24} height={12} />
                  </div>
                  <span >{item.name?.trim()}</span>
                </li>
              )
            })
          ) : !changeCurrCode && currency.length > 0 ? (
            currency
              .find(item => item.code === currCode.code)
              ?.ratesByCurrency?.map((item: RateItem, index) => {
              return (
                <li key={item.currency.code.trim() + index} onClick={() => handleSelect(item)}>
                  <div className={s.icon_back_reverse}>
                    <Image
                      src={item.currency.icon.url}
                      alt={item.currency.icon.alt}
                      width={24}
                      height={12}
                    />
                  </div>
                  <span>{item.currency.name?.trim()}</span>
                </li>
              )
            })
          ) : (
            <p>Немає для обміну2!</p>
          )}
        </ul>
      )}
    </div>
  )
}