import s from './MenuItem.module.css'
import { MenuItemProps } from '@/props/MenuItemProps'
import Link from 'next/link'

export default function MenuItem({link,text}:MenuItemProps) {
  return(
    <>
      <li>
        <Link
          className={s.link}
          href={link}>
          {text}
        </Link>
      </li>
    </>
  )
}