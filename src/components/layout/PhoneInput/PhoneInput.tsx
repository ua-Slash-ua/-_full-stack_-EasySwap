'use client'
import s from './PhoneInput.module.css'
import React, { useState } from 'react'
import { applicationConfig } from '@/config/application.config'
import { phones } from '@/config/phone.config'

type PhoneInputProps = {
  activeCode?: string
  label?: string
  name: string
  className?: string
  placeHolder?: string
}

export default function PhoneInput({ label, name, className, placeHolder,activeCode = 'ua' }: PhoneInputProps) {
  const [code, setCode] = useState(
    phones.find((phone: any) => phone.iso === activeCode)?.code ?? '+380'
  )
  const [partPhone, setPartPhone] = useState('')
  const [value, setValue] = useState('')

  const [active, setActive] = useState(false)
  const [focused, setFocused] = useState(false);
  return (
    <>
      <div className={`${s.phone_container} ${className ?? ''}`}>
        <label htmlFor={name}>{label ?? 'Номер телефону'}</label>
        <input type="text" hidden={true} name={name} id={name} value={value} />
        <div className={`${s.input_container} ${focused ? s.focused : ''}`}>
          <div className={s.choose_code}>
            <div className={s.choose_code_text} onClick={() => setActive(!active)}>
              <span>{code}</span>
              <div
                dangerouslySetInnerHTML={{
                  __html: active ? applicationConfig.iconHide : applicationConfig.iconShow,
                }}
              />
            </div>
            <ul className={`${s.choose_code_container} ${active ? s.active : ''}`}>
              {phones.map((phone: any, index: number) => (
                <>
                  <li
                    key={index}
                    onClick={e => {
                      setCode(phone.code)
                      setActive(!active)
                      setValue(`${phone.code} ${partPhone}`)
                    }}
                  >
                    {phone.code}
                  </li>
                </>
              ))}
            </ul>
          </div>

          <input
            type="number"
            placeholder={placeHolder ?? '00 000 00 00'}
            onChange={e => {
              let value = e.target.value
              if (value.length > 9) {
                value = value.slice(0, 9)
              }
              setPartPhone(value)
              setValue(`${code} ${value}`)
            }}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            value={partPhone}
          />
        </div>
      </div>
    </>
  )
}
