import s from './ServiceSection.module.css'
import ServiceAside from '@/components/sections/ServiceSection/ServiceAside/ServiceAside'

export default function ServiceSection({ block, locale }: { block: any; locale: string }) {
  const servicesTitle = (): { text: string }[] =>
    block.services.map((service: {service_title:string}) => ({
      text: service.service_title
    }))
  return (
    <>
      <section className={s.service_section} id="services">
      <ServiceAside title ={block.aside_title} menuItems={servicesTitle()} />
      </section>
    </>
  )
}