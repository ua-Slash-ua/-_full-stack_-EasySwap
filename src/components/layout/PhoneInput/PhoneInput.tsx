'use client'
import s from './PhoneInput.module.css'
import { allCountries } from 'country-telephone-data'
import React from 'react'

type PhoneInputProps = {
  className?: string
  defaultValue?: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  groupId: string
  defaultCode: string
  placeHolder?: string
  text?: string
  dataClasses?: {
    classNameLabel?: string
    classNameSelect?: string
    classNameOption?: string
    classNameInput?: string
  }
}

export default function PhoneInput({
  className,
  defaultValue,
  groupId,
  onChange,
  defaultCode,
  placeHolder,
  dataClasses,
  text,
}: PhoneInputProps) {
  const countryCodeDefault = defaultCode ? defaultCode : 'ua'
  const countryValueDefault = `+${allCountries.find(c => c.iso2 === countryCodeDefault)?.dialCode ?? '380'}`

  const phoneDefault = defaultValue ? defaultValue : '111'

  const [phone, setPhone] = React.useState(`${countryValueDefault}${phoneDefault}`)
  const [phoneCode, setPhoneCode] = React.useState(countryValueDefault)
  const [phoneNumber, setPhoneNumber] = React.useState(phoneDefault)
  return (
    <>
      <div className={s.phone_container}>
        <label
          htmlFor={`${groupId ? groupId : ''}`}
          className={`${s.phone_input} ${className ? className : ''}`}
        >
          {text}
        </label>
        <div>
          <select
            className={dataClasses?.classNameSelect ?? ''}
            value={phoneCode}
            onChange={e => setPhoneCode(e.target.value)}
          >
            {allCountries.map((country, index) => (
              <option
                className={dataClasses?.classNameOption ?? ''}
                key={index}
                value={`+${country.dialCode}`}
              >
                {`+${country.dialCode}`}
              </option>
            ))}
          </select>

          <input
            className={`${dataClasses?.classNameInput ? dataClasses.classNameInput : ''}`}
            type="number"
            onChange={e => {
              if (e.target.value.length > 9) {
                e.target.value = e.target.value.slice(0, 9)
              }
              setPhoneNumber(`${e.target.value}`)
              setPhone(`${phoneCode} ${e.target.value}`)
            }}
            placeholder={placeHolder ? placeHolder : 'Write your phone number'}
          />
          <input
            type="text"
            id={`${groupId ? groupId : ''}`}
            name={`${groupId ? groupId : ''}`}
            value={phone}
            hidden={true}
            onChange={e => {
              onChange(e)
            }}
          />
        </div>
      </div>
    </>
  )
}
