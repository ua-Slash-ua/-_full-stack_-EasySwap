import './BtnPhone.css'
import s from './BtnPhone.module.css'

import StarBorder from '@/libs/StarBorder/StarBorder'
import Link from 'next/link'

type BtnPhoneProps = {
  svgIcon: string
  phone: string
  isReversed?: boolean
  isMobileMenu?: boolean
}

export default function BtnPhone({ svgIcon, phone, isReversed = false, isMobileMenu = false }: BtnPhoneProps) {
  return (
    <Link href={`tel:${phone}`} className="no-underline" target={'_blank'}>
      <StarBorder
        as="div"
        className={`${isReversed ? s.btn_phone_reversed : s.btn_phone} ${
          isReversed ? 'btn_phone_reversed' : 'btn_phone'
        } ${isMobileMenu ? 'btn_phone_mob_menu' : ''} `}
        speed="5s"
        color={'#622FF1'}
      >
        <div dangerouslySetInnerHTML={{ __html: svgIcon }} />
        <span>{phone}</span>
      </StarBorder>
    </Link>
  )
}

