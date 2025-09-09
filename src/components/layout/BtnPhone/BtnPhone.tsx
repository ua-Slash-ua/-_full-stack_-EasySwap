import './BtnPhone.css'
import s from './BtnPhone.module.css'

import StarBorder from '@/libs/StarBorder/StarBorder'
import Link from 'next/link'
import { Ref } from 'react'

type BtnPhoneProps = {
  svgIcon: string
  phone: string
  isReversed?: boolean
  isMobileMenu?: boolean
  className?: string
  ref?: Ref<HTMLDivElement> | null | undefined
}

export default function BtnPhone({
  svgIcon,
  phone,
  isReversed = false,
  isMobileMenu = false,
  className,
  ref,
}: BtnPhoneProps) {
  return (
    <Link href={`tel:${phone}`} className="no-underline" target={'_blank'}>
      <StarBorder
        as="div"
        className={`${isReversed ? s.btn_phone_reversed : s.btn_phone} ${isReversed ? 'btn_phone_reversed' : 'btn_phone'} ${isMobileMenu ? 'btn_phone_mob_menu' : ''} ${className ?? ''}`}
        ref={ref}
        speed="5s"
        color={'#622FF1'}
      >
        <div className={s.btn_phone_icon} dangerouslySetInnerHTML={{ __html: svgIcon }} />
        <span>{phone}</span>
      </StarBorder>
    </Link>
  )
}
