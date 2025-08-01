import s from './Logo.module.css'
import logo from 'public/hero/Logo (1).png'
import Image from 'next/image'
export default function Logo() {
  return (<>
      <Image
        width ={100}
        height ={100}
        className ={s.logo}
        src={logo}
        alt="Logo"  />
  </>

  )
}