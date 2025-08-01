import { checkClick } from './checkClick'
import styles from './ButtonSwitch.module.css'

type BtnProps = {
  name: string
  data_id_container: string
  isActive: boolean
  onClick: (id: string) => void
}

export default function ButtonSwitch({ name, data_id_container, isActive, onClick }: BtnProps) {
  return (
    <input
      type={'button'}
      data-id-container={data_id_container}
      onClick={(e: React.MouseEvent<HTMLInputElement>) => {
        onClick(data_id_container)
        checkClick(e)
      }}
      className={`${styles.btn_switch} ${isActive ? styles.btn_active : ''}`}
      value={name}
    />
  )
}
