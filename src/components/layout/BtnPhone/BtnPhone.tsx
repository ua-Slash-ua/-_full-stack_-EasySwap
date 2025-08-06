import './BtnPhone.css'
import s from './BtnPhone.module.css'

import StarBorder from '@/libs/StarBorder/StarBorder'

type BtnPhoneProps = {
  svgIcon: string
  phone: string
}

export default function BtnPhone({ svgIcon, phone }: BtnPhoneProps) {
  return (
    <>
      <StarBorder as="div" className={`${s.btn_phone} btn_phone`} speed="5s" color={'cyan'}>
        <div dangerouslySetInnerHTML={{ __html: svgIcon }} />

        <span>{phone}</span>
      </StarBorder>
    </>
  )
}
