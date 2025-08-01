import s from './DoubleLine.module.css'
import { DoubleLineProps } from '@/props/DoubleLineProps'
export default function DoubleLine({icon, content}:DoubleLineProps) {
  return(
    <>
      <div className={s.line_item}>
        <div dangerouslySetInnerHTML={{ __html: icon }} />
        <p>{content}</p>
      </div>
    </>
  )
}