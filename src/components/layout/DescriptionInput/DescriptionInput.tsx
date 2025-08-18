'use client'
import s from './DescriptionInput.module.css'
import React from 'react'

type DescriptionInputProps = {
  name: string
  label?: string
  className?: string
  placeHolder?: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export default function DescriptionInput({
  name,
  label,
  className,
  placeHolder,
  value,
  onChange,
}: DescriptionInputProps) {
  return (
    <div className={`${s.description_application} ${className ?? ''}`}>
      <label htmlFor={name}>{label ?? 'Опишіть запит'}</label>
      <input
        name={name}
        id={name}
        className={s.form_label}
        type="text"
        placeholder={placeHolder ?? '100$ купюри старого зразка'}
        onChange={onChange}
        value={value}
      />
    </div>
  )
}
