import s from './HeroItem.module.css'
import { HeroItemProps } from '@/props/HeroItemProps'
import { motion } from 'framer-motion'

export default function HeroItem({ icon, title, description }: HeroItemProps) {
  return (
    <>
      <motion.div
        className={s.hero_item}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'linear' }}
        viewport={{ once: false, amount: 0.2 }}
      >
        <div className={s.hero_item_title}>
          <div
            className={s.hero_icon}
            dangerouslySetInnerHTML={{
              __html: icon,
            }}
          ></div>

          <span>{title}</span>
        </div>
        <div className={s.hero_item_description}>{description}</div>
      </motion.div>
    </>
  )
}
