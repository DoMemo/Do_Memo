import { COLOR_OPACITY } from 'lib/enum/PickerColor';
import { Tools } from 'lib/enum/Tools';
import { TodoService } from 'lib/service/TodoService';
import { toolState } from 'lib/store/ToolState';
import { colorState } from 'lib/store/colorStore/colorState';
import { todoOrderState } from 'lib/store/todoStore/todoOrderState';
import { todoState } from 'lib/store/todoStore/todoState';
import { Todo } from 'lib/types/todo'
import detectSwipe from 'lib/util/detectSwipe';
import React, { useEffect, useRef, useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil';

const TodoItem = ({ todo }: {
  todo: Todo;
}) => {
  const { id, title, text, checked, color, type, isDone, date, prevItemId } = todo;
  const [ isDelete, setIsDelete ] = useState(false);
  const [ todoList, setTodoList ] = useRecoilState(todoState);
  const [ todoOrder, setTodoOrder ] = useRecoilState(todoOrderState);
  const [ isEditMode, setIsEditMode ] = useState<boolean>(false);
  const [ offset, setOffset ] = useState(null);
  const [ isActiveDelete, setIsActiveDelete ] = useState(false);
  const textareaElement = useRef<HTMLTextAreaElement>(null);
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

    const newList = await TodoService.getTodoList() as Todo[];
    setTodoList([...newList]);
  }
  
  useEffect(() => {
    if(currentTool === Tools.ERASER) {
      setIsActiveDelete(true);
    } else {
      setIsActiveDelete(false);
    }
  }, [currentTool])

  useEffect(() => {
    if(textareaElement.current) {
      textareaElement.current.style.height = 'auto';
      textareaElement.current.style.height = `${textareaElement.current.scrollHeight}px`;
    }
  }, [textareaElement])
  return (
    <div 
      className={`relative w-full min-h-[50px] duration-300 ${isDelete && 'animate-slide-right'} p-2 overflow-hidden px-3 py-1`}
      onTouchStart={handleSwipe}
      onTouchEnd={handleSwipe}
      onMouseDown={handleSwipe}
      onMouseLeave={handleSwipe}
      onMouseUp={handleSwipe}
    >
      <div
        className='w-full bg-white rounded'
      >
        <div className={`relative w-full flex flex-row items-center shadow-md ${color} p-2 rounded`}>
          <div
            className={` flex flex-col items-center p-1 rounded w-full`}
            onClick={handleChangeColor}
          >
            {
              title && 
              <div className='w-full mb-2 px-1'>
                <h3
                  className={`text-md font-bold text-start ${checked && 'line-through text-gray-400'}`}
                >
                  {title}
                </h3>
              </div>
            }
            <div className='w-full flex flex-row items-center'>
              <div 
                className='w-full flex flex-row relative'
              >
                <textarea
                  ref={textareaElement}
                  className={`${checked && 'line-through text-gray-400'} text-black break-words w-11/12 text-start rounded px-2 py-1 border-none bg-transparent resize-none`}
                  value={text}
                  readOnly
                  draggable={true}
                />
                <div className='absolute top-0 left-0 w-11/12 h-full'></div>
              </div>
            </div>
            <div className='w-full text-start flex flex-row justify-between'>
              <span
                className='text-xs text-gray-600 text-start w-full px-2'
              >
                {date}
              </span>
              <span
                className='text-[10px] text-gray-400 text-start px-2'
              >
                {type.toUpperCase()}
              </span>
            </div>
          </div>
          <div className='absolute top-[50%] right-5 translate-x-[50%] translate-y-[-50%] h-full flex items-center justify-center pr-2 h-fit'>
            <label 
              htmlFor={`done_${id}`}
              className={`w-6 h-6 flex items-center justify-center rounded-lg border-2 after:text-gray-400 ${checked ? `after:content-["✔"] text-gray-400 border-gray-300` : 'border-gray-500'}`}
            >
              <input 
                id={`done_${id}`}
                className='w-5 h-5 hidden'
                type="checkbox" 
                name="done"
                checked={checked}
                onChange={handleCheck}
              />
            </label>
          </div>
        </div>
      </div>
      <div 
        className={`absolute top-1 right-0 w-[50px] h-[calc(100%-8px)] flex items-center justify-center ${isActiveDelete ? 'translate-x-0' : 'translate-x-[55px]'} duration-300`}
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
