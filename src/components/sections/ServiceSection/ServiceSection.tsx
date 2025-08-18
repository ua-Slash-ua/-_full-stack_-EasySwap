'use client'
import s from './ServiceSection.module.css'
import ServiceAside from '@/components/sections/ServiceSection/ServiceAside/ServiceAside'
import ServiceItem from '@/components/sections/ServiceSection/ServiceItem/ServiceItem'
import { useState, useEffect } from 'react'
import { ServiceItemProps } from '@/props/ServiceItemProps'

export default function ServiceSection({ block, locale }: { block: any; locale: string }) {
  const [activeService, setActiveService] = useState<number>(0)
  const [service, setService] = useState<ServiceItemProps>(block.services[0])
  useEffect(() => {
    const timeout = setTimeout(() => {
      handlerService(activeService + 1);
    }, 5_000);

    return () => clearTimeout(timeout); // 🧹 очищення попереднього таймера
  }, [activeService]);

  function handlerService(id:number){
    if (id>=block.services.length) {
      id=0
    }
    setActiveService(id)
    setService(block.services[id])
  }
  const servicesTitle = (): { text: string }[] =>
    block.services.map((service: { service_title: string }) => ({
      text: service.service_title,
    }))
  return (
    <>
      <section className={s.service_section} id="services">
        <ServiceAside title={block.aside_title} menuItems={servicesTitle()} func={handlerService} activeService={activeService}/>
        <ServiceItem service={service}/>
      </section>
    </>
  )
}
