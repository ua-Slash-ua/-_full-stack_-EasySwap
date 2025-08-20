'use client'
import 'swiper/css'
import 'swiper/css/navigation'

import './ServiceSwiper.css'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper/modules'
import { useEffect, useRef, useState } from 'react'
import { usePopup } from '@/context/PopupContext'
import type { Swiper as SwiperType } from 'swiper'
import ServiceItem from '@/components/sections/ServiceSection/ServiceItem/ServiceItem'

export default function ServiceSwiper({
  services,
  activeService,
  setActiveService,
}: {
  services: any[]
  activeService: number
  setActiveService: Function
}) {
  const [activeSlide, setActiveSlide] = useState(0)
  const { setOpen } = usePopup()
  const swiperRef = useRef<SwiperType | null>(null)
  useEffect(() => {
    if (swiperRef.current && activeService !== undefined) {
      swiperRef.current.slideTo(activeService)
    }
  }, [activeService])
  return (
    <Swiper
      modules={[ Pagination]}
      spaceBetween={20}
      slidesPerView={1.1}
      centeredSlides={false}
      loop={false}
      pagination={{ clickable: true }}
      onSwiper={swiper => (swiperRef.current = swiper)}
      onSlideChange={swiper => setActiveService(swiper.activeIndex)}
    >
      {services.map((service, index) => (
        <SwiperSlide key={index}>
          <ServiceItem service={service} />
        </SwiperSlide>
      ))}
    </Swiper>
  )
}
