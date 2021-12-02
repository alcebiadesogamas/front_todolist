import React from 'react';
import { TaskPageController } from './TaskPageController';

export default function TaskPage() {
  const { createTask, deleteTask, editTask, tasks, handleModalOpen } =
    TaskPageController();
  return (
    <>
      <div className={'container grid place-content-center p-4 min-w-full'}>
        <button
          className={'bg-green-500 rounded-lg text-white py-2 px-4 mb-2'}
          onClick={() => handleModalOpen(createTask)}
        >
          Criar Tarefa
        </button>
        {tasks.length > 0 ? (
          tasks.map((item) => (
            <div
              key={item.id}
              className={
                'bg-white border-t-2 border-b-2 border-green-300 flex justify-center align-middle p-2 cursor-pointer group transition-all mb-2'
              }
            >
              <div className={'flex justify-center align-middle'}>
                <span
                  className={'text-lg my-auto'}
                  style={{
                    textDecoration: item.status ? 'line-through' : '',
                  }}
                >
                  {item?.description}
                </span>
                <button
                  onClick={() => deleteTask(item.id)}
                  className={'text-red-500 text-2xl ml-12'}
                >
                  &#10005;
                </button>
                <button
                  className={' text-lg ml-4'}
                  onClick={() =>
                    handleModalOpen((value: string) =>
                      editTask(item, false, value),
                    )
                  }
                >
                  ✏️
                </button>
                <button
                  className={'text-red-500 text-lg ml-4'}
                  onClick={() => editTask(item, true)}
                >
                  &#9989;
                </button>
              </div>
            </div>
          ))
        ) : (
          <div>Nenhuma tarefa encontrada</div>
        )}
      </div>
    </>
  );
}
