'use client'
import s from './ApplicationSection.module.css'
import Aurora from '@/libs/Aurora/Aurora'
import React, { useState } from 'react'
import PhoneInput from '@/components/layout/PhoneInput/PhoneInput'
import DepartmentInput from '@/components/layout/DepartmentInput/DepartmentInput'
import TelegramInput from '@/components/layout/TelegramInput/TelegramInput'
import { Form, Formik } from 'formik'
import { createApplication } from '@/api/createApp'

export default function ApplicationSection({ block, locale }: { block: any; locale: string }) {
  const [statusMessage, setStatusMessage] = useState<string | null>(null)
  return (
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

          <Formik
            initialValues={{
              phone: '',
              telegram: '',
              department: '',
            }}
            onSubmit={async (values, { resetForm }) => {
              try {
                const result = await createApplication({
                  type:'exchange',
                  phone: values.phone,
                  telegramNick: values.telegram,
                  department: values.department,
                })

                setStatusMessage('✅ Заявка успішно надіслана!')
                resetForm()
                setTimeout(() => setStatusMessage(null), 3000)
              } catch (err) {
                console.error('Помилка при надсиланні заявки:', err)
                setStatusMessage('❌ Помилка при надсиланні. Спробуйте ще раз.')
              }
            }}
          >
            {({ values, handleChange, setFieldValue, isSubmitting }) => (
              <Form>
                <div className={s.application_labels}>
                  <div className={s.application_double}>
                    <PhoneInput
                      className={s.application_double_item}
                      name="phone"
                      value={values.phone}
                      onChange={handleChange}
                      activeCode="ua"
                    />
                    <TelegramInput
                      name="telegram"
                      className={s.application_double_item}
                      value={values.telegram}
                      onChange={handleChange}
                    />
                  </div>

                  <DepartmentInput
                    departments={block.locations}
                    text="Оберіть відділення"
                    value={values.department}
                    onChange={(value) => setFieldValue('department', value)}
                  />
                </div>

                <button type="submit" className={s.btn_send} disabled={isSubmitting}>
                  <svg width="22" height="20" viewBox="0 0 22 20" fill="none">
                    {/* SVG path */}
                  </svg>
                  <span>{isSubmitting ? 'Відправляємо...' : 'Залишити заявку'}</span>
                </button>

                {statusMessage && (
                  <div className={s.status_message}>
                    {statusMessage}
                  </div>
                )}
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </section>
  )
}
