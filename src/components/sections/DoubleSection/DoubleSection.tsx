import s from './DoubleSection.module.css'
import DoubleItem from '@/components/sections/DoubleSection/DoubleItem/DoubleItem'

export default function DoubleSection({ block, locale }: { block: any; locale: string }) {
  return (
    <>
      <section className={s.double_section}>
        <DoubleItem
          title={block.why_we_the_best.title}
          icon={block.why_we_the_best.icon_why}
          lines={block.why_we_the_best.why_point}
        />
        <DoubleItem
          title={block.what_do_you_get.title}
          icon={block.what_do_you_get.icon_what}
          lines={block.what_do_you_get.what_point}
        />
      </section>
    </>
  )
}