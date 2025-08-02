import { ServiceItemBlockProps } from '@/props/ServiceItemBlockProps'
import { serviceData } from '@/config/services.config'
import s from './ItemBlock.module.css'

export default function ItemBlock({ isLeft, points }: ServiceItemBlockProps) {
  const serviceConst = isLeft ? serviceData[0] : serviceData[1]
  return (
    <>
      <div className={s.item_block}>
        <h4>{serviceConst.title}</h4>
        <ul>
          {points.map((point, index) => (
            <li key={index}>
              <div className={s.item_block_line}>
                <div className={s.item_block_icon}>
                  <div
                    dangerouslySetInnerHTML={{
                      __html:
                        serviceConst.icon ||
                        `<span>${index+1}</span>`,
                    }}
                  />
                </div>

                <p>{point}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}
