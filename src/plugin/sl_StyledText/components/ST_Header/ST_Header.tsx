'use client'
import styles from './ST_Header.module.css'
import ButtonSwitch from '@/plugin/sl_StyledText/components/Buttons/ButtonSwitch/ButtonSwitch'
import { useState } from 'react'
import ButtonItalic from '@/plugin/sl_StyledText/components/Buttons/ButtonItalic/ButtonItalic'
import ButtonBold from '@/plugin/sl_StyledText/components/Buttons/ButtonBold/ButtonBold'
import ButtonColor from '@/plugin/sl_StyledText/components/Buttons/ButtonColor/ButtonColor'


type ST_HeaderProps = {
  text: string
  setText: (val: string) => void
}

export default function ST_Header({ text, setText }: ST_HeaderProps) {
  const [activeId, setActiveId] = useState('preview_container')

  const handleClick = (id: string) => {
    setActiveId(id)
  }
  return (
    <div className={styles.st_header}>
      <div className={styles.st_header_action_container}>
        <ButtonItalic content={text} onChange={setText} />
        <ButtonBold content={text} onChange={setText} />
        <ButtonColor content={text} onChange={setText} />
      </div>
      <div className={styles.st_header_switch_container}>
        <ButtonSwitch
          name="Preview"
          data_id_container="preview_container"
          isActive={activeId === 'preview_container'}
          onClick={handleClick}
        />
        <ButtonSwitch
          name="Full text"
          data_id_container="fulltext_container"
          isActive={activeId === 'fulltext_container'}
          onClick={handleClick}
        />
      </div>
    </div>
  )
}
