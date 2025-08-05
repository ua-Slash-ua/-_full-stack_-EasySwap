import s from './SocialNetworkItem.module.css'

type SocialNetworkItemProps = {
  footer_icon?: string
  location_icon: string
}

export default function SocialNetworkItem({ location_icon }: SocialNetworkItemProps) {
  return (
    <>
      <div className={s.social_item}>
        <div dangerouslySetInnerHTML={{ __html: location_icon }} />
      </div>
    </>
  )
}
