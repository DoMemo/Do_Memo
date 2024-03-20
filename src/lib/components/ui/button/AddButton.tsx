import { ADDTYPE } from 'lib/enum/AddType';
import { scheduleState } from 'lib/store/calendarStore/scheduleState';
import { todoState } from 'lib/store/todoStore/todoState';
import { Schedule } from 'lib/types/Schedule';
import { Todo } from 'lib/types/todo';
import React from 'react';
import { useRecoilState } from 'recoil';

const AddButton = ({ target, action }: { target: Todo | Schedule; action: ADDTYPE }) => {
  const [todoList, setTodoList] = useRecoilState(todoState);
  const [scheduleList, setScheduleList] = useRecoilState(scheduleState);
  switch (action) {
    case ADDTYPE.AddToTodo:
      const todo: Todo = {
        id: target.id,
        title: target.title,
        text: target.text,
        checked: false,
        color: target.color,
        prevItemId: undefined,
        type: 'todo',
        isDone: false,
        date: target.date,
        link: {
          type: target.link.type,
          id: undefined,
        },
      };
      const handleAddToTodo = () => {
        const newTodoList = [...todoList];
      };
      break;
    case ADDTYPE.AddToNote:
      break;
    case ADDTYPE.AddToSchedule:
      break;
  }
  return <div>AddButton</div>;
};

export default AddButton;
