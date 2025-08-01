'use client'
import styles from './ButtonColor.module.css'
import { useState } from 'react'

type ButtonColorProps = {
  content: string
  onChange: (newContent: string) => void
}

export default function ButtonColor({ content, onChange }: ButtonColorProps) {
  const [color, setColor] = useState('#000000')

  const handleGetSelection = () => {
    const selection = window.getSelection()
    const previewContainer = document.getElementById('preview_container')
    const fullTextContainer = document.getElementById('fulltext_container')

    if (selection && selection.rangeCount > 0) {
      const selectedText = selection.toString()
      const anchorNode = selection.anchorNode
      const isInsidePreview = previewContainer?.contains(anchorNode)
      const isInsideFullText = fullTextContainer?.contains(anchorNode)

      if ((isInsidePreview || isInsideFullText) && selectedText) {
        const spanRegex = new RegExp(
          `<span style="color:\\s*${color.replace('#', '\\#')}">\\s*${selectedText}\\s*</span>`,
          'gi'
        )

        if (spanRegex.test(content)) {
          // 🔄 Якщо вже є span з кольором — знімаємо
          const newContent = content.replace(spanRegex, selectedText)
          onChange(newContent)
        } else {
          // ➕ Інакше — обгортаємо
          const coloredSpan = `<span style="color: ${color}">${selectedText}</span>`
          const newContent = content.replace(selectedText, coloredSpan)
          onChange(newContent)
        }
      }
    }
  }


  return (
    <div className={styles.btn_container}>
      <input
        type="button"
        value="Paint"
        className={styles.btn_input}
        onClick={handleGetSelection}
      />
      <input
        type="color"
        className={styles.btn_input_color}
        value={color}
        onChange={(e) => setColor(e.target.value)}
      />
    </div>
  )
}