'use client'
import s from '@/components/AccordionBlock/AccordionBlock.module.css'
import { faqIcons } from '@/config/faq.config'
import { useEffect, useState } from 'react'

import { AccItem } from '@/props/AccordionProps'
import { convertLexicalToHTMLAsync } from '@payloadcms/richtext-lexical/html-async'

export default function AccordionItem({ item, index }: { item: AccItem; index: number }) {
  const [active, setActive] = useState(true)
  const [html, setHtml] = useState<string>('')

  useEffect(() => {
    async function convert() {
      const converted = await convertLexicalToHTMLAsync({
        data: item.content,
      })
      setHtml(converted)
    }

    void convert()
  }, [item])
  return (
    <>
      <li className={`${s.item} ${active ? s.active : ''}`}>
        <div className={s.item_header}>
          <div>
            {index + 1}. {item.title}
          </div>

          <div
            className={`${s.icon} ${active ? s.active_svg : s.disabled_svg}`}
            dangerouslySetInnerHTML={{ __html: active ? faqIcons.active : faqIcons.disabled }}
            onClick={() => setActive(!active)}
          />
        </div>

        {active && (
          <div
            className={s.item_content}
            dangerouslySetInnerHTML={{
              __html: html,
            }}
          />
        )}
      </li>
    </>
  )
}
