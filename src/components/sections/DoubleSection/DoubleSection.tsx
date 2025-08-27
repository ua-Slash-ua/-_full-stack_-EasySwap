import s from './DoubleSection.module.css'
import DoubleItem from '@/components/sections/DoubleSection/DoubleItem/DoubleItem'
import first from 'public/icons/Arrows.png'
import second from 'public/icons/money-bag.png'

export default function DoubleSection({ block, locale }: { block: any; locale: string }) {
  return (
    <>
      <section className={s.double_section}>
        <DoubleItem
          title={block.why_we_the_best.title}
          icon={first}
          lines={block.why_we_the_best.why_point}
        />
        <DoubleItem
          title={block.what_do_you_get.title}
          icon={second}
          lines={block.what_do_you_get.what_point}
          isRight={true}
        />
      </section>
    </>
  )
}