'use client'
import { useState, useEffect, useRef } from 'react'
import s from './DepartmentInput.module.css'
import { applicationConfig } from '@/config/application.config'

type DepartmentInputProps = {
  departments: any[]
  text: string
  name?: string
  value: string
  onChange: (value: string) => void
}

export default function DepartmentInput({
                                          name,
                                          text,
                                          departments,
                                          value,
                                          onChange,
                                        }: DepartmentInputProps) {
  const [active, setActive] = useState(false)
  const [address, setAddress] = useState('')
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

  return (
    <div className={s.container_application_department} ref={containerRef}>
      <label htmlFor={name} className={s.form_label}>
        {text ?? 'Оберіть відділення'}
      </label>
      <div className={s.select_container}>
        <input
          className={s.form_input}
          type="text"
          value={address || value}
          placeholder={departments[0]? `${departments[0].address} ${departments[0].description}` :   'Оберіть відділення'}
          onChange={e => {
            setAddress(e.target.value) // оновлюємо локальний стан
            onChange(e.target.value)   // повідомляємо батьків
          }}
          id={name}
          name={name}
        />
        <ul className={`${s.options_container} ${active ? s.active : ''}`}>
          {departments.map((department: any, index: number) => (
            <li
              key={index}
              onClick={() => {
                onChange(department.address)
                setAddress(`${department.address} ${department.description}`)
                setActive(false)
              }}
            >
              {department.address} {department.description}
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
