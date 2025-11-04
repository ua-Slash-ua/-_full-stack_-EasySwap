import { RateItem } from '@/api/changeCurrencies'

export function collectCurrencies(tableContainerId: string) {
  const tableContainer = document.getElementById(tableContainerId)
  const nameContainers = tableContainer?.querySelectorAll('[data-type="curr-item"]')

  if (!nameContainers) return []

  const groupedData: { [parentId: string]: RateItem[] } = {}

  nameContainers.forEach((nameContainer: any) => {
    const parentId = nameContainer.getAttribute('parent-id')
    const currency = nameContainer.getAttribute('data-currency')
    const rateId = nameContainer.getAttribute('data-id')

    const buy1000 = nameContainer.querySelector('[data-type="input-buy1000"]')?.value || ''
    const buy5000 = nameContainer.querySelector('[data-type="input-buy5000"]')?.value || ''

    const rateItem: RateItem = {
      id: rateId,
      currency,
      from_1000: {
        buy1000: parseFloat(buy1000) || 0,
      },
      from_5000: {
        buy5000: parseFloat(buy5000) || 0,
      },
    }

    if (!groupedData[parentId]) {
      groupedData[parentId] = []
    }
    groupedData[parentId].push(rateItem)
  })

  const data: { id: string; data: { ratesByCurrency: RateItem[] } }[] = []

  Object.entries(groupedData).forEach(([parentId, rates]) => {
    data.push({
      id: parentId,
      data: {
        ratesByCurrency: rates
      }
    })
  })

  return data
}