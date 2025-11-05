import { convertRate } from '@/plugin/sl_SimpleTableCurrencies/helpers/convertRate'
import s from './TableItemCurrency.module.css'

type TableItemCurrencyProps = {
  tableItem: {
    from_1000: {
      buy1000?: number | string
      sell1000?: number | string
    }
    from_5000: {
      buy5000?: number | string
      sell5000?: number | string
    }
    currency?: {
      name: string
      id: string
    }
    id: string
  }
  id: string
}

export default function TableItemCurrency({ tableItem, id }: TableItemCurrencyProps) {
  // Конвертуємо значення з бази (0.0235...) у формат для відображення (42.5)
  const displayBuy1000 = tableItem.from_1000?.buy1000
    ? convertRate(tableItem.from_1000.buy1000, 'toDisplay').toString()
    : ''
  const displayBuy5000 = tableItem.from_5000?.buy5000
    ? convertRate(tableItem.from_5000.buy5000, 'toDisplay').toString()
    : ''

  return (
    <div
      className={`${s.table_item}`}
      data-type={'curr-item'}
      parent-id={id}
      data-id={tableItem.id ?? 'none'}
      data-currency={tableItem.currency?.id ?? 'none'}
    >
      {/* Рядок для купівлі */}
      <div className={s.row}>
        <div className={s.head}>
          <div className="">Купівля</div>
        </div>
        <div className={s.for_1000}>
          <input
            data-type={'input-buy1000'}
            className={s.table_input}
            type="text"
            placeholder={'0'}
            defaultValue={displayBuy1000}
          />
        </div>
        <div className={s.for_5000}>
          <input
            data-type={'input-buy5000'}
            className={s.table_input}
            type="text"
            placeholder={'0'}
            defaultValue={displayBuy5000}
          />
        </div>
      </div>
    </div>
  )
}
