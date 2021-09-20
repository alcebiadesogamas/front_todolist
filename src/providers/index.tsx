import React from 'react';
import { ModalProviderController } from './ModalProviderController';
import { ModalContext } from '../context/modalContext';
import { DefaultModal } from '../components/global/DefaultModal';

export const Providers: React.FC = ({ children }) => {
  const modalController = ModalProviderController();
  return (
    <ModalContext.Provider value={modalController}>
      <DefaultModal />
      {children}
    </ModalContext.Provider>
  );
};
