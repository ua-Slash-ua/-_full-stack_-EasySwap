'use client'
import s from './ApplicationSection.module.css'
import Aurora from '@/libs/Aurora/Aurora'
import React from 'react'
import PhoneInput from '@/components/layout/PhoneInput/PhoneInput'
import DepartmentInput from '@/components/layout/DepartmentInput/DepartmentInput'
import TelegramInput from '@/components/layout/TelegramInput/TelegramInput'

export default function ApplicationSection({ block, locale }: { block: any; locale: string }) {
  const [phone, setPhone] = React.useState('')
  const [telegram, setTelegram] = React.useState('')
  return (
    <>
      <section className={s.application_section}>
        <div className={s.application_container}>
          <Aurora
            colorStops={['#755AAD', '#391E7E', '#4B24CA']}
            blend={0.5}
            amplitude={1.0}
            speed={0.5}
          />
          <div className={s.application_content}>
            <h3>Заявка на обмін валюти</h3>
            <div className={s.application_labels}>
              <div className={s.application_double}>
                <PhoneInput
                  onChange={function (e: React.ChangeEvent<HTMLInputElement>): void {
                    throw new Error('Function not implemented.')
                  }}
                  groupId={'application_phone'}
                  defaultCode={''}
                  text={'Номер телефону'}
                  placeHolder={'00 000 00 00'}
                />

                <TelegramInput name={'telegram_application'}/>
              </div>
              <DepartmentInput departments={block.locations} text={'Оберіть відділення'}/>
            </div>
            <div className={s.btn_send}>
              <svg width="22" height="20" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.5 10C17.6871 10 17.8704 10.0525 18.0292 10.1515C18.1879 10.2505 18.3157 10.392 18.398 10.56L18.446 10.677L18.576 11.055C18.7132 11.4572 18.9343 11.8256 19.2246 12.1359C19.5149 12.4463 19.8678 12.6913 20.26 12.855L20.445 12.925L20.823 13.054C21.0102 13.1179 21.1742 13.2358 21.2944 13.3929C21.4146 13.55 21.4854 13.7392 21.4981 13.9366C21.5107 14.134 21.4645 14.3307 21.3654 14.5018C21.2662 14.6729 21.1185 14.8108 20.941 14.898L20.823 14.946L20.445 15.076C20.0428 15.2132 19.6744 15.4343 19.3641 15.7246C19.0537 16.0149 18.8086 16.3678 18.645 16.76L18.575 16.945L18.446 17.323C18.3821 17.5102 18.2642 17.6742 18.1071 17.7944C17.95 17.9146 17.7608 17.9854 17.5634 17.9981C17.366 18.0107 17.1693 17.9645 16.9982 17.8654C16.8271 17.7662 16.6892 17.6185 16.602 17.441L16.554 17.323L16.424 16.945C16.2868 16.5428 16.0657 16.1744 15.7754 15.8641C15.4851 15.5537 15.1322 15.3087 14.74 15.145L14.555 15.075L14.177 14.946C13.9898 14.8821 13.8258 14.7642 13.7056 14.6071C13.5854 14.45 13.5146 14.2608 13.5019 14.0634C13.4893 13.866 13.5355 13.6693 13.6346 13.4982C13.7338 13.3271 13.8815 13.1892 14.059 13.102L14.177 13.054L14.555 12.924C14.9572 12.7868 15.3256 12.5657 15.6359 12.2754C15.9463 11.9851 16.1913 11.6322 16.355 11.24L16.425 11.055L16.554 10.677C16.6214 10.4796 16.7488 10.3082 16.9184 10.1868C17.0881 10.0654 17.2914 10.0001 17.5 10ZM20.5 2.968V10.49L20.468 10.409L20.339 10.03C20.1419 9.45329 19.7739 8.95029 19.2838 8.58794C18.7938 8.2256 18.205 8.02109 17.5959 8.00166C16.9867 7.98222 16.3861 8.14877 15.874 8.47914C15.3618 8.80951 14.9624 9.28803 14.729 9.851L14.661 10.031L14.531 10.409C14.488 10.5352 14.4202 10.6515 14.3316 10.7511C14.243 10.8507 14.1353 10.9316 14.015 10.989L13.909 11.032L13.53 11.161C13.0785 11.3153 12.6704 11.575 12.3394 11.9186C12.0084 12.2621 11.7642 12.6797 11.6269 13.1366C11.4896 13.5935 11.4633 14.0766 11.5501 14.5457C11.6369 15.0148 11.8343 15.4565 12.126 15.834L12.264 16H2.5C1.99542 16.0002 1.50943 15.8096 1.13945 15.4665C0.769471 15.1234 0.542843 14.6532 0.505 14.15L0.5 14V2.968L9.54 10.502C9.7893 10.7096 10.0992 10.8308 10.4232 10.8474C10.7472 10.864 11.0678 10.7751 11.337 10.594L11.46 10.502L20.5 2.968ZM18.5 0C19.064 0 19.573 0.233 19.936 0.608L20.052 0.738L10.5 8.698L0.948 0.738C1.11572 0.531613 1.32292 0.360748 1.55747 0.235403C1.79202 0.110057 2.04921 0.0327482 2.314 0.0079999L2.5 0H18.5Z" fill="#0F0E13"/>
              </svg>
              <span>Залишити заявку</span>
            </div>

          </div>
        </div>
      </section>
    </>
  )
}
