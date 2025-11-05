'use client'

import { saveCurrenciesRates } from '@/api/saveCurrenciesRates'
import { collectCurrenciesRates } from '@/plugin/sl_SimpleTableCurrenciesRates/helpers/collectCurrenciesRates'
import { useTransition } from 'react'
import s from './BtnSaveRates.module.css'

export default function BtnSaveRates() {
  const [isPending, startTransition] = useTransition()

  const handleSave = async () => {
    const data = collectCurrenciesRates('sl_rates-table-container')
    console.log('Collected data to save:', data)

    if (data && data.length > 0) {
      const result = await saveCurrenciesRates(data)
      if (!result.success) {
        console.error('Save error:', result)
        alert('Помилка збереження: ' + result.error)
      } else {
        alert('Курси збережено успішно!')
        // Оновлюємо сторінку для завантаження нових даних
        window.location.reload()
      }
    } else {
      console.warn('No data to save')
      alert('Немає даних для збереження')
    }
  }

  return (
    <button
      className={s.btn_save}
      type="button"
      onClick={() => startTransition(() => void handleSave())}
      disabled={isPending}
    >
      {isPending ? 'Збереження...' : 'Зберегти курси'}
    </button>
  )
}
