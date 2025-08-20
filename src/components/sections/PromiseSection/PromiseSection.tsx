'use client'
import s from './PromiseSection.module.css'

export default function PromiseSection({ block, locale }: { block: any; locale: string }) {
  const items = [
    { text: block.title, svg: block.icon, word: block.word },
    { text: block.title, svg: block.icon, word: block.word },
    { text: block.title, svg: block.icon, word: block.word },
    { text: block.title, svg: block.icon, word: block.word },
    { text: block.title, svg: block.icon, word: block.word },
    { text: block.title, svg: block.icon, word: block.word },
  ]

  return (
    <>
      <section className={s.promise_section}>
        <div className={s.promise_container}>
          <div className={s.scroller}>
            {[...items].map((item, index) => (
              <div key={index} className={s.promise_item}>
                <p>{item.text}</p>
                <div className={`${s.promise}`}>
                  <div dangerouslySetInnerHTML={{ __html: item.svg }} />
                  <span>{item.word}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className={s.blur}>
          <div className={s.blur_item}></div>
          <div className={s.blur_item}></div>
        </div>
      </section>
    </>
  )
}
