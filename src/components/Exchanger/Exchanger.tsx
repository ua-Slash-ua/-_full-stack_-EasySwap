'use client'
import s from './Exchanger.module.css'
import SelectCurrencies from '@/components/layout/SelectCurrencies/SelectCurrencies'
import { CurrUAN } from '@/props/CurrenciesProps'
import { Currency } from '@/payload-types'

type ExchangerProps = {
  isMain: boolean
  currencies: any[]
  value:  number
  count:  number
  currCode: string
  changeValue: Function
  changeCount: Function
  changeCurrCode: Function
}
export default function Exchanger({
  isMain,
  currencies,
  value,
  count,
  changeValue,
  changeCount,
  currCode = 'UAN',
  changeCurrCode,
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
            value={isMain ? value : value*count}
          />
          <SelectCurrencies
            currency={ currencies.filter((item: Currency) => item.ratesByCurrency!.length > 0) }
            changeCurrCode={isMain ? changeCurrCode : null}
            changeCurrCount={!isMain ? changeCount : null}
            currCode={currCode}
          />
        </div>
      </div>
    </>
  )
}
