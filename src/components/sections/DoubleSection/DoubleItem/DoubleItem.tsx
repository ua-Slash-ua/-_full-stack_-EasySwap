'use client'
import { DoubleItemProps } from '@/props/DoubleItemProps'
import s from './DoubleItem.module.css'
import DoubleLine from '@/components/sections/DoubleSection/DoubleItem/DoubleLine/DoubleLine'
import Image from 'next/image'
import { motion } from 'framer-motion'

export default function DoubleItem({ title, icon, lines, isRight = false }: DoubleItemProps) {
  const right = isRight ? 300 : -300
  return (
    <>
      <motion.div
        className={s.item}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{
          duration: 0.5,
          ease: 'easeOut',
        }}
      >
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
        <div className={isRight ? s.icon_other : s.icon_main}>
          <Image src={icon} alt={'image'} />
        </div>
      </motion.div>
    </>
  )
}
