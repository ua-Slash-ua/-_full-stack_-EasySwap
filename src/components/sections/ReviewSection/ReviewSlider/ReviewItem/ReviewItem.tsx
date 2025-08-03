'use client'

import { SwiperSlide } from 'swiper/react'
import React from 'react'
import s from './ReviewItem.module.css'
import { ReviewProps } from '@/props/ReviewProps'
import { reviewData } from '@/config/review.config'
import Image from 'next/image'

export default function ReviewItem({ review }: { review: ReviewProps }) {
  return (
    <>
      <SwiperSlide className={s.review_slide}>
        <div className={s.swiper_header}>
          <div dangerouslySetInnerHTML={{ __html: reviewData.icon }} />
          <p>{review.description}</p>
        </div>
        <div className={s.review_image}>
          <Image width={112} height={104} src={review.photo.url} alt={review.photo.alt} />
        </div>
      </SwiperSlide>
    </>
  )
}
