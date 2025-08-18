import s from './BtnExchange.module.css'
import { usePopup } from '@/context/PopupContext'

export default function BtnExchange() {
  const { setOpen } = usePopup()
  return (
    <>
      <div className={s.btn_container} onClick={() => setOpen('create_application')}>
        Обміняти
      </div>
    </>
  )
}
