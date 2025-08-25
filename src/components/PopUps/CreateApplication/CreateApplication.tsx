'use client'
import s from './CreateApplication.module.css'
import React from 'react'
import { Form, Formik } from 'formik'
import PhoneInput from '@/components/layout/PhoneInput/PhoneInput'
import { usePopup } from '@/context/PopupContext'
import TelegramInput from '@/components/layout/TelegramInput/TelegramInput'
import DescriptionInput from '@/components/layout/DescriptionInput/DescriptionInput'
import { createApplication } from '@/api/createApp'
import * as Yup from 'yup'

// 🔹 схема валідації
export const validationSchema = Yup.object({
  phone: Yup.string()
    .required('Телефон обовʼязковий')
    .matches(/^\+[0-9]{10,15}$/, 'Некоректний номер телефону'),
  telegram: Yup.string()
    .required('Telegram обовʼязковий')
    .matches(/^@?(\w){5,}$/, 'Вкажіть ваш нік в телеграм'),
})

export default function CreateApplication() {
  const { close, setOpen } = usePopup()

  return (
    <div className={s.popup_backgraund}>
      <div className={s.popup_container} id={'create_application'}>
        <div className={s.btn_close} onClick={close}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
          >
            <path
              d="M16.001 17.8677L9.46771 24.401C9.22326 24.6455 8.91215 24.7677 8.53437 24.7677C8.1566 24.7677 7.84549 24.6455 7.60104 24.401C7.3566 24.1566 7.23438 23.8455 7.23438 23.4677C7.23438 23.0899 7.3566 22.7788 7.60104 22.5344L14.1344 16.001L7.60104 9.46771C7.3566 9.22326 7.23438 8.91215 7.23438 8.53437C7.23438 8.1566 7.3566 7.84549 7.60104 7.60104C7.84549 7.3566 8.1566 7.23438 8.53437 7.23438C8.91215 7.23438 9.22326 7.3566 9.46771 7.60104L16.001 14.1344L22.5344 7.60104C22.7788 7.3566 23.0899 7.23438 23.4677 7.23438C23.8455 7.23438 24.1566 7.3566 24.401 7.60104C24.6455 7.84549 24.7677 8.1566 24.7677 8.53437C24.7677 8.91215 24.6455 9.22326 24.401 9.46771L17.8677 16.001L24.401 22.5344C24.6455 22.7788 24.7677 23.0899 24.7677 23.4677C24.7677 23.8455 24.6455 24.1566 24.401 24.401C24.1566 24.6455 23.8455 24.7677 23.4677 24.7677C23.0899 24.7677 22.7788 24.6455 22.5344 24.401L16.001 17.8677Z"
              fill="white"
            />
          </svg>
        </div>
        <h3>Створити заявку</h3>
        <Formik
          initialValues={{
            phone: '',
            telegram: '',
            description: '',
          }}
          validationSchema={validationSchema}
          onSubmit={async (values, { resetForm }) => {
            try {
              const result = await createApplication({
                type: 'create',
                phone: values.phone,
                telegramNick: values.telegram,
                request: values.description,
              })
              close()
              setOpen('status_send', { status: 'success' })
              resetForm()
            } catch (err) {
              close()
              setOpen('status_send', { status: 'error' })
              console.error('Помилка при надсиланні заявки:', err)
              resetForm()
            }
          }}
        >
          {({ values, handleChange, errors, touched }) => (
            <Form>
              <div className={s.double}>
                <PhoneInput
                  className={s.application_double_item}
                  name="phone"
                  value={values.phone}
                  onChange={handleChange}
                  activeCode="ua"
                  error={touched.phone && errors.phone ? errors.phone : null}
                />

                <TelegramInput
                  name="telegram"
                  className={s.application_double_item}
                  value={values.telegram}
                  onChange={handleChange}
                  error={touched.telegram && errors.telegram ? errors.telegram : null}
                />
              </div>

              <DescriptionInput
                className={s.application_description}
                name="description"
                value={values.description}
                onChange={handleChange}
              />

              <button type="submit" className={s.btn_send}>
                <span>Залишити заявку</span>
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
}
