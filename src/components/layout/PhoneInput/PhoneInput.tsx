'use client'
import s from './PhoneInput.module.css'
import React, { useState, useEffect, useRef } from 'react'
import { applicationConfig } from '@/config/application.config'
import { phones } from '@/config/phone.config'

type PhoneInputProps = {
  activeCode?: string
  label?: string
  name: string
  className?: string
  placeHolder?: string
  value: string
  error?: string | null
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export default function PhoneInput({
                                     label,
                                     name,
                                     className,
                                     placeHolder,
                                     activeCode = 'ua',
                                     value,
                                     error,
                                     onChange,
                                   }: PhoneInputProps) {
  const [code, setCode] = useState(
    phones.find((phone: any) => phone.iso === activeCode)?.code ?? '+380'
  )
  const [partPhone, setPartPhone] = useState('')
  const [active, setActive] = useState(false)
  const [focused, setFocused] = useState(false)
  const containerRef = useRef<HTMLDivElement | null>(null)

  // Закриття при кліку поза контейнером
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setActive(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  // Синхронізуємо внутрішній номер з зовнішнім value
  useEffect(() => {
    const parts = (value ?? '').replace(code, '').trim()
    setPartPhone(parts)
  }, [value, code])

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newPart = e.target.value.slice(0, 9)
    setPartPhone(newPart)
    const fullPhone = `${code}${newPart}`

    // Створюємо фейковий event для Formik
    const syntheticEvent = {
      target: {
        name,
        value: fullPhone,
      },
    } as React.ChangeEvent<HTMLInputElement>

    onChange(syntheticEvent)
  }

  return (
    <div className={`${s.phone_container} ${className ?? ''}`} ref={containerRef}>
      <label htmlFor={name}>{label ?? 'Номер телефону'}</label>
      <input type="text" hidden name={name} id={name} value={value} readOnly />
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
              <li
                key={index}
                onClick={() => {
                  setCode(phone.code)
                  const fullPhone = `${phone.code} ${partPhone}`
                  const syntheticEvent = {
                    target: {
                      name,
                      value: fullPhone,
                    },
                  } as React.ChangeEvent<HTMLInputElement>
                  onChange(syntheticEvent)
                  setActive(false)
                }}
              >
                {phone.code}
              </li>
            ))}
          </ul>
        </div>

        <input
          type="number"
          placeholder={placeHolder ?? '00 000 00 00'}
          onChange={handlePhoneChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          value={partPhone}
        />
      </div>
      {error && <div className="error-message">{error}</div>}
    </div>
  )
}