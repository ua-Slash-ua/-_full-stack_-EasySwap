import { getCurrencies } from '@/api/getCurrencies'
import  './SimpleTableCurrencies.css'
import TableCurrencies from '@/plugin/sl_SimpleTableCurrencies/components/TableCurrencies/TableCurrencies'

const SimpleTableCurrencies = async () => {
  const currencies = await getCurrencies()




  return (
    <>
      <TableCurrencies currencies={currencies} />

    </>
  )
}

export default SimpleTableCurrencies
