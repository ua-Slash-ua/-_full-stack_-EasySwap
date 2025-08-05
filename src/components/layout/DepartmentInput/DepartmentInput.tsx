'use client'
import { useState } from 'react'
import s from './DepartmentInput.module.css'
import { applicationConfig } from '@/config/application.config'

type DepartmentInputProps = {
  departments: any[]
  text: string
}

export default function DepartmentInput({ text, departments }: DepartmentInputProps) {
  const [active, setActive] = useState(false)
  const [department, setDepartment] = useState('')

  return (
    <>
      <div className={s.container_application_department}>
        <label htmlFor="" className={s.form_label}>
          {text}
        </label>
        <div className={s.select_container}>
          <input
            className={s.form_input}
            type="text"
            value={department}
            placeholder={departments[0].address}
            onChange={e => setDepartment(e.target.value)}
          />
          <ul className={`${s.options_container} ${active ? s.active : ''}`}>
            {departments.map((department: any, index: number) => (
              <li
                key={index}
                onClick={e => {
                  setDepartment(department.address)
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
    </>
  )
}
