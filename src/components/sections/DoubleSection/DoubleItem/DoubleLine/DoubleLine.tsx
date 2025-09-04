'use client'

import s from './DoubleLine.module.css'
import { DoubleLineProps } from '@/props/DoubleLineProps'
import { motion } from 'framer-motion'

export default function DoubleLine({ icon, content }: DoubleLineProps) {
  return (
    <>
      <motion.div
        className={s.line_item}

        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0 }}
        transition={{
          duration: 0.5,
          ease: "easeOut",
          delay: 0.5,
        }}
      >
        <div dangerouslySetInnerHTML={{ __html: icon ?? 'not found' }} />
        <p>{content}</p>
      </motion.div>
    </>
  )
}
