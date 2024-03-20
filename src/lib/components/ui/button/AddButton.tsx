import { ADDTYPE } from 'lib/enum/AddType';
import { TYPE } from 'lib/enum/Type';
import { CalendarService } from 'lib/service/CalendarService';
import { TodoService } from 'lib/service/TodoService';
import { scheduleState } from 'lib/store/calendarStore/scheduleState';
import { todoOrderState } from 'lib/store/todoStore/todoOrderState';
import { todoState } from 'lib/store/todoStore/todoState';
import { Schedule } from 'lib/types/Schedule';
import { Todo } from 'lib/types/todo';
import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';

const AddButton = ({ target, action }: { target: Todo | Schedule; action: ADDTYPE }) => {
  const [todoList, setTodoList] = useRecoilState(todoState);
  const [todoOrder, setTodoOrder] = useRecoilState(todoOrderState);
  const [scheduleList, setScheduleList] = useRecoilState(scheduleState);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

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
    const todo: Todo = {
      id: target.id,
      title: target.title,
      text: target.text,
      checked: false,
      color: target.color,
      prevItemId: undefined,
      type: TYPE.todo,
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
        return [...prev, Number(todo.id)];
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
      type: TYPE.schedule,
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
    handleBtnImage(action);
  }, []);

  return (
    <div>
      <button
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
        넘기기!
      </button>
      {/* 모달 */}
      {isModalOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-slate-200/50">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded-lg">
            {isSuccess ? <p>성공</p> : <p>실패</p>}
          </div>
        </div>
      )}
    </div>
  );
};

// 버튼 이미지 만들기
function handleBtnImage(action: ADDTYPE) {
  let buttonImage;
  switch (action) {
    case ADDTYPE.AddToTodo:
      buttonImage = require('../../../../assets/images/goTodo.png').default;
      console.log(buttonImage);
      return buttonImage;
    // case ADDTYPE.AddToNote:
    //   buttonImage = 'image_note.png';
    //   break;
    case ADDTYPE.AddToSchedule:
      buttonImage = require('../../../../assets/images/goSchedule.png').default;

      return buttonImage;
  }
}
export default AddButton;
