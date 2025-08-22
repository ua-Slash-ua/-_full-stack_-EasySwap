'use client'
import './BtnSendApplication.css'
import s from './BtnSendApplication.module.css'

import StarBorder from '@/libs/StarBorder/StarBorder'
import { usePopup } from '@/context/PopupContext'

type BtnPhoneProps = {
  svgIcon: string
  text: string
  isReversed?: boolean
}

export default function BtnSendApplication({ svgIcon, text, isReversed=false}: BtnPhoneProps) {
  const { setOpen } = usePopup();
  return (
    <>
      <StarBorder
        as="div"
        className={`${isReversed ? s.btn_mail_reversed : s.btn_mail} ${isReversed ? 'btn_mail_reversed' : 'btn_mail'}`}
        speed="5s"
        color={'#622FF1'}
        onClick={() => setOpen('create_application')}
      >
        <div dangerouslySetInnerHTML={{ __html: svgIcon }} />

        <span>{text}</span>
      </StarBorder>
    </>
  )
}
