import s from './Menu.module.css'
import { menu } from '@/config/menu.config'
import MenuItem from '@/components/Header/Menu/MenuItem/MenuItem'

export default function Menu() {
  return (
    <>
      <nav className={s.header_menu}>
        <ul>
          {menu.map(
            (item, index) =>
              item.main && <MenuItem link={item.link} text={item.text} key={index} />,
          )}
        </ul>
      </nav>
    </>
  )
}
