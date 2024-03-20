import { ADDTYPE } from 'lib/enum/AddType';
import { TYPE } from 'lib/enum/Type';
import { CalendarService } from 'lib/service/CalendarService';
import { TodoService } from 'lib/service/TodoService';
import { scheduleState } from 'lib/store/calendarStore/scheduleState';
import { todoOrderState } from 'lib/store/todoStore/todoOrderState';
import { todoState } from 'lib/store/todoStore/todoState';
import { Schedule } from 'lib/types/Schedule';
import { CreateTodo, Todo } from 'lib/types/todo';
import React, { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import goToDoImg from 'assets/images/goTodo.png';
import goToDoImgWhite from 'assets/images/goTodo_white.png';
import goScheduleImg from 'assets/images/goSchedule.png';
import goScheduleImgWhite from 'assets/images/goSchedule_white.png';
import { darkState } from 'lib/store/setting/DarkState';

const AddButton = ({ target, action }: { target: Todo | Schedule; action: ADDTYPE }) => {
  const [todoList, setTodoList] = useRecoilState(todoState);
  const [todoOrder, setTodoOrder] = useRecoilState(todoOrderState);
  const [scheduleList, setScheduleList] = useRecoilState(scheduleState);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [btnImg, setBtnImg] = useState<string>('');
  const isDarkMode = useRecoilValue(darkState);

  const openSuccessModal = () => {
    setIsModalOpen(true);
    setIsSuccess(true);
    setTimeout(() => {
      setIsModalOpen(false);
      setIsSuccess(false);
    }, 2000);
  };
  const openErrorModal = () => {
    setIsModalOpen(true);
    setIsSuccess(false);
    setTimeout(() => {
      setIsModalOpen(false);
      setIsSuccess(false);
    }, 2000);
  };

  const handleAddToTodo = async () => {
    const todo: CreateTodo = {
      title: target.title,
      text: target.text,
      checked: false,
      color: target.color,
      prevItemId: undefined,
      type: target.type,
      isDone: false,
      date: target.date,
      link: {
        type: target.link.type,
        id: undefined,
      },
    };
    try {
      const createdTodo = (await TodoService.createTodo(todo)) as Todo;
      setTodoList((prev) => {
        return [...prev, createdTodo];
      });
      setTodoOrder((prev: number[]) => {
        return [...prev, Number(createdTodo.id)];
      });
      openSuccessModal();
    } catch (error) {
      console.log(error);
      openErrorModal();
    }
  };
  const handleAddToSchedule = async () => {
    const schedule: Schedule = {
      id: target.id,
      title: target.title,
      text: target.text,
      color: target.color,
      type: target.type,
      date: target.date,
      link: {
        type: target.link.type,
        id: undefined,
      },
    };
    try {
      const createSchedule = (await CalendarService.createSchedule(schedule)) as Schedule;
      setScheduleList((prev) => {
        return [...prev, createSchedule];
      });
      openSuccessModal();
    } catch (error) {
      console.log(error);
      openErrorModal();
    }
  };

  useEffect(() => {
    if (!isDarkMode) {
      switch (action) {
        case ADDTYPE.AddToTodo:
          setBtnImg(goToDoImg);
          break;
        case ADDTYPE.AddToSchedule:
          setBtnImg(goScheduleImg);
          break;
      }
    } else {
      switch (action) {
        case ADDTYPE.AddToTodo:
          setBtnImg(goToDoImgWhite);
          break;
        case ADDTYPE.AddToSchedule:
          setBtnImg(goScheduleImgWhite);
          break;
      }
    }
  }, [isDarkMode]);

  return (
    <div>
      <button
        className={`absolute top-1 right-2`}
        onClick={() => {
          switch (action) {
            case ADDTYPE.AddToTodo:
              handleAddToTodo();
              break;
            case ADDTYPE.AddToNote:
              break;
            case ADDTYPE.AddToSchedule:
              handleAddToSchedule();
              break;
          }
        }}
      >
        <img
          src={`${target.color ? btnImg : action === ADDTYPE.AddToTodo ? goToDoImg : goScheduleImg}`}
          className="w-[25px] h-[25px] cover"
        />
      </button>
      {/* 모달 */}
      {isModalOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-slate-200/50 z-50">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded-lg">
            {isSuccess ? (
              <div className={`${isDarkMode ? 'text-black' : ''}`}>성공</div>
            ) : (
              <div className={`${isDarkMode ? 'text-black' : ''}`}>실패</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AddButton;
