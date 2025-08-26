'use client'
import s from './FAQItem.module.css'
import { FAQItemProps } from '@/props/FAQItemProps'
import { useState } from 'react'
import { faqIcons } from '@/config/faq.config'

export default function FAQItem({ question, answer }: FAQItemProps) {
  const [active, setActive] = useState(false)
  return (
    <>
      <li className={`${s.faq_item} ${active ? s.active : ''}`}>
        <div className={s.title_container} onClick={() => setActive(!active)}>
          <p className={question}>{question}</p>
          <div
            className={`${s.icon} ${active ? s.active_svg : s.disabled_svg}`}
            dangerouslySetInnerHTML={{ __html: active ? faqIcons.disabled : faqIcons.active }}
          />
        </div>
        <p className={s.answer}>{answer}</p>
      </li>
    </>
  )
}
