'use client'
import s from './NumberCard.module.css'
import { NumberCardProps } from '@/props/NumberCardProps'
import SpotlightCard from '@/libs/SpotlightCard/SpotlightCard'
import { motion } from "framer-motion";

export default function NumberCard({ card_title, card_number, card_description,card_id }: NumberCardProps) {

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      viewport={{ once: false, amount: 0.3 }}
    >
      <SpotlightCard
        className="custom-spotlight-card"
        spotlightColor="rgba(183, 146, 255, 1)"
      >
        <div className={s.card_item}>
          <p className={"hide"}>{card_description}</p>
          <div>
            <span>{card_number}</span>
            <p>{card_title}</p>
          </div>
          <p className={"show"}>{card_description}</p>
        </div>
      </SpotlightCard>
    </motion.div>
  )
}
