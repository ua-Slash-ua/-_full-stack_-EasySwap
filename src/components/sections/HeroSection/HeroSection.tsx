'use client'
import s from './HeroSection.module.css'
import Image from 'next/image'
import back from 'public/hero/Hero_bg.png'
import icon_1 from 'public/hero/return.png'
import icon_2 from 'public/hero/euro.png'
import HeroItem from '@/components/sections/HeroSection/HeroItem/HeroItem'
import { heroItem } from '@/config/heroItem.config'
import BtnSwitcher from '@/components/layout/BtnSwitcher/BtnSwitcher'
import { useEffect, useState } from 'react'
import Exchanger from '@/components/Exchanger/Exchanger'
import { usePopup } from '@/context/PopupContext'
import { currencies } from '@/config/currencies.config'

export default function HeroSection({ block, locale }: { block: any[]; locale: string }) {
  const { setOpen } = usePopup()

  const [main, setMain] = useState(true)

  const [activeFiat, setActiveFiat] = useState(true)
  const [activeCrypto, setActiveCrypto] = useState(false)

  const [value, setValue] = useState<number>(1)
  const [count, setCount] = useState<number>(1)
  const [currCode, setCurrCode] = useState<{ code: string; isAge: string }>({
    code: 'UAN',
    isAge: '',
  })
  const [currCodeExc, setCurrCodeExc] = useState<{ code: string; isAge: string }>({
    code: '',
    isAge: '',
  })

  function changeValue(value: number) {
    console.log('value', value)
    setValue(value)
  }

  function changeCount(count: number) {
    console.log('count', count)
    setCount(count)
  }

  function changeCurrCode(text: string, isAge: string) {
    console.log('currCode', currCode)
    setCurrCode({ code: text, isAge: isAge })
  }

  function changeCurrCodeExc(text: string, isAge: string) {
    console.log('currCodeExc', text)
    console.log('isAge', isAge)
    setCurrCodeExc({ code: text, isAge: isAge })
  }

  const [filteredCurrencies, setFilteredCurrencies] = useState<any[]>([])

  useEffect(() => {
    const filtered = block.filter(item => {
      if (activeFiat) return item.cat_type === 'fiat'
      if (activeCrypto) return item.cat_type === 'crypto'
      return true
    })
    setFilteredCurrencies(filtered)
  }, [block, activeFiat, activeCrypto])

  useEffect(() => {}, [currCodeExc])

  return (
    <>
      <section className={s.section_hero}>
        <div
          className={s.hero_main}
          style={{
            backgroundImage: `url(${back.src})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="">
            <div className={s.hero_header}>
              <p>
                <span className={s.swap}>easy </span>
                swap
              </p>
              <div className={s.hero_header_icons}>
                <Image src={icon_1} alt="Hero background" />
                <Image src={icon_2} alt="Hero background" />
              </div>
            </div>
            <div className={s.hero_description}>
              <p>- надійний помічник у валютних операціях</p>
            </div>
          </div>

          <div className={s.hero_items}>
            {heroItem.map((item, index) => {
              return (
                <HeroItem
                  key={index}
                  icon={item.icon}
                  title={item.title}
                  description={item.description}
                />
              )
            })}
          </div>
        </div>
        <aside className={s.hero_aside}>
          <div className={s.calculator}>
            <div className={s.calc_header}>
              <BtnSwitcher
                content={'Фіат'}
                active={activeFiat}
                func={() => {
                  setActiveCrypto(false)
                  setActiveFiat(true)
                }}
              />
              <BtnSwitcher
                content={'Криптовалюта'}
                active={activeCrypto}
                func={() => {
                  setActiveCrypto(true)
                  setActiveFiat(false)
                }}
              />
            </div>
            <div className={s.calc_content}>
              <Exchanger
                key={'main'}
                isMain={main}
                currencies={filteredCurrencies}
                value={value}
                changeValue={changeValue}
                count={count}
                changeCount={changeCount}
                currCode={currCode}
                currCodeExc={currCodeExc}
                changeCurrCode={changeCurrCode}
                changeCurrCodeExc={changeCurrCodeExc}
                content={<div className={s.btn_replace}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                  >
                    <path
                      d="M9 15L5 19M5 19L1 15M5 19V1M19 5L15 1M15 1L11 5M15 1V19"
                      stroke="#09090A"
                      strokeWidth="2"
                      strokeMiterlimit="10"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>}
              />
              <Exchanger
                key={'!main'}
                isMain={!main}
                currencies={filteredCurrencies}
                value={value}
                changeValue={changeValue}
                count={count}
                changeCount={changeCount}
                changeCurrCode={changeCurrCode}
                changeCurrCodeExc={changeCurrCodeExc}
                currCode={currCode}
                currCodeExc={currCodeExc}
              />

              <div className={s.calc_course}>
                <div className={s.calc_course_container}>
                  Курс: 1 <span>{currCode.code}</span>
                  <div className={s.curr_age}>
                    {currCode.isAge === 'new' ? (
                      <Image src={currencies.iconAgeNew.url} alt={currencies.iconAgeNew.alt} />
                    ) : currCode.isAge === 'old' ? (
                      <Image src={currencies.iconAgeOld.url} alt={currencies.iconAgeOld.alt} />
                    ) : null}
                  </div>
                  = <span>{count ?? '...'}</span>
                  <span>{currCodeExc.code ?? '...'}</span>
                  <div className={s.curr_age}>
                    {currCodeExc.isAge === 'new' ? (
                      <Image src={currencies.iconAgeNew.url} alt={currencies.iconAgeNew.alt} />
                    ) : currCodeExc.isAge === 'old' ? (
                      <Image src={currencies.iconAgeOld.url} alt={currencies.iconAgeOld.alt} />
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
            <div className={s.btn_exchange} onClick={() => setOpen('create_application')}>
              <span>Обміняти валюту</span>
            </div>
          </div>
        </aside>
      </section>
    </>
  )
}
