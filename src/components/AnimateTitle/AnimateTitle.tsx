'use client'
import s from './AnimateTitle.module.css'
import { motion } from 'framer-motion'
import { AnimateTitleProps } from '@/props/AnimateTitleProps'

export default function AnimateTitle({
  tagName,
  className,
  text,
  delayCount,
  whiteEnd = true,
}: AnimateTitleProps) {
  const words = text.split(' ') // 🔹 розбиваємо на слова

  // Контейнер для stagger (затримка між словами)
  const containerVariant = {
    hidden: {},
    show: {
      transition: {
        delayChildren: delayCount ? delayCount * 0.3 : 0, // Затримка перед стартом
        staggerChildren: 0.15, // затримка між словами
      },
    },
  }

  const wordVariant = {
    hidden: { opacity: 0, y: '100%', rotate: 10 },
    show: { opacity: 1, y: 0, rotate: 0 },
  }

  // Динамічний тег
  const MotionTag = motion[tagName as keyof typeof motion] as typeof motion.div

  return (
    <MotionTag
      className={s.tag_style}
      variants={containerVariant}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.2 }}
    >
      {words.map((word, idx) => (
        <motion.span
          key={idx}
          className={className}
          variants={wordVariant}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          style={{ display: 'inline-block' }}
        >
          {word}{whiteEnd ? '\u00A0' : ''}
        </motion.span>
      ))}
    </MotionTag>
  )
}
