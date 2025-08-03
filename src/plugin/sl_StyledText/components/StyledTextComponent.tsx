'use client'
import styles from './StyledTextComponent.module.css'
import './st_styles.css'
import ST_Header from '@/plugin/sl_StyledText/components/ST_Header/ST_Header'
import PreviewArea from '@/plugin/sl_StyledText/components/PreviewArea/PreviewArea'
import FullTextArea from '@/plugin/sl_StyledText/components/FullTextArea/FullTextArea'
import { useField } from '@payloadcms/ui'

export default function StyledTextComponent(props: any) {
  const { path, field } = props
  const { value, setValue } = useField<string>({ path })
  const setContent = (content: any) => {
    setValue(content)
  }
  return (
    <>
      <div className={styles.st_container} id="st_container">
        <ST_Header
          text={value}
          setText={setValue}
        />

        <PreviewArea
          content={value}
          onChange={setValue}
        />
        <FullTextArea
          content={value}
          onChange={setValue}
        />
      </div>
    </>
  )
}
