'use client'

import { canExchange } from '@/plugin/sl_SimpleTableCurrenciesRates/helpers/calculateCrossRate'
import { convertRate } from '@/plugin/sl_SimpleTableCurrenciesRates/helpers/convertRate'
import { useEffect, useRef, useState } from 'react'
import s from './TableLineRates.module.css'

type TableLineRatesProps = {
  currency: any
  allCurrencies: any[]
}

export default function TableLineRates({ currency, allCurrencies }: TableLineRatesProps) {
  // Отримуємо базові курси відносно гривні (якщо є)
  // ПРИОРИТЕТ: використовуємо baseRates, якщо він існує (навіть якщо значення 0)
  // Fallback на ratesByCurrency тільки якщо baseRates повністю відсутній
  let baseRates = currency.baseRates

  // Fallback на старі дані ТІЛЬКИ якщо baseRates повністю відсутній
  if (!baseRates) {
    // Шукаємо курс відносно UAN в старій структурі
    const uanRate = currency.ratesByCurrency?.find((rate: any) => {
      const rateCurrency = typeof rate.currency === 'string' ? null : rate.currency
      return rateCurrency?.code === 'UAN'
    })

    if (uanRate) {
      // Використовуємо старі дані як fallback
      baseRates = {
        from_1000: {
          buy1000: uanRate.from_1000?.buy1000 || null,
          sell1000: uanRate.from_1000?.sell1000 || null,
        },
        from_5000: {
          buy5000: uanRate.from_5000?.buy5000 || null,
          sell5000: uanRate.from_5000?.sell5000 || null,
        },
      }
    } else {
      baseRates = {
        from_1000: { buy1000: null, sell1000: null },
        from_5000: { buy5000: null, sell5000: null },
      }
    }
  }

  // Отримуємо список доступних пар (exchangeableWith)
  const exchangeableWith = currency.exchangeableWith || []

  // Конвертуємо значення з бази для відображення
  // Перевіряємо, чи значення не null/undefined/0
  const buy1000Value = baseRates.from_1000?.buy1000
  const buy5000Value = baseRates.from_5000?.buy5000
  const sell1000Value = baseRates.from_1000?.sell1000
  const sell5000Value = baseRates.from_5000?.sell5000

  console.log(`Currency ${currency.code}:`, {
    buy1000: buy1000Value,
    buy5000: buy5000Value,
    buy1000Type: typeof buy1000Value,
    buy5000Type: typeof buy5000Value,
    baseRates,
    currencyBaseRates: currency.baseRates,
    hasBaseRates: !!currency.baseRates,
    isUsingFallback: !currency.baseRates && !!currency.ratesByCurrency,
    hasRatesByCurrency: !!currency.ratesByCurrency,
  })

  // Виправлена логіка: перевіряємо не тільки на 0, але й на null/undefined
  // Важливо: значення з бази мають бути > 0 (навіть якщо це 0.024...)
  const formatValue = (value: number): string => {
    // Якщо значення < 1 (обернений курс) - обмежуємо до 3 знаків після коми
    if (value < 1 && value > 0) {
      return value.toFixed(3)
    }
    // Якщо значення >= 1 (прямий курс) - обмежуємо до 2 знаків після коми
    return value.toFixed(2)
  }

  const displayBuy1000 =
    buy1000Value != null &&
    buy1000Value !== 0 &&
    !isNaN(Number(buy1000Value)) &&
    Number(buy1000Value) > 0
      ? (() => {
          const converted = convertRate(buy1000Value, 'toDisplay')
          console.log(`Converting ${currency.code} buy1000: ${buy1000Value} -> ${converted}`)
          // Якщо значення все ще < 1 (не конвертувалося), форматуємо до 3 знаків
          // Якщо >= 1 (конвертувалося), форматуємо до 2 знаків
          return formatValue(converted)
        })()
      : ''
  const displayBuy5000 =
    buy5000Value != null &&
    buy5000Value !== 0 &&
    !isNaN(Number(buy5000Value)) &&
    Number(buy5000Value) > 0
      ? (() => {
          const converted = convertRate(buy5000Value, 'toDisplay')
          console.log(`Converting ${currency.code} buy5000: ${buy5000Value} -> ${converted}`)
          return formatValue(converted)
        })()
      : ''

  const displaySell1000 =
    sell1000Value != null &&
    sell1000Value !== 0 &&
    !isNaN(Number(sell1000Value)) &&
    Number(sell1000Value) > 0
      ? (() => {
          const converted = convertRate(sell1000Value, 'toDisplay')
          console.log(`Converting ${currency.code} sell1000: ${sell1000Value} -> ${converted}`)
          return formatValue(converted)
        })()
      : ''
  const displaySell5000 =
    sell5000Value != null &&
    sell5000Value !== 0 &&
    !isNaN(Number(sell5000Value)) &&
    Number(sell5000Value) > 0
      ? (() => {
          const converted = convertRate(sell5000Value, 'toDisplay')
          console.log(`Converting ${currency.code} sell5000: ${sell5000Value} -> ${converted}`)
          return formatValue(converted)
        })()
      : ''

  // Стан для вибору доступних пар
  const [selectedPairs, setSelectedPairs] = useState<string[]>(
    exchangeableWith.map((curr: any) => (typeof curr === 'string' ? curr : curr.id)),
  )
  const [pairsOpen, setPairsOpen] = useState(false)
  const pairsContainerRef = useRef<HTMLDivElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)

  // Синхронізуємо selectedPairs з exchangeableWith тільки при зміні валюти (ID)
  useEffect(() => {
    const currentExchangeableWith = currency.exchangeableWith || []
    const newPairs = currentExchangeableWith
      .map((curr: any) => (typeof curr === 'string' ? curr : curr.id))
      .filter((id: string | undefined) => id) as string[]
    setSelectedPairs(newPairs)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currency.id])

  // Зберігаємо вибрані пари в data-атрибуті для збору даних
  useEffect(() => {
    if (lineRef.current) {
      lineRef.current.setAttribute('data-exchangeable-with', JSON.stringify(selectedPairs))
    }
  }, [selectedPairs])

  // Закриття dropdown при кліку поза ним
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (pairsContainerRef.current && !pairsContainerRef.current.contains(event.target as Node)) {
        setPairsOpen(false)
      }
    }

    if (pairsOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [pairsOpen])

  // Перевіряємо, чи це гривня (UAN)
  const isUAN = currency.code === 'UAN' || currency.name?.toLowerCase().includes('гривн')

  return (
    <div className={s.table_line} ref={lineRef} data-currency-id={currency.id}>
      {/* Назва валюти */}
      <div className={s.currency_name}>
        <div>
          <div className={s.currency_code} data-currency-code={currency.code}>
            {currency.code}
          </div>
          <div className={s.currency_label}>{currency.name}</div>
        </div>
      </div>

      {/* Від 1000: Купівля та Продаж */}
      <div className={s.rate_group} data-label="Від 1000">
        <div className={s.rate_input} data-label="Купівля">
          {isUAN ? (
            <input
              data-type={'input-buy1000'}
              className={s.input}
              type="text"
              placeholder={'—'}
              defaultValue={''}
              disabled
              readOnly
              style={{ opacity: 0.5, cursor: 'not-allowed' }}
            />
          ) : (
            <input
              data-type={'input-buy1000'}
              className={s.input}
              type="text"
              placeholder={'0'}
              defaultValue={displayBuy1000}
            />
          )}
        </div>
        <div className={s.rate_input} data-label="Продаж">
          {isUAN ? (
            <input
              data-type={'input-sell1000'}
              className={s.input}
              type="text"
              placeholder={'—'}
              defaultValue={''}
              disabled
              readOnly
              style={{ opacity: 0.5, cursor: 'not-allowed' }}
            />
          ) : (
            <input
              data-type={'input-sell1000'}
              className={s.input}
              type="text"
              placeholder={'0'}
              defaultValue={displaySell1000}
            />
          )}
        </div>
      </div>

      {/* Від 5000: Купівля та Продаж */}
      <div className={s.rate_group} data-label="Від 5000">
        <div className={s.rate_input} data-label="Купівля">
          {isUAN ? (
            <input
              data-type={'input-buy5000'}
              className={s.input}
              type="text"
              placeholder={'—'}
              defaultValue={''}
              disabled
              readOnly
              style={{ opacity: 0.5, cursor: 'not-allowed' }}
            />
          ) : (
            <input
              data-type={'input-buy5000'}
              className={s.input}
              type="text"
              placeholder={'0'}
              defaultValue={displayBuy5000}
            />
          )}
        </div>
        <div className={s.rate_input} data-label="Продаж">
          {isUAN ? (
            <input
              data-type={'input-sell5000'}
              className={s.input}
              type="text"
              placeholder={'—'}
              defaultValue={''}
              disabled
              readOnly
              style={{ opacity: 0.5, cursor: 'not-allowed' }}
            />
          ) : (
            <input
              data-type={'input-sell5000'}
              className={s.input}
              type="text"
              placeholder={'0'}
              defaultValue={displaySell5000}
            />
          )}
        </div>
      </div>

      {/* Доступні пари для обміну */}
      <div className={s.exchangeable_pairs_container} ref={pairsContainerRef}>
        <button
          type="button"
          className={s.exchangeable_pairs_button}
          onClick={() => setPairsOpen(!pairsOpen)}
        >
          <span>
            {selectedPairs.length > 0
              ? `${selectedPairs.length} ${selectedPairs.length === 1 ? 'пара' : 'пар'}`
              : 'Виберіть пари'}
          </span>
          <svg
            width="12"
            height="8"
            viewBox="0 0 12 8"
            fill="none"
            style={{
              transform: pairsOpen ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: 'transform 0.2s',
            }}
          >
            <path d="M1 1L6 6L11 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
        {pairsOpen && (
          <div className={s.exchangeable_pairs_dropdown}>
            {allCurrencies
              .filter(curr => {
                // Виключаємо поточну валюту
                if (curr.code === currency.code) return false
                // Використовуємо canExchange для перевірки можливості обміну
                return canExchange(currency, curr)
              })
              .map(curr => {
                const isSelected = selectedPairs.includes(curr.id)
                return (
                  <label key={curr.id} className={s.checkbox_label}>
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={e => {
                        if (e.target.checked) {
                          setSelectedPairs([...selectedPairs, curr.id])
                        } else {
                          setSelectedPairs(selectedPairs.filter(id => id !== curr.id))
                        }
                      }}
                      data-currency-id={curr.id}
                    />
                    <span>{curr.code}</span>
                  </label>
                )
              })}
          </div>
        )}
      </div>
    </div>
  )
}
