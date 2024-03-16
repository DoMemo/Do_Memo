import { Tools } from 'lib/enum/Tools';
import { TodoService } from 'lib/service/TodoService';
import { toolState } from 'lib/store/ToolState';
import { todoState } from 'lib/store/todoStore/todoState';
import { Todo } from 'lib/types/todo'
import React, { useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil';

const TodoItem = ({ todo }: {
  todo: Todo;
}) => {
  const { id, text, checked, color, type, isDone, date, prevItemId } = todo;
  const [ todoList, setTodoList ] = useRecoilState(todoState);
  const [ isEditMode, setIsEditMode ] = useState<boolean>(false);
  const currentTool = useRecoilValue(toolState);

  const handleDelete = async () => {
    const result = await TodoService.deleteTodo(id);

    if(result === undefined) {
      setTodoList((oldList) => {
        return [
          ...oldList.filter((todo) => todo.id !== id)
        ];
      })
    }
  }
  const handleCheck = async () => {
    const result = await TodoService.updateTodo({
      ...todo,
      checked: !checked
    });

    if(result) {
      setTodoList((oldList) => [ ...returnUpdateCheckedList(oldList, id) ])
    }
  }
  const toggleEditMode = () => {
    setIsEditMode((isEditMode) => !isEditMode);
  }
  return (
    <div 
      className={`relative w-full min-h-[50px] shadow flex flex-row items-center p-2 overflow-hidden ${isEditMode ? 'translate-y-[-30px] scale-[105%] shadow-[0px_30px_30px_-10px_rgba(0,0,0,0.2)]' : 'shadow'} duration-300 bg-white`}
    >
      <div className='h-full flex items-center justify-center pr-2'>
        <input 
          className='w-5 h-5'
          type="checkbox" 
          name="done"
          checked={checked}
          onChange={handleCheck}
        />
      </div>
      <div 
        className='w-full flex flex-row'
      >
        <p 
          className={`${checked && 'line-through text-gray-400'} break-words w-11/12 text-start`}
          onClick={toggleEditMode}
        >
          {text}
        </p>
      </div>
      <div 
        className={`absolute top-0 right-2 w-[50px] h-full flex items-center justify-center ${currentTool === Tools.ERASER ? 'translate-x-0' : 'translate-x-[70px]'} duration-300`}
      >
        <button
          className='w-[50px] h-[30px] rounded-lg bg-red-500 text-white shadow'
          onClick={handleDelete}
        >
          삭제
        </button>
      </div>
    </div>
  )
}

function returnUpdateCheckedList(oldList: Todo[], targetId: IDBValidKey) {
  return oldList.map((todo) => {
    if(todo.id === targetId) {
      return {
        ...todo,
        checked: !todo.checked
      }
    }
    return todo;
  })
}

export default TodoItem
