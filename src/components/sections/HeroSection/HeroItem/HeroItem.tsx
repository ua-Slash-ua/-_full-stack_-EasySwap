import s from './HeroItem.module.css'
import { HeroItemProps } from '@/props/HeroItemProps'

export default function HeroItem({ icon, title, description }: HeroItemProps) {
  return (
    <>
      <div className={s.hero_item}>
        <div className={s.hero_item_title}>
          <div className={s.hero_icon}
            dangerouslySetInnerHTML={{
              __html: `
      <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
        <foreignObject x="-7.14286" y="-7.14286" width="54.2857" height="54.2857">
          <div xmlns="http://www.w3.org/1999/xhtml" style="backdrop-filter:blur(3.57px);clip-path:url(#bgblur_0_525_2027_clip_path);height:100%;width:100%;display:flex;align-items:center;justify-content:center">
            ${icon}
          </div>
        </foreignObject>
        <circle data-figma-bg-blur-radius="7.14286" cx="20" cy="20" r="20" fill="white" fill-opacity="0.1"/>
        <defs>
          <clipPath id="bgblur_0_525_2027_clip_path" transform="translate(7.14286 7.14286)">
            <circle cx="20" cy="20" r="20"/>
          </clipPath>
        </defs>
      </svg>
    `,
            }}
          ></div>

          <span>{title}</span>
        </div>
        <div className={s.hero_item_description}>{description}</div>
      </div>
    </>
  )
}
