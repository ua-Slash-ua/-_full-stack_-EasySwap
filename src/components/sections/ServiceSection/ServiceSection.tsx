'use client'
import s from './ServiceSection.module.css'
import ServiceAside from '@/components/sections/ServiceSection/ServiceAside/ServiceAside'
import ServiceItem from '@/components/sections/ServiceSection/ServiceItem/ServiceItem'
import { useState } from 'react'
import { ServiceItemProps } from '@/props/ServiceItemProps'

export default function ServiceSection({ block, locale }: { block: any; locale: string }) {
  const [service, setService] = useState<ServiceItemProps>(block.services[0])
  function handlerService(id:number){
    setService(block.services[id])
  }
  const servicesTitle = (): { text: string }[] =>
    block.services.map((service: { service_title: string }) => ({
      text: service.service_title,
    }))
  return (
    <>
      <section className={s.service_section} id="services">
        <ServiceAside title={block.aside_title} menuItems={servicesTitle()} func={handlerService}/>
        <ServiceItem service={service}/>
      </section>
    </>
  )
}
