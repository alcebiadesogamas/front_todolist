import { TaskListObject } from '../home/HomePageController';
import { TaskRepository } from '../../repositories/TaskRepository';
import { useHistory, useLocation } from 'react-router-dom';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useModal } from '../../hooks/useModal';

interface TaskObject {
  id: number;
  description: string;
  status: boolean;
  toDoList: TaskListObject;
}
export const TaskPageController = () => {
  const repository = new TaskRepository();
  const location = useLocation<TaskListObject>();
  const history = useHistory();
  const [tasks, setTasks] = useState<TaskObject[]>([] as TaskObject[]);
  const { handleModalClose, handleModalOpen } = useModal();

  const isLocationDefined = useMemo(() => {
    return !!location?.state?.id;
  }, [location]);

  const createTask = useCallback(
    async (description: string) => {
      try {
        const response = await repository.create({
          description,
          todoList: location.state,
        });
        setTasks((values) => [...values, response.data]);
        handleModalClose();
      } catch (e) {
        console.error(e);
      }
    },
    [handleModalClose],
  );

  const getTasks = useCallback(async () => {
    try {
      if (!isLocationDefined) {
        return history.push('/');
      }
      const response = await repository.listAll();
      return response;
    } catch (e) {
      console.error(e);
    }
  }, []);

  const filterTasks = useCallback((tasks: TaskObject[] = []) => {
    const auxFiltered = tasks.filter(
      (task) => task.toDoList.id === location.state.id,
    );
    setTasks(auxFiltered);
  }, []);

  const deleteTask = useCallback(async (id: number) => {
    try {
      const response = await repository.deleteById(id);
      setTasks((values) => values.filter((item) => item.id !== id));
    } catch (e: any) {
      alert(e.message);
    }
  }, []);

  const editTask = useCallback(
    async (
      task: TaskObject,
      onlyUpdateStatus: boolean,
      descriptionParams: string = '',
    ) => {
      try {
        const description = onlyUpdateStatus
          ? task.description
          : descriptionParams;
        const response = await repository.updateById({
          description,
          taskId: task.id,
          status: onlyUpdateStatus ? !task.status : task.status,
          todoList: task.toDoList,
        });
        setTasks((values) => {
          const foundIndex = values.findIndex((item) => item.id === task.id);
          const aux = values;
          aux[foundIndex] = response.data;
          return [...aux];
        });
        handleModalClose();
      } catch (e: any) {
        alert(e.message);
      }
    },
    [setTasks, handleModalClose],
  );

  useEffect(() => {
    getTasks().then((res) => {
      filterTasks(res?.data);
    });
  }, []);

  return {
    createTask,
    deleteTask,
    editTask,
    tasks,
    handleModalOpen,
  };
};
