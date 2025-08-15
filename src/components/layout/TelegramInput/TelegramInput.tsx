'use client'
import s from './TelegramInput.module.css'
import React from 'react'

type TelegramProps = {
  name: string
  label?: string
  className?: string
  placeHolder?: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export default function TelegramInput({
                                        name,
                                        className,
                                        placeHolder,
                                        label,
                                        value,
                                        onChange,
                                      }: TelegramProps) {
  return (
    <div className={`${s.telegram_container} ${className ?? ''}`}>
      <label htmlFor={name}>{label ?? 'Telegram'}</label>
      <input
        type="text"
        name={name}
        id={name}
        placeholder={placeHolder ?? '@nickname'}
        value={value}
        onChange={onChange}
      />
    </div>
  )
}
