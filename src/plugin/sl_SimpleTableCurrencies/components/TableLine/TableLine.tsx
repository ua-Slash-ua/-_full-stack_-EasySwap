
import s from './TableLine.module.css'
import TableItem from '@/plugin/sl_SimpleTableCurrencies/components/TableItem/TableItem'
import { currencyExists } from '@/plugin/sl_SimpleTableCurrencies/helpers/currencyExist'
import TableItemCurrency from '@/plugin/sl_SimpleTableCurrencies/components/TableItemCurrency/TableItemCurrency'

type TableLineProps = {
  tableLine: any[],
  editable: boolean,
  zeroItem: any,
  currenciesNames?: any[] | null
  name?: string
  dataType?: string
}

export default function TableLine({ tableLine, editable, zeroItem, name, dataType, currenciesNames = null }: TableLineProps) {
  return (
    <div className={s.table_line}>
      {/* нульовий елемент */}
      <TableItem key={`zero-${name}`} tableItem={zeroItem} editable={false} />

      {/* рендеримо tableLine, якщо є */}
      {!currenciesNames && tableLine.map((line: any, index: number) => (
        <TableItem
          key={index}
          tableItem={line}
          editable={editable}
          dataType={dataType}
        />
      ))}

      {/* якщо tableLine порожній, рендеримо count */}
      {currenciesNames &&
        currenciesNames.map((line: any, index: number) => {
          const exists = currencyExists(line.ratesByCurrency, name!)
          const existsCurrency = line.ratesByCurrency.find((item: any) => item.currency.name === name)
          console.log(existsCurrency?? '')
          console.log('line.id', line.id)
          console.log('line = ', line)

          return (
            name === line.name ? (
                <TableItem key={index} tableItem={exists} editable={exists} hidden={name === line.name} />
              ):

              (

                <TableItemCurrency key={index}  id={line.id} tableItem={existsCurrency ?? {
                  from_1000: {
                    buy1000: '',
                    sell1000: '',
                  },
                  from_5000: {
                    buy5000: '',
                    sell5000: '',
                  }
                }}/>
              )

          )
        })
      }

    </div>
  )
}
