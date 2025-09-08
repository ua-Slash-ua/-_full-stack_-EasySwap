import { AccordionProps } from '@/props/AccordionProps'
import s from './AccordionBlock.module.css'
import AccordionItem from '@/components/AccordionBlock/AccordionItem/AccordionItem'

export default function AccordionBlock({ block }: { block: AccordionProps }) {
  return (
    <ul className={`${s.container} `}>
      {block.items.map((item, index) => (
        <AccordionItem item={item} index={index} key={index} />
      ))}
    </ul>
  )
}
