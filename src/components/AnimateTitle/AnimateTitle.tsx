'use client'

import { motion } from 'framer-motion'
import { AnimateTitleProps } from '@/props/AnimateTitleProps'

export default function AnimateTitle({ tagName, className, text, delayCount }: AnimateTitleProps) {
  const letters = text.split('')

  // Контейнер для stagger (затримка між буквами)
  const containerVariant = {
    hidden: {},
    show: {
      transition: {
        delayChildren: delayCount ? delayCount * 0.05 : 0, // Затримка перед стартом анімації
        staggerChildren: 0.05, // затримка між буквами
      },
    },
  }

  const letterVariant = {
    hidden: { opacity: 0, y: -20 },
    show: { opacity: 1, y: 0 },
  }

  // Динамічний тег
  const MotionTag = motion[tagName as keyof typeof motion] as typeof motion.div

  return (
    <MotionTag
      className={className}
      variants={containerVariant}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.2 }}
    >
      {letters.map((letter, idx) => (
        <motion.span
          key={idx}
          variants={letterVariant}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          style={{ display: 'inline-block', letterSpacing: '-0.05417rem' }}
        >
          {letter === ' ' ? '\u00A0' : letter}
        </motion.span>
      ))}
    </MotionTag>
  )
}
