'use client'
import s from './NumberCard.module.css'
import { NumberCardProps } from '@/props/NumberCardProps'
import SpotlightCard from '@/libs/SpotlightCard/SpotlightCard'
import { motion } from "framer-motion";

export default function NumberCard({ card_title, card_number, card_description,card_id }: NumberCardProps) {

  return (
    <motion.div
      initial={{ opacity: 0, x: 20, scale: 0.2 }}
      whileInView={{ opacity: 1, x: 0, scale: 1 }}
      viewport={{ once: false, amount: 0.2 }}
      transition={{
        duration: 0.6,
        ease: "easeOut",
        delay: card_id * 0.2,
      }}
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
