'use client'
import s from './Exchanger.module.css'
import SelectCurrencies from '@/components/layout/SelectCurrencies/SelectCurrencies'
import { Currency } from '@/payload-types'
import React from 'react'

type ExchangerProps = {
  isMain: boolean
  currencies: any[]
  value: number
  count: number
  currCode: { code: string; isAge: string }
  currCodeExc: { code: string; isAge: string }
  changeValue: Function
  changeCount: Function
  changeCurrCode: Function
  changeCurrCodeExc: Function
  content?:React.ReactNode
}
export default function Exchanger({
  isMain,
  currencies,
  value,
  count,
  changeValue,
  changeCount,
  currCode,
  currCodeExc,
  changeCurrCode,
  changeCurrCodeExc,
  content
}: ExchangerProps) {
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
              changeValue(e.target.value)
            }}
            placeholder={'0'}
            disabled={!isMain}
            value={isMain ? value : (1/ count * value).toFixed(2)}
            // value={isMain ? value : count * value}
          />
          <SelectCurrencies
            currency={currencies.filter((item: Currency) => item.ratesByCurrency!.length > 0)}
            changeCurrCode={isMain ? changeCurrCode : null}
            changeCurrCount={!isMain ? changeCount : null}
            changeCurrCodeExc={!isMain ? changeCurrCodeExc : null}
            currCode={currCode}
            currCodeExc={currCodeExc}
          />
        </div>
        {content?? content}
      </div>
    </>
  )
}
