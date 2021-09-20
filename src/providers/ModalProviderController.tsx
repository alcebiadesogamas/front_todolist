import { useCallback, useState } from 'react';

export const ModalProviderController = () => {
  const [modal, setModal] = useState({
    isOpen: false,
    inputValue: '',
    callback: () => null,
  });

  const handleModalClose = useCallback(() => {
    setModal((prevState) => ({ ...prevState, isOpen: false }));
  }, [setModal]);

  const handleModalOpen = useCallback(
    (callback: any) => {
      setModal((prevState) => ({ ...prevState, isOpen: true, callback }));
    },
    [setModal],
  );

  const handleModalInputChange = useCallback(
    (value: string) => {
      setModal((prevState) => ({
        ...prevState,
        inputValue: value,
      }));
    },
    [setModal],
  );

  return {
    modal,
    handleModalClose,
    handleModalOpen,
    handleModalInputChange,
  };
};
