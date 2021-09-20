import { ChangeEvent, createContext } from 'react';

interface IModalContext {
  modal: { isOpen: boolean; inputValue: string; callback: (e: string) => void };
  handleModalClose: () => void;
  handleModalOpen: (e: any) => void;
  handleModalInputChange: (value: string) => void;
}

export const ModalContext = createContext({} as IModalContext);
