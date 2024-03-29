import { todoState } from 'lib/store/todoStore/todoState';
import React, { useEffect, useLayoutEffect } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil';
import TodoItem from './TodoItem';
import { TodoService } from 'lib/service/TodoService';
import { Todo } from 'lib/types/todo';
import { checkedTodoList } from 'lib/store/todoStore/doneSelector';
import FlipWrapper from '../flip/FlipWrapper';
import Fliper from '../flip/Fliper';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { uncheckedTodoList } from 'lib/store/todoStore/doSelector';
import { todoOrderState } from 'lib/store/todoStore/todoOrderState';
import { INDEXED_DB } from 'lib/enum/Indexed_DB';
import { returnToday } from 'lib/util/formatDate';

const TodoList = ({ scroll }: {
  scroll: number;
}) => {
  const [ todoList, setTodoList ] = useRecoilState(todoState);
  const [ todoOrderList, setTodoOrderList ] = useRecoilState(todoOrderState);
  const uncheckedList = useRecoilValue(uncheckedTodoList);
  const checkedList = useRecoilValue(checkedTodoList);

  const getTodoList = async () => {
    const result = await TodoService.getTodoList() as Todo[];
    // console.log(result);
    const doneList: Todo[] = [];

    result.forEach((item) => {
      const itemUpdateAt = item.updateAt || item.date;
      if(itemUpdateAt < returnToday() && item.checked) {
        doneList.push(item);
      }
    })
    let updatedTodoList: Todo[] = [];
    doneList.forEach( async (item) => {
      const { id,  ...createTodo } = item; 
      await TodoService.deleteTodo(item.id, true);
      createTodo.date = returnToday();
      await TodoService.createTodoHistory(createTodo);
    })
    updatedTodoList = await TodoService.getTodoList() as Todo[];
    console.log(doneList);
    setTodoList((oldList) => {
      return [
        ...updatedTodoList
      ]
    });
  }
  const getTodoOrderList = () => {
    const orderList = localStorage.getItem(INDEXED_DB.TODO_LIST_INDEX);
    if(orderList) {
      // console.log(JSON.parse(orderList));
      setTodoOrderList(JSON.parse(orderList));
      return;
    }
    setTodoOrderList([]);
  }
  useLayoutEffect(() => {
    getTodoOrderList();
    getTodoList();
  }, []);
 
  return (
    <FlipWrapper
      scroll={scroll}
      list={todoList}
    >
      <div
        className={`w-full h-full flex flex-col items-center justify-start gap-1 todolist`}
      >
        <Droppable
          droppableId="droppable"
        >
          {(provided, snapshot) => (
            <div
              className={`w-full h-full flex flex-col items-center justify-start todolist`}
              ref={provided.innerRef}
            >
                {
                  uncheckedList.map((todo, index) => {
                    if(todo.checked) return null;
                    return (
                      <Draggable
                        index={index}
                        key={`${todo.id.toString()}_${todo.text}`}
                        draggableId={todo.id.toString()}
                      >
                        {(provided, snapshot) => (
                          <div
                            className='w-full'
                          >
                            <div className='w-full'
                              ref={provided.innerRef}
                              {...provided.dragHandleProps}
                              {...provided.draggableProps}
                            >
                              <Fliper key={`${index}_${todo.id}`} id={`${todo.id}_${todo.checked}`}>
                                <TodoItem 
                                  key={`${index}_${todo.id}`}
                                  todo={todo}
                                  isTodo={true}
                                />
                              </Fliper>
                            </div>
                          </div>
                        )}
                      </Draggable>
                    )
                  })
                }
                {provided.placeholder}
            </div>
          )}
        </Droppable>
          {
            checkedList.map((todo, index) => {
              return (
                <Fliper id={`${todo.id}_${todo.checked}`} key={`${index}_${todo.id}`}>
                <TodoItem 
                  key={index}
                  todo={todo}
                  isTodo={true}
                />
                </Fliper>
              )
            })
          }
          <div className='w-full h-20'></div>
      </div>
    </FlipWrapper>
  )
}

export default TodoList
