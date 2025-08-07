import './BtnSendApplication.css'
import s from './BtnSendApplication.module.css'

import StarBorder from '@/libs/StarBorder/StarBorder'

type BtnPhoneProps = {
  svgIcon: string
  text: string
}

export default function BtnSendApplication({ svgIcon, text }: BtnPhoneProps) {
  return (
    <>
      <StarBorder as="div" className={`${s.btn_mail} btn_mail`} speed="5s" color={'#622FF1'}>
        <div dangerouslySetInnerHTML={{ __html: svgIcon }} />

        <span>{text}</span>
      </StarBorder>
    </>
  )
}
