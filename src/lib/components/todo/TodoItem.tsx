import { COLOR_OPACITY } from 'lib/enum/PickerColor';
import { Tools } from 'lib/enum/Tools';
import { TodoService } from 'lib/service/TodoService';
import { toolState } from 'lib/store/ToolState';
import { colorState } from 'lib/store/colorStore/colorState';
import { todoOrderState } from 'lib/store/todoStore/todoOrderState';
import { todoState } from 'lib/store/todoStore/todoState';
import { Todo } from 'lib/types/todo'
import detectSwipe from 'lib/util/detectSwipe';
import React, { useEffect, useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil';

const TodoItem = ({ todo }: {
  todo: Todo;
}) => {
  const { id, text, checked, color, type, isDone, date, prevItemId } = todo;
  const [ isDelete, setIsDelete ] = useState(false);
  const [ todoList, setTodoList ] = useRecoilState(todoState);
  const [ todoOrder, setTodoOrder ] = useRecoilState(todoOrderState);
  const [ isEditMode, setIsEditMode ] = useState<boolean>(false);
  const [ offset, setOffset ] = useState(null);
  const [ isActiveDelete, setIsActiveDelete ] = useState(false);
  const currentColor = useRecoilValue(colorState);
  const currentTool = useRecoilValue(toolState);

  const handleSwipe = (event: any) => {
    const swipeType = detectSwipe(event, offset, setOffset);
    if(swipeType === 'left') {
      setIsActiveDelete(true);
    } else if(swipeType === 'right') {
      setIsActiveDelete(false);
    }
  }
  const handleDelete = async () => {
    try {
      await TodoService.deleteTodo(id);
      setIsDelete(true);
      setTimeout(() => {
        setTodoOrder((oldList) => {
          return [
            ...oldList.filter((itemId) => itemId !== Number(id))
          ];
        });
        setTodoList((oldList) => {
          return [
            ...oldList.filter((todo: Todo) => todo.id !== id)
          ];
        });
      }, 250)
    } catch (error) {
      alert('삭제에 실패했습니다.');
    }
  }
  const handleCheck = async () => {
    const result = await TodoService.updateTodo({
      ...todo,
      checked: !checked
    });
    if(!checked) {
      const orderList = todoOrder.filter((itemId) => itemId !== Number(id));
      setTodoOrder(orderList);
      TodoService.updateTodoOrder(orderList);
    } else {
      const orderList = todoOrder.filter((itemId) => itemId !== Number(id));
      orderList.push(Number(id));
      setTodoOrder(orderList);
      TodoService.updateTodoOrder(orderList);
    }
    if(result) {
      setTodoList((oldList) => [ ...returnUpdateCheckedList(oldList, id) ])
    }
  }
  const handleChangeColor = async () => {
    if(currentTool !== Tools.HIGHLIGHTER) return;
    const isSameColor = color === currentColor.pickedColor;

    await TodoService.updateTodo({
      ...todo,
      color: isSameColor ? undefined : currentColor.pickedColor
    });

    setTodoList((oldList) => {
      return [
        ...oldList.map((todo) => {
          if(todo.id === id) {
            return {
              ...todo,
              color: isSameColor ? undefined : currentColor.pickedColor
            }
          }
          return todo;
        })
      ]
    });
  }
  useEffect(() => {
    if(currentTool === Tools.ERASER) {
      setIsActiveDelete(true);
    } else {
      setIsActiveDelete(false);
    }
  }, [currentTool])
  return (
    <div 
      className={`relative w-full min-h-[50px] shadow flex flex-row items-center p-2 overflow-hidden ${isEditMode ? 'translate-y-[-30px] scale-[105%] shadow-[0px_30px_30px_-10px_rgba(0,0,0,0.2)]' : 'shadow'} duration-300 bg-white ${isDelete && 'animate-slide-right'}`}
      onTouchStart={handleSwipe}
      onTouchEnd={handleSwipe}
      onMouseDown={handleSwipe}
      onMouseLeave={handleSwipe}
      onMouseUp={handleSwipe}
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
          className={`${checked && 'line-through text-gray-400'} break-words w-11/12 text-start ${color} rounded px-2`}
          onClick={handleChangeColor}
        >
          {text}
        </p>
      </div>
      <div 
        className={`absolute top-0 right-0 w-[50px] h-full flex items-center justify-center ${isActiveDelete ? 'translate-x-0' : 'translate-x-[50px]'} duration-300`}
      >
        <button
          className='w-[50px] h-full rounded-tl rounded-bl bg-red-500 text-white shadow text-sm'
          onClick={handleDelete}
        >
          delete
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
