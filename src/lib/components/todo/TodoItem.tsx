import { COLOR_OPACITY } from 'lib/enum/PickerColor';
import { Tools } from 'lib/enum/Tools';
import { TodoService } from 'lib/service/TodoService';
import { toolState } from 'lib/store/ToolState';
import { colorState } from 'lib/store/colorStore/colorState';
import { darkState } from 'lib/store/setting/DarkState';
import { todoOrderState } from 'lib/store/todoStore/todoOrderState';
import { todoState } from 'lib/store/todoStore/todoState';
import { Todo } from 'lib/types/todo';
import detectSwipe from 'lib/util/detectSwipe';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import CancelBackground from '../background/CancelBackground';
import { FontSizeState } from 'lib/store/setting/FontState';
import AddButton from '../ui/button/AddButton';
import { ADDTYPE } from 'lib/enum/AddType';

const TodoItem = ({ todo }: { todo: Todo }) => {
  const { id, title, text, checked, color, type, isDone, date, prevItemId } = todo;
  const [isDelete, setIsDelete] = useState(false);
  const [todoList, setTodoList] = useRecoilState(todoState);
  const [todoOrder, setTodoOrder] = useRecoilState(todoOrderState);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [textValue, setTextValue] = useState(text);
  const [offset, setOffset] = useState(null);
  const [isActiveDelete, setIsActiveDelete] = useState(false);
  const textareaElement = useRef<HTMLTextAreaElement>(null);
  const sideButtonElement = useRef<HTMLDivElement>(null);
  const currentColor = useRecoilValue(colorState);
  const [currentTool, setCurrentTool] = useRecoilState(toolState);
  const fontSize = useRecoilValue(FontSizeState);
  const isDarkMode = useRecoilValue(darkState);

  const handleSwipe = (event: any) => {
    const swipeType = detectSwipe(event, offset, setOffset);
    console.log(swipeType);
    if (swipeType === 'left') {
      setIsActiveDelete(true);
    } else if (swipeType === 'right') {
      setIsActiveDelete(false);
    }
  };
  const handleDelete = async () => {
    try {
      await TodoService.deleteTodo(id);
      setIsDelete(true);
      setTimeout(() => {
        setTodoOrder((oldList) => {
          return [...oldList.filter((itemId) => itemId !== Number(id))];
        });
        setTodoList((oldList) => {
          return [...oldList.filter((todo: Todo) => todo.id !== id)];
        });
      }, 200);
    } catch (error) {
      alert('삭제에 실패했습니다.');
    }
  };
  const handlEdit = () => {
    setIsActiveDelete(false);
    setIsEditMode(true);
    setCurrentTool(Tools.NONE);
    if (!textareaElement || !textareaElement.current) return;
    textareaElement.current.focus();
  };
  const handleCheck = async () => {
    const result = await TodoService.updateTodo({
      ...todo,
      checked: !checked,
    });
    if (!checked) {
      const orderList = todoOrder.filter((itemId) => itemId !== Number(id));
      setTodoOrder(orderList);
      TodoService.updateTodoOrder(orderList);
    } else {
      const orderList = todoOrder.filter((itemId) => itemId !== Number(id));
      orderList.push(Number(id));
      setTodoOrder(orderList);
      TodoService.updateTodoOrder(orderList);
    }
    if (result) {
      setTodoList((oldList) => [...returnUpdateCheckedList(oldList, id)]);
    }
  };
  const handleChangeColor = async () => {
    if (currentTool !== Tools.HIGHLIGHTER) return;

    const isSameColor = color === currentColor.pickedColor;

    await TodoService.updateTodo({
      ...todo,
      color: isSameColor ? undefined : currentColor.pickedColor,
    });

    const newList = (await TodoService.getTodoList()) as Todo[];
    setTodoList([...newList]);
  };
  const resizeTextarea = (init?: string) => {
    if (init === 'init') {
      if (textareaElement.current) {
        textareaElement.current.style.height = 'auto';
        textareaElement.current.style.height = '40px';
      }
    }
    if (textareaElement.current) {
      textareaElement.current.style.height = 'auto';
      textareaElement.current.style.height = `${textareaElement.current.scrollHeight}px`;
    }
  };
  const handleChangeText = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextValue(event.target.value);
    resizeTextarea();
  };
  const submit = async () => {
    const input = {
      ...todo,
      text: textValue,
    };
    const result = await TodoService.updateTodo(input);

    if (!result) return;
    const newList = (await TodoService.getTodoList()) as Todo[];

    if (!newList) return;
    setTodoList(newList);
    setIsEditMode(false);
    if (!textareaElement || !textareaElement.current) return;
    textareaElement.current.blur();
  };
  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      submit();
      resizeTextarea('init');
    }
  };
  const handleCancel = () => {
    setIsEditMode(false);
    submit();
  };

  useEffect(() => {
    if (currentTool === Tools.ERASER) {
      setIsActiveDelete(true);
    } else {
      setIsActiveDelete(false);
    }
  }, [currentTool]);

  useEffect(() => {
    resizeTextarea();
  }, [textareaElement]);
  useEffect(() => {
    if (!textareaElement || !textareaElement.current) return;
    textareaElement.current.style.fontSize = fontSize + 'px';
    resizeTextarea();
  }, [fontSize]);
  return (
    <>
      {isEditMode && <CancelBackground handleCancel={handleCancel} />}
      <div
        className={`relative w-full min-h-[50px] duration-300 ${
          isDelete && 'animate-slide-right'
        } p-2 overflow-hidden px-3 py-1 ${isEditMode ? 'z-40 scale-110' : 'z-10'}`}
        onTouchStart={handleSwipe}
        onTouchEnd={handleSwipe}
        onMouseDown={handleSwipe}
        onMouseLeave={handleSwipe}
        onMouseUp={handleSwipe}
      >
        <div className={`w-full bg-white rounded`}>
          <div className={`relative w-full flex flex-row items-center shadow-md ${color} p-2 rounded`}>
            <div className={` flex flex-col items-center p-1 rounded w-full`} onClick={handleChangeColor}>
              {title && (
                <div className="w-full mb-2 px-1">
                  <h3 className={`text-md font-bold text-start ${checked && 'line-through text-gray-400'}`}>{title}</h3>
                </div>
              )}
              <div className="w-full flex flex-row items-center">
                <div className="w-full flex flex-row relative">
                  <textarea
                    ref={textareaElement}
                    className={`${
                      checked && 'line-through text-gray-400'
                    } text-black break-words w-11/12 text-start rounded px-2 py-1 border-none bg-transparent resize-none`}
                    onChange={(event) => handleChangeText(event)}
                    onKeyPress={(event) => handleKeyDown(event)}
                    onBlur={submit}
                    value={textValue}
                  />
                  {!isEditMode && <div className="absolute top-0 left-0 w-11/12 h-full"></div>}
                </div>
              </div>
              <div className="w-full text-start flex flex-row justify-between">
                <span className="text-xs text-gray-700 text-start w-full px-2">{date}</span>
                <span className="text-[10px] text-gray-700 text-start">{type.toUpperCase()}</span>
              </div>
            </div>
            <div className="absolute top-[50%] right-5 translate-x-[50%] translate-y-[-50%] h-full flex items-center justify-center pr-2 h-fit">
              <label
                htmlFor={`done_${id}`}
                className={`w-6 h-6 flex items-center justify-center rounded-lg border-2 after:text-gray-500 ${
                  checked ? `after:content-["✔"] text-gray-500 border-gray-400` : 'border-gray-500'
                }`}
              >
                <input
                  id={`done_${id}`}
                  className="w-5 h-5 hidden"
                  type="checkbox"
                  name="done"
                  checked={checked}
                  onChange={handleCheck}
                />
              </label>
            </div>
            <AddButton target={todo} action={ADDTYPE.AddToSchedule} />
          </div>
        </div>
        <div
          className={`absolute top-1 right-0 w-[140px] h-[calc(100%-8px)] flex items-center justify-center ${
            isActiveDelete ? 'translate-x-[10px]' : 'translate-x-[150px]'
          } duration-300`}
          ref={sideButtonElement}
        >
          <button className="w-[60px] h-full bg-violet-400 text-white shadow text-sm font-bold" onClick={handlEdit}>
            edit
          </button>
          <button className="w-[60px] h-full bg-red-500 text-white shadow text-sm font-bold" onClick={handleDelete}>
            delete
          </button>
        </div>
      </div>
    </>
  );
};

function returnUpdateCheckedList(oldList: Todo[], targetId: IDBValidKey) {
  return oldList.map((todo) => {
    if (todo.id === targetId) {
      return {
        ...todo,
        checked: !todo.checked,
      };
    }
    return todo;
  });
}

export default TodoItem;
