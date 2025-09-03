import s from './HeroItem.module.css'
import { HeroItemProps } from '@/props/HeroItemProps'

export default function HeroItem({ icon, title, description }: HeroItemProps) {
  return (
    <>
      <div className={s.hero_item}>
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
      </div>
    </>
  )
}
