'use client'
import s from './FAQItem.module.css'
import { FAQItemProps } from '@/props/FAQItemProps'
import { useState } from 'react'
import { faqIcons } from '@/config/faq.config'
import { motion } from 'framer-motion'

export default function FAQItem({ question, answer }: FAQItemProps) {
  const [active, setActive] = useState(false)
  return (
    <>
      <motion.li
        className={`${s.faq_item} ${active ? s.active : ''}`}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        viewport={{ once: false, amount: 0.2 }}
      >
        <div className={s.title_container} onClick={() => setActive(!active)}>
          <p className={question}>{question}</p>
          <div
            className={`${s.icon} ${active ? s.active_svg : s.disabled_svg}`}
            dangerouslySetInnerHTML={{ __html: active ? faqIcons.active : faqIcons.disabled }}
          />
        </div>
        <p className={s.answer}>{answer}</p>
      </motion.li>
    </>
  )
}
