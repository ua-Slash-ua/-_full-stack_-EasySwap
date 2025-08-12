'use client'
import { usePopup } from '@/context/PopupContext'
import CreateApplication from '@/components/PopUps/CreateApplication/CreateApplication'

export const PopupManager = () => {
  const { open } = usePopup();
  console.log('Current popup:', open);
  return (
    <>
      {
        open === 'create_application' && <CreateApplication />}
    </>
  );
};
