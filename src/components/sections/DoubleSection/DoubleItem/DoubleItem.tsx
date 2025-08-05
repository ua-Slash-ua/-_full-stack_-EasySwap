import { DoubleItemProps } from '@/props/DoubleItemProps'
import s from './DoubleItem.module.css'
import DoubleLine from '@/components/sections/DoubleSection/DoubleItem/DoubleLine/DoubleLine'

export default function DoubleItem({ title, icon, lines }: DoubleItemProps) {
  return (
    <>
      <div className={s.item}>
        <h4>{title}</h4>
        <div className={s.content}>
          {lines.map((line, index) => (
            <DoubleLine
              key={index}
              icon={line.why_icon ?? line.what_icon}
              content={line.why_description ?? line.what_description}
            />
          ))}
        </div>
        <div className={s.icon_main} dangerouslySetInnerHTML={{ __html: icon }} />
      </div>
    </>
  )
}
