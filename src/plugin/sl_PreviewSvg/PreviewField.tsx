'use client'
import React, { useRef } from 'react'
import { useField } from '@payloadcms/ui'
import styles from './PreviewField.module.css'

const PreviewField = (props: any) => {
  const { path, field } = props
  const { value, setValue } = useField<string>({ path })
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  return (
    <div className="field-type textarea">
      <label className="field-label">{field.label?.en}</label>
      <div className={`textarea-outer ${styles.preview_svg_container_textarea}`}>
        <textarea
          ref={textareaRef}
          className={styles.preview_svg_container_textarea}
          value={value || ''}
          onChange={(e) => setValue(e.target.value)}
          rows={10}
          placeholder='asd'
        />
      </div>
      <div
        className={styles.preview_svg_content}
        dangerouslySetInnerHTML={{ __html: value || '' }}
      />
    </div>
  )
}

export default PreviewField
