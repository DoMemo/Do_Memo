import React, { useEffect, useState } from 'react'
import CommonInput from '../ui/input/CommonInput'
import CommonSubmitButton from '../ui/button/CommonSubmitButton';
import { useRecoilState, useRecoilValue } from 'recoil';
import { toolState } from 'lib/store/ToolState';
import { Tools } from 'lib/enum/Tools';
import CancelBackground from '../background/CancelBackground';
import { TodoService } from 'lib/service/TodoService';
import { TYPE } from 'lib/enum/Type';
import { returnToday } from 'lib/util/formatDate';
import { todoState } from 'lib/store/todoStore/todoState';
import { Todo } from 'lib/types/todo';
import { PICKER_COLOR } from 'lib/enum/PickerColor';
import { todoOrderState } from 'lib/store/todoStore/todoOrderState';
import { darkState } from 'lib/store/setting/DarkState';

const TodoInputBox = () => {
  const [ value, setValue ] = useState<string>('');
  const [ mount, setMount ] = useState<boolean>(false);
  const [ isFocus, setIsFocus ] = useState<boolean>(false);
  const [ activeTool, setActiveTool ] = useRecoilState(toolState);
  const [ todoList, setTodoList ] = useRecoilState(todoState);
  const [ todoOrder, setTodoOrder ] = useRecoilState(todoOrderState);
  const isDarkMode = useRecoilValue(darkState);

  const returnLastItemId = () => {
    if(todoList.length === 0) return undefined;
    return todoList[todoList.length - 1].id;
  }
  const handleSubmit = async () => {
    if(!value) return;
    const input = {
      title: undefined,
      text: value,
      checked: false,
      color: undefined,
      prevItemId: returnLastItemId(),
      type: TYPE.todo,
      isDone: false,
      date: returnToday(),
    }
    const result = await TodoService.createTodo(input) as Todo;
    if(result) {
      setTodoOrder((oldList: number[]) => {
        return [
          ...oldList,
          Number(result.id)
        ]
      })
      setTodoList((oldList) => {
        return [
          ...oldList,
          result
        ]
      });
    }
    setValue('');
  }

  const isActive = () => {
    return activeTool === Tools.PEN;
  }

  const handleCancel = () => {
    setActiveTool(Tools.NONE);
  }

  useEffect(() => {
    if(activeTool === Tools.PEN) {
      setMount(true);
      setIsFocus(true);
    } else {
      setTimeout(() => {
        setMount(false);
      }, 200);
    }
  }, [activeTool]);
  return (
    <>
      {
        mount &&
        <>
          <CancelBackground 
            handleCancel={handleCancel}
          />
          <div className='absolute top-0 left-0 w-full h-[56px] overflow-hidden z-40 flex justify-center pt-2'>
            <div
              className={`w-[calc(100%-10px)] h-[48px] bg-white rounded-full flex flex-row justify-between items-center gap-2 p-1 shadow-inner-[0px_0px_10px_-2px_rgba(0,0,0,0.3)] ${isActive() ? 'animate-slide-down' : ' animate-slide-up'} z-40 shadow`}
            >
              <CommonInput 
                value={value}
                setValue={setValue}
                isShadow={false}
                isFocus={isFocus}
                handleSubmit={handleSubmit}
              />
              <CommonSubmitButton 
                handleClick={handleSubmit}
                isShadow
              />
            </div>
          </div>
        </>
      }
    </>
  )
}

export default TodoInputBox
