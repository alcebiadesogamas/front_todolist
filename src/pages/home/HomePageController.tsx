import { TaskListRepository } from '../../repositories/TaskListRepository';
import { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useModal } from '../../hooks/useModal';

export interface TaskListObject {
  id: number;
  name: string;
  created_at: string;
}

export const HomePageController = () => {
  const [state, setState] = useState<TaskListObject[]>([] as TaskListObject[]);
  const { modal, handleModalClose, handleModalOpen } = useModal();
  const repository = new TaskListRepository();
  const history = useHistory();
  const clearList = (value?: TaskListObject) => {
    console.log(value);
    setState((values) => (value ? [...values, value] : []));
  };
  const getTaskList = useCallback(async () => {
    try {
      const response = await repository.listAll();
      return response;
    } catch (e) {
      console.error(e);
    }
  }, []);

  const createTaskList = async (value: string) => {
    try {
      const response = await repository.create(
        value,
        new Date().toISOString().slice(0, 19).concat('Z'),
      );
      handleModalClose();
      setState((values) => [...values, response.data]);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getTaskList().then((res) => {
      setState(res?.data);
    });
  }, []);

  return {
    getTaskList,
    createTaskList,
    state,
    history,
    clearList,
    handleModalOpen,
  };
};
