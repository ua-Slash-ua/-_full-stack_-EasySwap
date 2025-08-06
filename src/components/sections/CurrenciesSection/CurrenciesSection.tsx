'use client'
import s from './CurrenciesSection.module.css'
import { currencies } from '@/config/currencies.config'
import BtnSwitcher from '@/components/layout/BtnSwitcher/BtnSwitcher'
import { useEffect, useState } from 'react'
import { CurrencyRateItem, CurrUAN } from '@/props/CurrenciesProps'

function formatDateToShort(dateString: string): string {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // місяці з 0
  const year = String(date.getFullYear()).slice(-2); // останні 2 цифри

  return `${day}.${month}.${year}`;
}

export default function CurrenciesSection({ block }: { block: any }) {
  const countCurrencies:number = 1
  const [activeFiat, setActiveFiat] = useState(true)
  const [activeCrypto, setActiveCrypto] = useState(false)
  const [seeAll, setSeeAll] = useState(false)
  const [lastUpdate, setLastUpdate] = useState('')

  const currUAN:CurrUAN = block.find((item: any) => item.code === 'UAN').ratesByCurrency

  useEffect(() => {
    if (currUAN.length === 0) return;

    const latest = currUAN
      .map(item => new Date(item.currency.updatedAt))
      .reduce((max, curr) => (curr > max ? curr : max));

    const formatted = formatDateToShort(latest.toISOString());
    setLastUpdate(formatted);
  }, [currUAN]);

  return (
    <>
      <section className={s.currencies_section}>
        <div className={s.currencies_header}>
          <h3>Актуальний курс валют</h3>
          <div
            className={s.currencies_icon}
            dangerouslySetInnerHTML={{ __html: currencies.iconMain }}
          />
          <div className={s.calc_header}>
            <BtnSwitcher
              content={'Фіат'}
              active={activeFiat}
              func={() => {
                setActiveCrypto(!activeCrypto)
                setActiveFiat(!activeFiat)
              }}
            />
            <BtnSwitcher
              content={'Криптовалюта'}
              active={activeCrypto}
              func={() => {
                setActiveCrypto(!activeCrypto)
                setActiveFiat(!activeFiat)
              }}
            />
          </div>
        </div>
        <div className={s.currencies_table_container}>
          <div className={s.currencies_table}>
            <div className={s.table_head}>
              <div className={s.head_1}>
                <div className={s.head_item}>Валюта</div>
                <div className={s.head_item}>Купівля</div>
                <div className={s.head_item}>Продаж</div>
                <div className={s.head_item}>Купівля</div>
                <div className={s.head_item}>Продаж</div>
                <div className={s.head_item}>Заявка на обмін</div>
              </div>
              <div className={s.head_2}>
                <div className={s.head_item_one}></div>
                <div className={s.head_item_two}>Оптовий курс від 1000 у.о.</div>
                <div className={s.head_item_two}>Оптовий курс від 5000 у.о.</div>
                <div className={s.head_item_one}></div>
              </div>
            </div>
            {(!seeAll ? currUAN : currUAN.slice(0, countCurrencies)).map((item: CurrencyRateItem, index: number) => {
              return (
                <div key={item.id} className={s.body_line}>
                  <div className={s.head_item}>{item.currency.code}</div>
                  <div className={s.head_item}>{item.from_1000?.buy1000 ?? '—'}</div>
                  <div className={s.head_item}>{item.from_1000?.sell1000 ?? '—'}</div>
                  <div className={s.head_item}>{item.from_5000?.buy5000 ?? '—'}</div>
                  <div className={s.head_item}>{item.from_5000?.sell5000 ?? '—'}</div>
                  <div className={s.head_item}>Some btn</div>
                </div>
              );
            })}

          </div>
          <div className={s.currencies_table_footer}>
            <div className={s.btn_see_all} onClick={() => setSeeAll(!seeAll)}>
              <span>{seeAll ? currencies.seeAll.text : currencies.seeSome.text}</span>

              <div
                dangerouslySetInnerHTML={{
                  __html: seeAll ? currencies.seeAll.icon : currencies.seeSome.icon,
                }}
              />
            </div>
            <div className={s.status_update}>
              <div dangerouslySetInnerHTML={{ __html: currencies.iconStatus }} />
              <span>Оновлено {lastUpdate}</span>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
