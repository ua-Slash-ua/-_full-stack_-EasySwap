import { RateItem } from '@/api/changeCurrencies'
import { convertRate } from '@/plugin/sl_SimpleTableCurrencies/helpers/convertRate'

export function collectCurrencies(tableContainerId: string) {
  const tableContainer = document.getElementById(tableContainerId)
  const nameContainers = tableContainer?.querySelectorAll('[data-type="curr-item"]')

  if (!nameContainers) return []

  const groupedData: { [parentId: string]: RateItem[] } = {}
  const processedKeys = new Set<string>() // Щоб уникнути дублікатів

  nameContainers.forEach((nameContainer: any) => {
    const parentId = nameContainer.getAttribute('parent-id')
    const currency = nameContainer.getAttribute('data-currency')
    const rateId = nameContainer.getAttribute('data-id')

    // Створюємо унікальний ключ для цієї комбінації
    const uniqueKey = `${parentId}-${currency}-${rateId}`

    // Якщо вже обробили цей ключ, пропускаємо
    if (processedKeys.has(uniqueKey)) return
    processedKeys.add(uniqueKey)

    // Збираємо значення з поточного контейнера (тільки купівля, продаж обчислюється автоматично)
    const buy1000Input = nameContainer.querySelector('[data-type="input-buy1000"]')
    const buy5000Input = nameContainer.querySelector('[data-type="input-buy5000"]')

    const buy1000 = buy1000Input?.value || ''
    const buy5000 = buy5000Input?.value || ''

    // Конвертуємо значення з форми (42.5) у формат для збереження (0.0235...)
    // Продаж не збираємо, оскільки він обчислюється автоматично
    const buy1000Value = buy1000 ? parseFloat(buy1000) : 0
    const buy5000Value = buy5000 ? parseFloat(buy5000) : 0

    if (!groupedData[parentId]) {
      groupedData[parentId] = []
    }

    const rateItem: RateItem = {
      id: rateId,
      currency,
      from_1000: {
        buy1000: buy1000Value ? convertRate(buy1000Value, 'toStorage') : 0,
      },
      from_5000: {
        buy5000: buy5000Value ? convertRate(buy5000Value, 'toStorage') : 0,
      },
    }

    groupedData[parentId].push(rateItem)
  })

  const data: { id: string; data: { ratesByCurrency: RateItem[] } }[] = []

  Object.entries(groupedData).forEach(([parentId, rates]) => {
    data.push({
      id: parentId,
      data: {
        ratesByCurrency: rates,
      },
    })
  })

  return data
}
