import React from 'react';
import { HomePageController } from './HomePageController';

export default function Home() {
  const { state, history, handleModalOpen, clearList, createTaskList } =
    HomePageController();
  return (
    <div className={'container grid place-content-center p-4 min-w-full'}>
      <button
        onClick={() => handleModalOpen(createTaskList)}
        className={'bg-green-500 rounded-lg text-white py-2 px-4'}
      >
        Criar uma Lista de Tarefas
      </button>
      <div className={'my-2 flex-grow w-full'}>
        {state.length > 0 ? (
          state.map((item) => (
            <div
              key={item.id}
              onClick={() => history.push(`/tasks/${item.id}`, { ...item })}
              className={
                'bg-white   border-t-2 border-b-2 border-green-300 flex justify-between align-middle p-2 cursor-pointer group transition-all mb-2 '
              }
            >
              <div className={'mr-8'}>{item?.name}</div>
              <div className={'transition-all ml-auto'}>
                {item?.created_at.slice(0, 7).replaceAll('-', '/')}
              </div>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 invisible  group-hover:visible transition-all text-green-500 ml-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          ))
        ) : (
          <div>Nenhuma Lista de tarefas encontrada</div>
        )}
      </div>
    </div>
  );
}
