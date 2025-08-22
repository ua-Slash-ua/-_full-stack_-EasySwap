import './BtnPhone.css'
import s from './BtnPhone.module.css'

import StarBorder from '@/libs/StarBorder/StarBorder'

type BtnPhoneProps = {
  svgIcon: string
  phone: string
  isReversed?: boolean
}

export default function BtnPhone({ svgIcon, phone, isReversed = false }: BtnPhoneProps) {
  return (
    <>
      <StarBorder
        as="div"
        className={`${isReversed ? s.btn_phone_reversed : s.btn_phone} ${isReversed ? 'btn_phone_reversed' : 'btn_phone'}`}
        speed="5s"
        color={'#622FF1'}
      >
        <div dangerouslySetInnerHTML={{ __html: svgIcon }} />

        <span>{phone}</span>
      </StarBorder>
    </>
  )
}
