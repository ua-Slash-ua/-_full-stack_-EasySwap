import { RateItem } from '@/api/changeCurrencies'

export function collectCurrencies(tableContainerId: string) {
  const tableContainer = document.getElementById(tableContainerId)

  const nameContainers = tableContainer?.querySelectorAll('[data-type="curr-item"]')

  if (!nameContainers) return []

  // Групуємо за parent-id (ID основної валюти)
  const groupedData: { [parentId: string]: RateItem[] } = {}

  nameContainers.forEach((nameContainer: any) => {
    const parentId = nameContainer.getAttribute('parent-id') // ID основної валюти
    const currency = nameContainer.getAttribute('data-currency') // ID валюти для курсу
    const rateId = nameContainer.getAttribute('data-id') // ID курсу (якщо існує)

    const buy1000 = nameContainer.querySelector('[data-type="input-buy1000"]')?.value || ''
    const sell1000 = nameContainer.querySelector('[data-type="input-sell1000"]')?.value || ''
    const buy5000 = nameContainer.querySelector('[data-type="input-buy5000"]')?.value || ''
    const sell5000 = nameContainer.querySelector('[data-type="input-sell5000"]')?.value || ''

    const rateItem: RateItem = {
      id: rateId, // ID курсу (якщо є)
      currency,   // ID валюти для курсу
      from_1000: {
        buy1000: parseFloat(buy1000) || 0,
        sell1000: parseFloat(sell1000) || 0,
      },
      from_5000: {
        buy5000: parseFloat(buy5000) || 0,
        sell5000: parseFloat(sell5000) || 0,
      },
    }

    // Додаємо до групи за parent-id
    if (!groupedData[parentId]) {
      groupedData[parentId] = []
    }
    groupedData[parentId].push(rateItem)
  })

  // Конвертуємо в потрібний формат
  const data: { id: string; data: { ratesByCurrency: RateItem[] } }[] = []

  Object.entries(groupedData).forEach(([parentId, rates]) => {
    data.push({
      id: parentId, // ID основної валюти
      data: {
        ratesByCurrency: rates // Масив курсів для цієї валюти
      }
    })
  })

  return data
}