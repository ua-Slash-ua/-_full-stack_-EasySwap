'use client'
import s from './DescriptionInput.module.css'
import React from 'react'
type DescriptionInputProps = {
  name: string
  label?: string
  className?: string
  placeHolder?: string
}
export default function DescriptionInput({ name, label, className, placeHolder }:DescriptionInputProps) {
  const [description, setDescription] = React.useState('')
  return (
    <>
      <div className={`${s.description_application} ${className ?? ''}`}>
        <label htmlFor={name ?? ''}>{label ?? 'Опишіть запит'}</label>
        <input
          name={name ?? ''}
          id={name ?? ''}
          className={s.form_label}
          type="text"
          placeholder={placeHolder ?? '100$ купюри старого зразка'}
          onChange={e => {
            setDescription(e.target.value)
          }}
          value={description}
        />
      </div>
    </>
  )
}
