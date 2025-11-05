'use client'

import { useEffect, useState } from 'react'
import TableCurrenciesRates from './components/TableCurrenciesRates/TableCurrenciesRates'

export default function SimpleTableCurrenciesRates(props: any) {
  const [currencies, setCurrencies] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  console.log('SimpleTableCurrenciesRates props:', props)

  // Перевірка на наявність props (після ініціалізації стану)
  if (!props) {
    console.warn('SimpleTableCurrenciesRates: props is null/undefined')
    return (
      <div style={{ padding: '1rem', border: '1px solid #ccc' }}>
        Помилка: компонент не отримав props. Перезавантажте сторінку.
      </div>
    )
  }

  useEffect(() => {
    // Завантажуємо валюти з API Payload
    const fetchCurrencies = async () => {
      try {
        // Використовуємо API endpoint Payload з правильним шляхом
        const apiUrl = window.location.origin + '/api/currencies?limit=1000&depth=2'
        console.log('Fetching from:', apiUrl)

        const response = await fetch(apiUrl, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          cache: 'no-store', // Вимкнути кешування
        })

        console.log('Response status:', response.status)

        if (!response.ok) {
          const errorText = await response.text()
          console.error('API Error:', response.status, errorText)
          throw new Error(`Failed to fetch: ${response.status}`)
        }

        const data = await response.json()
        console.log('Fetched data:', data)

        // Детальне логування для першої валюти
        if (data && data.docs && data.docs.length > 0) {
          const firstCurrency = data.docs[0]
          console.log('First currency sample:', {
            code: firstCurrency.code,
            name: firstCurrency.name,
            baseRates: firstCurrency.baseRates,
            hasBaseRates: !!firstCurrency.baseRates,
            buy1000: firstCurrency.baseRates?.from_1000?.buy1000,
            buy5000: firstCurrency.baseRates?.from_5000?.buy5000,
          })
        }

        if (data && data.docs) {
          setCurrencies({ docs: data.docs })
        } else if (Array.isArray(data)) {
          // Якщо API повертає масив безпосередньо
          setCurrencies({ docs: data })
        } else {
          console.warn('Unexpected data format:', data)
          setCurrencies({ docs: [] })
          setError('Немає даних')
        }
      } catch (error: any) {
        console.error('Error fetching currencies:', error)
        setError(error.message || 'Помилка завантаження')
        setCurrencies({ docs: [] })
      }
    }

    fetchCurrencies()
  }, [])

  if (error) {
    return (
      <div style={{ padding: '1rem', color: 'red', border: '1px solid red' }}>
        <strong>Помилка:</strong> {error}
        <br />
        Перевірте консоль браузера для деталей
      </div>
    )
  }

  if (!currencies) {
    return <div style={{ padding: '1rem', border: '1px solid #ccc' }}>Завантаження валют...</div>
  }

  if (currencies.docs.length === 0) {
    return (
      <div style={{ padding: '1rem', border: '1px solid #ccc' }}>
        Валюти не знайдено. Перевірте, чи є валюти в колекції Currencies.
      </div>
    )
  }

  return <TableCurrenciesRates currencies={currencies} />
}
