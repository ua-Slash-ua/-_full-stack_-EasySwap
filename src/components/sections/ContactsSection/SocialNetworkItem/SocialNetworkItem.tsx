'use client'
import s from './SocialNetworkItem.module.css'
import Link from 'next/link'

export type SocialNetworkItemProps = {
  footer_icon?: string
  location_icon: string
  link: string
}

export default function SocialNetworkItem({ location_icon, link }: SocialNetworkItemProps) {

  return (
    <>
      <Link className={s.social_item} href={link}>
        <div dangerouslySetInnerHTML={{ __html: location_icon }} />
      </Link>
    </>
  )
}
