import s from './NumberCard.module.css'
import { NumberCardProps } from '@/props/NumberCardProps'

export default function NumberCard({ card_title, card_number, card_description }: NumberCardProps) {
  return (
    <>
      <div className={s.card_item}>
        <p>{card_description}</p>
        <div>
          <span>{card_number}</span>
          <p>{card_title}</p>
        </div>
      </div>
    </>
  )
}
