import s from './NewExchanger.module.css'
import React, { ReactNode } from 'react'
import { CurrencyMeta, CurrencyRateItem, RateByCurrency } from '@/props/CurrenciesProps'
import NewSelectCurrencies from '@/components/layout/NewSelectCurrencies/NewSelectCurrencies'

export default function NewExchanger(
  {
    isMain,
    handleCurrencyValues,
    currencyValues,
    currencies,
    currencyCode,
    multiples,
    handleCurrencyCode,
    content,
  }:
  {
    isMain: boolean,
    handleCurrencyValues: Function,
    handleCurrencyCode: Function,
    currencyValues: { up: number, down: number },
    currencies: CurrencyMeta[] | RateByCurrency[],
    currencyCode: { currency: string, course: string },
    multiples: {
      first: { buy: number| string, sell: number | string},
      second: { buy: number| string, sell: number | string}
    },
    content?:ReactNode,

  }) {

  const value = isMain ? currencyValues.up : currencyValues.down

  return (
    <>
      <div className={s.exchanger}>
        <div className={s.exchanger_header}>
          <h4>{isMain ? 'Обмінюєте' : 'Отримуєте'}</h4>
          <h4>Валюта</h4>
        </div>
        <div className={s.exchanger_content}>
          <input
            type="number"
            onChange={e => {
              if (e.target.value.startsWith('0') && e.target.value[1] !== ',') {
                e.target.value = e.target.value.slice(1)
              }

              handleCurrencyValues(isMain, e.target.value)
            }}
            placeholder={'0'}
            value={value}
          />
          <NewSelectCurrencies currencies={currencies} isMain={isMain} currencyCode={currencyCode} handleCurrencyCode={handleCurrencyCode}/>
        </div>
        {content?? content}
      </div>
    </>
  )
}