'use client'
import s from './NumbersSection.module.css'
import NumberCard from '@/components/sections/NumbersSection/NumberCard/NumberCard'
import { motion } from 'framer-motion'

export default function NumbersSection({ block, locale }: { block: any; locale: string }) {
  return (
    <>
      <section className={s.numbers_section} id={'about-service'}>
        <motion.h3
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{
            duration: 0.5,
            ease: "easeOut",
          }}

          className={`${s.aside_card_title} show_inline`}
          dangerouslySetInnerHTML={{ __html: block.aside_title }}
        />
        <aside className={s.aside_card}>
          <motion.h3
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            viewport={{ once: false, amount: 0.2 }}

            className={`${s.aside_card_title} hide_inline`}
            dangerouslySetInnerHTML={{ __html: block.aside_title }}
          />
          <motion.div
            className={s.aside_bottom}

            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{
              duration: 0.5,
              ease: "easeOut",
            }}
          >
            <div className={s.aside_bottom_left}>
              <div dangerouslySetInnerHTML={{ __html: block.aside_icon }} />
            </div>
            <div className={s.aside_bottom_description}>
              <h3>{block.aside_number}</h3>
              <p>{block.aside_description}</p>
            </div>
          </motion.div>
        </aside>
        {block?.cards?.map((card: any, index: number) => (
          <NumberCard
            card_id={index}
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
