import { convertRate } from '@/plugin/sl_SimpleTableCurrenciesRates/helpers/convertRate'

export type CurrencyRateItem = {
  id: string
  buy1000: number
  sell1000: number
  buy5000: number
  sell5000: number
  exchangeableWith: string[]
}

export function collectCurrenciesRates(tableContainerId: string): CurrencyRateItem[] {
  const tableContainer = document.getElementById(tableContainerId)
  if (!tableContainer) {
    console.error('Table container not found:', tableContainerId)
    return []
  }

  const lines = tableContainer.querySelectorAll('[data-currency-id]')
  console.log('Found lines:', lines.length)

  const data: CurrencyRateItem[] = []

  lines.forEach((line: any) => {
    const currencyId = line.getAttribute('data-currency-id')
    if (!currencyId) {
      console.warn('Line without currency-id')
      return
    }

    // Отримуємо код валюти для перевірки
    const currencyCode = line.querySelector('[data-currency-code]')?.textContent?.trim() || ''
    const isUAN = currencyCode === 'UAN'

    // Пропускаємо UAN (гривню), оскільки вона є базовою валютою
    if (isUAN) {
      console.log('Skipping UAN')
      return
    }

    const buy1000Input = line.querySelector('[data-type="input-buy1000"]') as HTMLInputElement
    const sell1000Input = line.querySelector('[data-type="input-sell1000"]') as HTMLInputElement
    const buy5000Input = line.querySelector('[data-type="input-buy5000"]') as HTMLInputElement
    const sell5000Input = line.querySelector('[data-type="input-sell5000"]') as HTMLInputElement

    if (!buy1000Input || !sell1000Input || !buy5000Input || !sell5000Input) {
      console.warn(`Inputs not found for ${currencyCode}`)
      return
    }

    // Перевіряємо, чи input не disabled (для UAN вони disabled)
    if (
      buy1000Input.disabled ||
      sell1000Input.disabled ||
      buy5000Input.disabled ||
      sell5000Input.disabled
    ) {
      console.log(`Skipping ${currencyCode} - inputs are disabled`)
      return
    }

    const buy1000 = buy1000Input.value?.trim() || ''
    const sell1000 = sell1000Input.value?.trim() || ''
    const buy5000 = buy5000Input.value?.trim() || ''
    const sell5000 = sell5000Input.value?.trim() || ''

    console.log(`Collecting ${currencyCode}:`, {
      buy1000Input: buy1000Input.value,
      sell1000Input: sell1000Input.value,
      buy5000Input: buy5000Input.value,
      sell5000Input: sell5000Input.value,
      buy1000,
      sell1000,
      buy5000,
      sell5000,
      inputDisabled: buy1000Input.disabled,
    })

    // Конвертуємо значення з форми (42.5) у формат для збереження (0.0235...)
    // Перевіряємо, чи значення не порожнє
    const buy1000Value = buy1000 && buy1000 !== '' ? parseFloat(buy1000) : null
    const sell1000Value = sell1000 && sell1000 !== '' ? parseFloat(sell1000) : null
    const buy5000Value = buy5000 && buy5000 !== '' ? parseFloat(buy5000) : null
    const sell5000Value = sell5000 && sell5000 !== '' ? parseFloat(sell5000) : null

    // Збираємо вибрані пари з data-атрибута (оскільки чекбокси можуть бути не відрендерені)
    let exchangeableWith: string[] = []

    // Спробуємо отримати з data-атрибута
    const exchangeableWithData = line.getAttribute('data-exchangeable-with')
    if (exchangeableWithData) {
      try {
        exchangeableWith = JSON.parse(exchangeableWithData) as string[]
      } catch (e) {
        console.warn(`Failed to parse exchangeableWith for ${currencyCode}:`, e)
      }
    }

    // Fallback: якщо немає data-атрибута, шукаємо чекбокси (якщо dropdown відкритий)
    if (exchangeableWith.length === 0) {
      const checkboxes = line.querySelectorAll('input[type="checkbox"]:checked')
      exchangeableWith = Array.from(checkboxes)
        .map((cb: any) => {
          const id = cb.getAttribute('data-currency-id')
          return id
        })
        .filter((id: string | null) => id !== null && id !== undefined) as string[]
    }

    console.log(`Collecting exchangeableWith for ${currencyCode}:`, {
      fromDataAttribute: !!exchangeableWithData,
      exchangeableWith,
    })

    // Конвертуємо тільки якщо значення існує і не NaN та > 0
    if (buy1000Value === null || isNaN(buy1000Value) || buy1000Value <= 0) {
      console.warn(`${currencyCode} buy1000 is invalid:`, buy1000Value)
    }
    if (sell1000Value === null || isNaN(sell1000Value) || sell1000Value <= 0) {
      console.warn(`${currencyCode} sell1000 is invalid:`, sell1000Value)
    }
    if (buy5000Value === null || isNaN(buy5000Value) || buy5000Value <= 0) {
      console.warn(`${currencyCode} buy5000 is invalid:`, buy5000Value)
    }
    if (sell5000Value === null || isNaN(sell5000Value) || sell5000Value <= 0) {
      console.warn(`${currencyCode} sell5000 is invalid:`, sell5000Value)
    }

    const convertedBuy1000 =
      buy1000Value !== null && !isNaN(buy1000Value) && buy1000Value > 0
        ? convertRate(buy1000Value, 'toStorage')
        : 0
    const convertedSell1000 =
      sell1000Value !== null && !isNaN(sell1000Value) && sell1000Value > 0
        ? convertRate(sell1000Value, 'toStorage')
        : 0
    const convertedBuy5000 =
      buy5000Value !== null && !isNaN(buy5000Value) && buy5000Value > 0
        ? convertRate(buy5000Value, 'toStorage')
        : 0
    const convertedSell5000 =
      sell5000Value !== null && !isNaN(sell5000Value) && sell5000Value > 0
        ? convertRate(sell5000Value, 'toStorage')
        : 0

    console.log(`Collected ${currencyCode}:`, {
      buy1000Value,
      sell1000Value,
      buy5000Value,
      sell5000Value,
      convertedBuy1000,
      convertedSell1000,
      convertedBuy5000,
      convertedSell5000,
      exchangeableWith,
      hasRates:
        convertedBuy1000 > 0 ||
        convertedSell1000 > 0 ||
        convertedBuy5000 > 0 ||
        convertedSell5000 > 0,
      hasPairs: exchangeableWith.length > 0,
      willSave:
        convertedBuy1000 > 0 ||
        convertedSell1000 > 0 ||
        convertedBuy5000 > 0 ||
        convertedSell5000 > 0 ||
        exchangeableWith.length > 0,
    })

    // Зберігаємо якщо є хоча б одне значення курсу АБО вибрані пари
    if (
      convertedBuy1000 > 0 ||
      convertedSell1000 > 0 ||
      convertedBuy5000 > 0 ||
      convertedSell5000 > 0 ||
      exchangeableWith.length > 0
    ) {
      data.push({
        id: currencyId,
        buy1000: convertedBuy1000,
        sell1000: convertedSell1000,
        buy5000: convertedBuy5000,
        sell5000: convertedSell5000,
        exchangeableWith: exchangeableWith,
      })
    } else {
      console.warn(`Skipping ${currencyCode} - no valid values or pairs`)
    }
  })

  console.log('Total collected items:', data.length)
  return data
}
