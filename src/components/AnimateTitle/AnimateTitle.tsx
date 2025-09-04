'use client'

import { motion } from 'framer-motion'
import { AnimateTitleProps } from '@/props/AnimateTitleProps'

export default function AnimateTitle({ tagName, className, text }: AnimateTitleProps) {
  const words = text.split(' ')

  const wordVariant = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  // Безпечне приведення для TypeScript
  const MotionTag = motion[tagName as unknown as keyof typeof motion] as typeof motion.div

  return (
    <MotionTag className={className}>
      {words.map((word, idx) => (
        <motion.span
          key={idx}
          variants={wordVariant}
          initial="hidden"
          animate="show"
          transition={{ duration: 0.5, ease: 'easeOut', delay: idx * 0.1 }}
          style={{ display: 'inline-block', marginRight: '0.25em' }}
        >
          {word}
        </motion.span>
      ))}
    </MotionTag>
  )
}
