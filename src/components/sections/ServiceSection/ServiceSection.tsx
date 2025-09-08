'use client'
import s from './ServiceSection.module.css'
import ServiceAside from '@/components/sections/ServiceSection/ServiceAside/ServiceAside'
import ServiceItem from '@/components/sections/ServiceSection/ServiceItem/ServiceItem'
import { useEffect, useRef, useState } from 'react'
import { ServiceItemProps } from '@/props/ServiceItemProps'
import ServiceSwiper from '@/components/sections/ServiceSection/ServiceSwiper/ServiceSwiper'

export default function ServiceSection({ block }: { block: any;  }) {
  const [activeService, setActiveService] = useState<number>(0)
  const [activeItem, setActiveItem] = useState<boolean>(false)
  const [service, setService] = useState<ServiceItemProps>(block.services[0])
  const [width, setWidth] = useState<number>(0)
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting)
      },
      { threshold: 0.3 }, // секція має бути видимою хоча б на 30%
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])
  useEffect(() => {
    if (!isVisible) return
    if (width <= 1024 && activeItem) return

    const timeout = setTimeout(() => {
      handlerService(activeService + 1)
    }, 5_000)

    return () => clearTimeout(timeout) // 🧹 очищення попереднього таймера
  }, [activeService, isVisible, activeItem])
  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth)
    handleResize() // виставляємо ширину одразу після маунту

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  function handlerService(id: number) {
    if (id >= block.services.length) {
      id = 0
    }
    setActiveService(id)
    setService(block.services[id])
  }

  function handleActiveItem(isActive: boolean) {
    setActiveItem(isActive)
  }

  const servicesTitle = (): { text: string }[] =>
    block.services.map((service: { service_title: string }) => ({
      text: service.service_title,
    }))
  return (
    <>
      <section className={s.service_section} id="services" ref={sectionRef}>
        <ServiceAside
          menuItems={servicesTitle()}
          func={handlerService}
          activeService={activeService}
        />
        {width <= 1024 ? (
          <ServiceSwiper
            services={block.services}
            activeService={activeService}
            setActiveService={handlerService}
            isActive={activeItem}
            setActive={handleActiveItem}
          />
        ) : (
          <ServiceItem service={service} isActive={activeItem} setActive={handleActiveItem} />
        )}
      </section>
    </>
  )
}
