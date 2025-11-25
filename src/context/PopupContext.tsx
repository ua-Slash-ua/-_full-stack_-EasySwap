'use client'
import { createContext, useContext, useEffect, useState } from 'react'

type PopupType =
  | 'create_application'
  | 'exchange_application'
  | 'review_image'
  | 'currencies_info'
  | 'menu_mobile'
  | 'status_send'
  | null

interface PopupContextType {
  open: PopupType
  setOpen: (type: PopupType, data?: any) => void
  close: () => void

  data: any
}

const PopupContext = createContext<PopupContextType>({
  open: null,
  setOpen: () => {},
  close: () => {},
  data: null,
})

export const PopupProvider = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpenState] = useState<PopupType>(null)
  const [data, setData] = useState<any>(null)

  const setOpen = (type: PopupType, data?: any) => {
    setOpenState(type)
    setData(data ?? null)
  }

  const close = () => {
    setOpenState(null)
    setData(null)
  }

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    // на випадок демонтажу
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])


  return (
    <PopupContext.Provider value={{ open, data, setOpen, close }}>{children}</PopupContext.Provider>
  )
}

export const usePopup = () => useContext(PopupContext)
