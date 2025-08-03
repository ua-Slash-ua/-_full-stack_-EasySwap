'use client'
import s from './PromiseSection.module.css'

export default function PromiseSection({ block, locale }: { block: any; locale: string }) {
  const items = [
    { text: block.title, svg: block.icon, word: block.word},
    { text: block.title, svg: block.icon, word: block.word},
    { text: block.title, svg: block.icon, word: block.word},
  ]

  return (
    <>
      <section className={s.promise_section}>
        <div className={s.promise_container}>
          <div className={s.promise_item}>
            <p>{block.title}</p>
            <div className={s.promise}>
              <div
                dangerouslySetInnerHTML={{ __html: block.icon }}
              />
              <span>{block.word}</span>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
