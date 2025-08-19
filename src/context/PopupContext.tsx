'use client'
// context/PopupContext.tsx
import { createContext, useContext, useState } from 'react';
import { getContacts } from '@/api/getContacts'

type PopupType = 'create_application' | 'exchange_application' | 'currency' | null;

interface PopupContextType {
  open: PopupType;
  setOpen: (type: PopupType) => void;
  close: () => void;
}
const PopupContext = createContext<PopupContextType>({
  open: null,
  setOpen: () => {},
  close: () => {},
});

export const PopupProvider = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = useState<PopupType>(null);

  const close = () => setOpen(null);

  return (
    <PopupContext.Provider value={{ open, setOpen, close }}>
  {children}
  </PopupContext.Provider>
);
};

export const usePopup = () => useContext(PopupContext);
