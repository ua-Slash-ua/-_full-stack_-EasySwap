import s from './TableItemCurrency.module.css'

type TableItemCurrencyProps = {
  tableItem: {
    from_1000: {
      buy1000?: number | string,
      sell1000?: number | string,
    },
    from_5000: {
      buy5000?: number | string,
      sell5000?: number | string,
    },
    currency?: {
      name: string,
      id: string,
    }
    id: string,

  },
  id: string,
}

export default function TableItemCurrency({ tableItem, id }: TableItemCurrencyProps) {


  return (
    <>
      <div
        className={`${s.table_item}`}
        data-type={'curr-item'}
        parent-id={id}
        data-id={tableItem.id ?? 'none'}
        data-currency={tableItem.currency?.id ?? 'none'}

      >
        <div
          className={s.head}
        >
          <div className="">Купівля</div>
          <div className="">Продаж</div>

        </div>
        <div className={s.for_1000}>
          <input
            className={s.table_input}
            type="text"
            // placeholder={'buy 1000'}
            defaultValue={tableItem.from_1000?.buy1000?.toString() ?? ''}
          />
          <input
            className={s.table_input}
            type="text"
            // placeholder={'sell 1000'}
            defaultValue={tableItem.from_1000?.sell1000?.toString() ?? ''}
          />

        </div>
        <div className={s.for_5000}>
          <input
            className={s.table_input}
            type="text"
            // placeholder={'buy 5000'}
            defaultValue={tableItem.from_5000?.buy5000?.toString() ?? ''}
          />
          <input
            className={s.table_input}
            type="text"
            // placeholder={'sell 5000'}
            defaultValue={tableItem.from_5000?.sell5000?.toString() ?? ''}
          />

        </div>
      </div>
    </>
  )
}