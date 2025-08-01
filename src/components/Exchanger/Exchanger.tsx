'use client'
import s from './Exchanger.module.css'
import { useState } from 'react'
export default function Exchanger() {
  const [value, setValue] = useState('')
  return(
    <>
    <div className={s.exchanger}>
      <div className={s.exchanger_header}>
        <h4>Обмінюєте</h4>
        <h4>Валюта</h4>
      </div>
      <div className={s.exchanger_content}>
        <input
          type="number"
          value={value}
          onChange={(e)=>setValue(e.target.value)}
          placeholder={'0'}
        />
      </div>
    </div>
    </>
  )
}