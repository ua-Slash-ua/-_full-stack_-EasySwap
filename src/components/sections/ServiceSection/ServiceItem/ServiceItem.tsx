import s from './ServiceItem.module.css'
import { ServiceItemProps } from '@/props/ServiceItemProps'
import ItemBlock from '@/components/sections/ServiceSection/ServiceItem/ItemBlock/ItemBlock'
export default function ServiceItem({service }: { service: ServiceItemProps }) {
  return (
    <>
      <div className={s.service_item}>
        <div className={s.item_header}>
          <div className=""
          dangerouslySetInnerHTML={{ __html: service.service_icon }}
          />
          <h3>
            {service.service_title}
          </h3>
        </div>
        <div className={s.item_content}>
          <div className={s.item_content_double}>
            <ItemBlock  isLeft={true} points={service.how_does_it_work.map(item => item.how_does_it_work_description)}/>
            <ItemBlock  isLeft={false} points={service.features.map(item => item.features_description)}/>
          </div>
            </div>
      </div>
    </>
  )
}
