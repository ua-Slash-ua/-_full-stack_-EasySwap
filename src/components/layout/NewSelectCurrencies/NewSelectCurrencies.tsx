'use client'
import { CurrencyMeta } from '@/props/CurrenciesProps'
import Image, { StaticImageData } from 'next/image'
import { useEffect, useRef, useState } from 'react'
import s from './NewSelectCurrencies.module.css'

export default function NewSelectCurrencies({
  isMain,
  currencies,
  currencyCode,
  handleCurrencyCode,
}: {
  currencies: CurrencyMeta[]
  isMain: boolean
  handleCurrencyCode: (
    currCodeOrId?: string,
    courseCodeOrId?: string,
    fromCurrencyObj?: CurrencyMeta,
    toCurrencyObj?: CurrencyMeta,
  )=>void
  currencyCode: { currency: string; course: string; currencyId?: string; courseId?: string }
}) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [active, setActive] = useState(false)
  // ВИПРАВЛЕННЯ: Додаємо перевірку на порожній масив та безпечну ініціалізацію
  const getInitialCurrency = () => {
    if (!currencies || currencies.length === 0) return null

    if (isMain) {
      // Шукаємо за ID, якщо є, інакше за кодом
      if (currencyCode.currencyId) {
        const found = (currencies as CurrencyMeta[]).find(
          item => item.id === currencyCode.currencyId,
        )
        if (found) return found
      }
      return (
        (currencies as CurrencyMeta[]).find(item => item.code === currencyCode.currency) ??
        (currencies as CurrencyMeta[])[0]
      )
    } else {
      // Шукаємо за ID, якщо є, інакше за кодом
      if (currencyCode.courseId) {
        const found = (currencies as CurrencyMeta[]).find(item => item.id === currencyCode.courseId)
        if (found) return found
      }
      // Тепер для другого селектора також передаються CurrencyMeta[]
      const currencyMeta =
        (currencies as CurrencyMeta[]).find(item => item.code === currencyCode.course) ??
        (currencies as CurrencyMeta[])[0]
      return currencyMeta
    }
  }

  const [currency, setCurrency] = useState<CurrencyMeta | null>(getInitialCurrency())

  const [selectCurrency, setSelectCurrency] = useState<{
    icon: {
      alt: string
      url: string | StaticImageData
    }
    code: string
  } | null>(() => {
    const initialCurrency = getInitialCurrency()
    if (!initialCurrency) return null

    // Тепер обидва селектори працюють з CurrencyMeta
    const currencyMeta = initialCurrency as CurrencyMeta
    return {
      icon: {
        url: currencyMeta.icon.url,
        alt: currencyMeta.icon.alt,
      },
      code: currencyMeta.code.trim(),
    }
  })

  useEffect(() => {
    if (!currencies || currencies.length === 0) {
      setCurrency(null)
      setSelectCurrency(null)
      return
    }

    // Тепер обидва селектори працюють з CurrencyMeta[]
    // Шукаємо за ID, якщо є, інакше за кодом
    const newCurrency = isMain
      ? ((currencyCode.currencyId
          ? (currencies as CurrencyMeta[]).find(item => item.id === currencyCode.currencyId)
          : null) ??
        (currencies as CurrencyMeta[]).find(item => item.code === currencyCode.currency.trim()) ??
        (currencies as CurrencyMeta[])[0])
      : ((currencyCode.courseId
          ? (currencies as CurrencyMeta[]).find(item => item.id === currencyCode.courseId)
          : null) ??
        (currencies as CurrencyMeta[]).find(item => item.code === currencyCode.course.trim()) ??
        (currencies as CurrencyMeta[])[0])

    if (!newCurrency) {
      setCurrency(null)
      setSelectCurrency(null)
      return
    }

    setCurrency(newCurrency)

    setSelectCurrency({
      icon: {
        url: newCurrency.icon.url,
        alt: newCurrency.icon.alt,
      },
      code: newCurrency.code.trim(),
    })
  }, [currencyCode, currencies, isMain])

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

  // ВИПРАВЛЕННЯ: Якщо немає валюти - показуємо заглушку
  if (!selectCurrency || !currencies || currencies.length === 0) {
    return (
      <div className={s.select_container} ref={containerRef}>
        <div className={s.select}>
          <div className={s.info}>
            <span className={s.choose_code}>...</span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className={s.select_container} ref={containerRef}>
        <div className={s.select} onClick={() => setActive(!active)}>
          <div className={s.info}>
            <div className={s.icon_back}>
              <Image
                src={selectCurrency.icon.url}
                alt={selectCurrency.icon.alt}
                width={24}
                height={12}
              />
            </div>
            <span className={s.choose_code}>{selectCurrency.code}</span>
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
            {isMain
              ? (currencies as CurrencyMeta[]).map((item, index) => (
                  <li
                    key={item.id || item.code.trim() + index}
                    onClick={() => {
                      // Передаємо об'єкт валюти замість коду, щоб уникнути проблем з дублікатами кодів
                      handleCurrencyCode(item.id || item.code, undefined, item, undefined)
                      setActive(false)
                      setSelectCurrency({
                        icon: {
                          url: item.icon.url,
                          alt: item.icon.alt,
                        },
                        code: item.code.trim(),
                      })
                    }}
                  >
                    <div className={s.icon_back_reverse}>
                      <Image src={item.icon.url} alt={item.icon.alt} width={24} height={12} />
                    </div>
                    <span>{item.name?.trim()}</span>
                  </li>
                ))
              : (currencies as CurrencyMeta[]).map((item, index) => (
                  <li
                    key={item.id || item.code.trim() + index}
                    onClick={() => {
                      setActive(false)
                      // Передаємо об'єкт валюти замість коду, щоб уникнути проблем з дублікатами кодів
                      handleCurrencyCode(undefined, item.id || item.code, undefined, item)
                      setSelectCurrency({
                        icon: {
                          url: item.icon.url,
                          alt: item.icon.alt,
                        },
                        code: item.code.trim(),
                      })
                    }}
                  >
                    <div className={s.icon_back_reverse}>
                      <Image src={item.icon.url} alt={item.icon.alt} width={24} height={12} />
                    </div>
                    <span>{item.name?.trim() ?? ''}</span>
                  </li>
                ))}
          </ul>
        )}
      </div>
    </>
  )
}
