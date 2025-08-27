import { DoubleItemProps } from '@/props/DoubleItemProps'
import s from './DoubleItem.module.css'
import DoubleLine from '@/components/sections/DoubleSection/DoubleItem/DoubleLine/DoubleLine'
import Image from 'next/image'

export default function DoubleItem({ title, icon, lines, isRight = false}: DoubleItemProps) {
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
        <div className={isRight? s.icon_other: s.icon_main}>
          <Image src={icon} alt={'image'}/>
        </div>
      </div>
    </>
  )
}
