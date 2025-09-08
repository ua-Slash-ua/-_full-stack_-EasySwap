'use client'
import s from './HeroSection.module.css'
import Image from 'next/image'
import back from 'public/hero/Hero_bg.png'
import back_mob from 'public/hero/hero_mob.svg'
import icon_1 from 'public/hero/return.png'
import icon_2 from 'public/hero/euro.png'
import HeroItem from '@/components/sections/HeroSection/HeroItem/HeroItem'
import { heroItem } from '@/config/heroItem.config'
import BtnSwitcher from '@/components/layout/BtnSwitcher/BtnSwitcher'
import { useEffect, useRef, useState } from 'react'
import Exchanger from '@/components/Exchanger/Exchanger'
import { usePopup } from '@/context/PopupContext'
import { currencies } from '@/config/currencies.config'
import BtnPhone from '@/components/layout/BtnPhone/BtnPhone'
import { contacts } from '@/config/contacts.config'
import { motion } from 'framer-motion'
import AnimateTitle from '@/components/AnimateTitle/AnimateTitle'

export default function HeroSection({
  block,
  departments,
}: {
  block: any[]
  departments: any[]
}) {
  const { setOpen } = usePopup()
  const divRef = useRef<HTMLDivElement>(null)
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

  function reverseCurrency() {
    const temp = currCode
    changeCurrCode(currCodeExc.code, currCodeExc.isAge)
    changeCurrCodeExc(temp.code, temp.isAge)
  }

  const [filteredCurrencies, setFilteredCurrencies] = useState<any[]>([])

  useEffect(() => {
    const filtered = block.filter(item => {
      if (activeFiat) return item.cat_type === 'fiat'
      if (activeCrypto) return item.cat_type === 'crypto'
      return true
    })
    setFilteredCurrencies(filtered)
  }, [block, activeFiat, activeCrypto, main])

  useEffect(() => {}, [currCodeExc])

  return (
    <>
      <section className={s.section_hero} id={'main'}>
        <div
          className={`${s.hero_main} hide`}
          style={{
            backgroundImage: `url(${back.src})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <motion.div
            className={s.hero_container}

            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'linear' }}
            viewport={{ once: false, amount: 0.2 }}
          >
            <div className={s.hero_header}>
              <p>
                <AnimateTitle tagName={'span'} text={'easy'} className={s.swap}/>
                <AnimateTitle tagName={'span'} text={'swap'} delayCount={0.3}/>

                {/*<span className={s.swap}>easy </span>*/}
                {/*swap*/}
              </p>
              <div className={s.hero_header_icons}>
                <Image src={icon_1} alt="Hero background" />
                <Image src={icon_2} alt="Hero background" />
              </div>
            </div>
            <div className={s.hero_description}>
              <AnimateTitle tagName={'p'} text={'надійний помічник у валютних операціях'} delayCount={1}/>
              {/*<p>- надійний помічник у валютних операціях</p>*/}
            </div>
          </motion.div>

          <div className={`${s.hero_items} hide`}>
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
          <div className={`${s.image_container} show`}>
            <Image src={back_mob.src} alt={'background'} width={100} height={100} />
            <div className={`${s.circle_mob} show`}></div>
            <div className={`${s.circle_mob_small} show`}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="126"
                viewBox="0 0 40 126"
                fill="none"
              >
                <foreignObject x="-20" y="-20" width="80" height="166">
                  <div
                    style={{
                      backdropFilter: 'blur(10px)',
                      clipPath: 'url(#bgblur_0_365_19385_clip_path)',
                      height: '100%',
                      width: '100%',
                    }}
                  />
                </foreignObject>

                <ellipse
                  data-figma-bg-blur-radius="20"
                  cx="20"
                  cy="63"
                  rx="20"
                  ry="63"
                  fill="#D9D9D9"
                  fillOpacity="0.01"
                />

                <defs>
                  <clipPath id="bgblur_0_365_19385_clip_path" transform="translate(20 20)">
                    <ellipse cx="20" cy="63" rx="20" ry="63" />
                  </clipPath>
                </defs>
              </svg>
            </div>
          </div>

          <div className={`${s.hero_container} show`}>
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
          <motion.div
            className={s.calculator}

            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut', delay: 1.2 }}
            viewport={{ once: false, amount: 0.2 }}
          >
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
                content={
                  <div
                    className={s.btn_replace}
                    onClick={() => {
                      setMain(true)
                      reverseCurrency()
                    }}
                  >
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
                  </div>
                }
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
            <div
              className={s.btn_exchange}
              onClick={() => setOpen('exchange_application', departments)}
            >
              <span>Обміняти валюту</span>
            </div>
          </motion.div>
          <div className={`${s.hero_items} show`}>
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
        </aside>
        <div className={`${s.phone_container} hide`}>
          <BtnPhone
            svgIcon={contacts.iconPhone.replace('#7C4DF5', 'white')}
            phone={''}
            isReversed={true}
          />
        </div>
        <div className={`${s.circle} hide`}></div>
      </section>
    </>
  )
}
