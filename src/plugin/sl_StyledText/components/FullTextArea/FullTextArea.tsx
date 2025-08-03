'use client'
import styles from './FullTextArea.module.css'

type FullTextAreaProps = {
  content: string
  onChange: (content: any) => void
}
export default function FullTextArea({ content, onChange }: FullTextAreaProps) {
  return (
    <div className={styles.fulltext_container} id="fulltext_container" style={{ display: 'none'}}>
      <textarea
        className={styles.fulltext_textarea}
        cols={60}
        rows={10}
        value={content}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Введіть HTML-код тут..."
      />
    </div>
  )
}
