'use client'
import { useState } from 'react'
import s from './DepartmentInput.module.css'
import { applicationConfig } from '@/config/application.config'

type DepartmentInputProps = {
  departments: any[]
  text: string
  value: string
  onChange: (value: string) => void
}

export default function DepartmentInput({
                                          text,
                                          departments,
                                          value,
                                          onChange,
                                        }: DepartmentInputProps) {
  const [active, setActive] = useState(false)

  return (
    <div className={s.container_application_department}>
      <label htmlFor="" className={s.form_label}>
        {text}
      </label>
      <div className={s.select_container}>
        <input
          className={s.form_input}
          type="text"
          value={value}
          placeholder={departments[0]?.address || 'Оберіть відділення'}
          onChange={e => onChange(e.target.value)}
          readOnly
        />
        <ul className={`${s.options_container} ${active ? s.active : ''}`}>
          {departments.map((department: any, index: number) => (
            <li
              key={index}
              onClick={() => {
                onChange(department.address)
                setActive(false)
              }}
            >
              {department.address}
            </li>
          ))}
        </ul>
        <div className={s.btn} onClick={() => setActive(!active)}>
          <div
            dangerouslySetInnerHTML={{
              __html: active ? applicationConfig.iconHide : applicationConfig.iconShow,
            }}
          />
        </div>
      </div>
    </div>
  )
}
