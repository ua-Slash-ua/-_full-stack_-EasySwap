import s from './BtnSwitcher.module.css'
import { BtnSwitcherProps } from '@/props/BtnSwitcherProps'

export default function BtnSwitcher({ content, active, func }: BtnSwitcherProps) {
  return (
    <>
      <div
        className={`${s.switcher_container} ${active ? s.active : ''}`}
        onClick={func}
      >
        {content}
      </div>
    </>
  )
}
