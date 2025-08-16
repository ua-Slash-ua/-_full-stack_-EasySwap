'use client'
import s from './HeroSection.module.css'
import Image from 'next/image'
import back from 'public/hero/Hero_bg.png'
import icon_1 from 'public/hero/return.png'
import icon_2 from 'public/hero/euro.png'
import HeroItem from '@/components/sections/HeroSection/HeroItem/HeroItem'
import { heroItem } from '@/config/heroItem.config'
import BtnSwitcher from '@/components/layout/BtnSwitcher/BtnSwitcher'
import { useState } from 'react'
import Exchanger from '@/components/Exchanger/Exchanger'

export default function HeroSection({ block, locale }: { block: any[]; locale: string }) {
  const [main, setMain] = useState(true)

  const [activeFiat, setActiveFiat] = useState(true)
  const [activeCrypto, setActiveCrypto] = useState(false)

  const [value, setValue] = useState< number>(0)
  const [count, setCount] = useState< number>(1)
  const [currCode,setCurrCode] = useState<string>('UAN')
  function changeValue(value: number ) {
    setValue(value)
  }
  function changeCount(count: number ) {
    setCount(count)
  }
  function changeCurrCode(currCode:string){
    setCurrCode(currCode)
  }

  const filteredCurrencies = block.filter(item => {
    if (activeFiat) return item.cat_type === 'fiat'
    if (activeCrypto) return item.cat_type === 'crypto'
  })
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
                changeCurrCode={changeCurrCode}
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
                currCode={currCode}
              />
            </div>
          </div>
        </aside>
      </section>
    </>
  )
}
