'use client'

import { useTransition } from 'react'
import { changeCurrenciesHandler } from '@/api/changeCurrencies'
import { collectNames } from '@/plugin/sl_SimpleTableCurrencies/helpers/collectName'
import s from './BtnSave.module.css'
export default function BtnSave() {
  const [isPending, startTransition] = useTransition()

  const handleSave = async () => {
    const data = collectNames('sl_table-container')
    console.log('data', data)
    // const result = await changeCurrenciesHandler(data)
    // if (!result) {
    //   console.error('Update error:', result)
    // }
  }

  return (
    <button
      className={s.btn_save}
      type="button"
      onClick={() => startTransition(() => void handleSave())}
      disabled={isPending} // можна відключати кнопку під час операції
    >
      {isPending ? 'Saving...' : 'Save'}
    </button>
  )
}
