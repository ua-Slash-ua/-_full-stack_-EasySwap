import { convertRate } from './convertRate'

/**
 * Обчислює кросс-курс між двома валютами через гривню
 *
 * Приклад: EUR -> USD
 * - EUR/UAN = 48 (з бази)
 * - USD/UAN = 42.5 (з бази)
 * - EUR/USD = 48 / 42.5 = 1.129
 *
 * @param fromCurrency - валюта, з якої конвертуємо
 * @param toCurrency - валюта, в яку конвертуємо
 * @param amount - сума для конвертації
 * @param fromAmount - сума від якої використовується курс (1000 або 5000)
 * @returns обчислений курс або результат конвертації
 */
export function calculateCrossRate(
  fromCurrency: {
    baseRates?: {
      from_1000?: { buy1000?: number; sell1000?: number }
      from_5000?: { buy5000?: number; sell5000?: number }
    }
    code: string
  },
  toCurrency: {
    baseRates?: {
      from_1000?: { buy1000?: number; sell1000?: number }
      from_5000?: { buy5000?: number; sell5000?: number }
    }
    code: string
  },
  amount: number = 1,
  fromAmount: 1000 | 5000 = 1000,
  isBuy: boolean = true, // true = купівля, false = продаж
): number {
  // Якщо конвертуємо в гривню - використовуємо прямий курс
  if (toCurrency.code === 'UAN') {
    const rate =
      fromAmount >= 5000
        ? isBuy
          ? fromCurrency.baseRates?.from_5000?.buy5000
          : fromCurrency.baseRates?.from_5000?.sell5000
        : isBuy
          ? fromCurrency.baseRates?.from_1000?.buy1000
          : fromCurrency.baseRates?.from_1000?.sell1000

    if (!rate || rate === 0) return 0

    // Конвертуємо з бази (0.0235...) у формат для відображення (42.5)
    const displayRate = convertRate(rate, 'toDisplay')
    return amount * displayRate
  }

  // Якщо конвертуємо з гривні - використовуємо прямий курс
  if (fromCurrency.code === 'UAN') {
    const rate =
      fromAmount >= 5000
        ? isBuy
          ? toCurrency.baseRates?.from_5000?.buy5000
          : toCurrency.baseRates?.from_5000?.sell5000
        : isBuy
          ? toCurrency.baseRates?.from_1000?.buy1000
          : toCurrency.baseRates?.from_1000?.sell1000

    if (!rate || rate === 0) return 0

    // Конвертуємо з бази (0.0235...) у формат для відображення (42.5)
    const displayRate = convertRate(rate, 'toDisplay')
    return amount / displayRate
  }

  // Кросс-курс через гривню
  // 1. Конвертуємо fromCurrency -> UAN
  const fromRate =
    fromAmount >= 5000
      ? isBuy
        ? fromCurrency.baseRates?.from_5000?.buy5000
        : fromCurrency.baseRates?.from_5000?.sell5000
      : isBuy
        ? fromCurrency.baseRates?.from_1000?.buy1000
        : fromCurrency.baseRates?.from_1000?.sell1000

  // 2. Конвертуємо UAN -> toCurrency
  const toRate =
    fromAmount >= 5000
      ? isBuy
        ? toCurrency.baseRates?.from_5000?.buy5000
        : toCurrency.baseRates?.from_5000?.sell5000
      : isBuy
        ? toCurrency.baseRates?.from_1000?.buy1000
        : toCurrency.baseRates?.from_1000?.sell1000

  if (!fromRate || !toRate || fromRate === 0 || toRate === 0) return 0

  // Конвертуємо обидва курси з бази
  const fromDisplayRate = convertRate(fromRate, 'toDisplay') // EUR/UAN = 48
  const toDisplayRate = convertRate(toRate, 'toDisplay') // USD/UAN = 42.5

  // Обчислюємо кросс-курс: EUR/USD = 48 / 42.5 = 1.129
  const crossRate = fromDisplayRate / toDisplayRate

  return amount * crossRate
}

/**
 * Перевіряє, чи можна обміняти одну валюту на іншу
 */
export function canExchange(
  fromCurrency: {
    exchangeableWith?: string[] | any[]
    code: string
    cat_type?: 'fiat' | 'crypto'
    baseRates?: {
      from_1000?: { buy1000?: number; sell1000?: number }
      from_5000?: { buy5000?: number; sell5000?: number }
    }
  },
  toCurrency: {
    code: string
    id?: string
    cat_type?: 'fiat' | 'crypto'
    baseRates?: {
      from_1000?: { buy1000?: number; sell1000?: number }
      from_5000?: { buy5000?: number; sell5000?: number }
    }
  },
): boolean {
  // Гривню завжди можна обміняти
  if (toCurrency.code === 'UAN' || fromCurrency.code === 'UAN') {
    return true
  }

  // ПРІОРИТЕТ: Перевіряємо явно вказані можливості обміну через exchangeableWith (для всіх валют)
  if (fromCurrency.exchangeableWith && fromCurrency.exchangeableWith.length > 0) {
    const isInExchangeableWith = fromCurrency.exchangeableWith.some((curr: any) => {
      // Якщо елемент - рядок, перевіряємо як ID або код
      if (typeof curr === 'string') {
        const matches = curr === toCurrency.id || curr === toCurrency.code
        if (matches) {
          console.log(
            `Matched ${fromCurrency.code} -> ${toCurrency.code} via exchangeableWith (string):`,
            {
              exchangeableWithItem: curr,
              toCurrencyId: toCurrency.id,
              toCurrencyCode: toCurrency.code,
            },
          )
        }
        return matches
      }
      // Якщо елемент - об'єкт, перевіряємо id або code
      if (typeof curr === 'object' && curr !== null) {
        const matches =
          curr.id === toCurrency.id ||
          curr.id === toCurrency.code ||
          curr.code === toCurrency.code ||
          curr.code === toCurrency.id
        if (matches) {
          console.log(
            `Matched ${fromCurrency.code} -> ${toCurrency.code} via exchangeableWith (object):`,
            {
              exchangeableWithItem: curr,
              toCurrencyId: toCurrency.id,
              toCurrencyCode: toCurrency.code,
            },
          )
        }
        return matches
      }
      return false
    })
    // Якщо валюта в exchangeableWith - дозволяємо обмін
    if (isInExchangeableWith) {
      return true
    }
    // Якщо валюта не в exchangeableWith - не дозволяємо обмін (навіть якщо є baseRates)
    console.log(
      `Cannot exchange ${fromCurrency.code} -> ${toCurrency.code}: not in exchangeableWith`,
      {
        fromCurrencyCode: fromCurrency.code,
        fromCurrencyExchangeableWith: fromCurrency.exchangeableWith,
        toCurrencyCode: toCurrency.code,
        toCurrencyId: toCurrency.id,
      },
    )
    return false
  }

  // Якщо exchangeableWith відсутнє або порожнє - використовуємо fallback логіку

  // Для всіх валют без exchangeableWith: якщо обидві валюти мають baseRates - можна обміняти через кросс-курс
  const fromHasRates =
    fromCurrency.baseRates?.from_1000?.buy1000 || fromCurrency.baseRates?.from_5000?.buy5000
  const toHasRates =
    toCurrency.baseRates?.from_1000?.buy1000 || toCurrency.baseRates?.from_5000?.buy5000

  if (fromHasRates && toHasRates) {
    return true
  }

  // Якщо нічого не підійшло - обмін неможливий
  return false
}
