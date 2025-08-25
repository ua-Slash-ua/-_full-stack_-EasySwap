import s from './MenuItem.module.css'
import { MenuItemProps } from '@/props/MenuItemProps'
import Link from 'next/link'

export default function MenuItem({link,text,func}:MenuItemProps) {
  function simple() {

  }
  return(
    <>
      <li className={s.link_li}>
        <Link
          className={s.link}
          href={link}
          onClick={func}
        >
          {text}
        </Link>
      </li>
    </>
  )
}