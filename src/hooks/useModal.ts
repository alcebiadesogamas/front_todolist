import { useContext } from 'react';
import { ModalContext } from '../context/modalContext';

export const useModal = () => {
  const controller = useContext(ModalContext);
  return { ...controller };
};
