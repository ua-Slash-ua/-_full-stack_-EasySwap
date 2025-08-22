import s from './NumbersSection.module.css'
import NumberCard from '@/components/sections/NumbersSection/NumberCard/NumberCard'

export default function NumbersSection({ block, locale }: { block: any; locale: string }) {
  return (
    <>
      <section className={s.numbers_section} id={'about-service'}>
        <h3
          className={`${s.aside_card_title} show_inline`}
          dangerouslySetInnerHTML={{ __html: block.aside_title }}
        />
        <aside className={s.aside_card}>
          <h3
            className={`${s.aside_card_title} hide_inline`}
            dangerouslySetInnerHTML={{ __html: block.aside_title }}
          />
          <div className={s.aside_bottom}>
            <div className={s.aside_bottom_left}>
              <div dangerouslySetInnerHTML={{ __html: block.aside_icon }} />
            </div>
            <div className={s.aside_bottom_description}>
              <h3>{block.aside_number}</h3>
              <p>{block.aside_description}</p>
            </div>
          </div>
        </aside>
        {block?.cards?.map((card: any, index: number) => (
          <NumberCard
            key={index}
            card_title={card.card_title}
            card_number={card.card_number}
            card_description={card.card_description}
          />
        ))}
      </section>
    </>
  )
}
