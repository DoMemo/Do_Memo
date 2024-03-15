import { todoState } from 'lib/store/todoStore/todoState';
import React, { useEffect } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil';
import TodoItem from './TodoItem';
import { TodoService } from 'lib/service/TodoService';
import { Todo } from 'lib/types/todo';
import { checkedTodoList } from 'lib/store/todoStore/doneSelector';

const TodoList = () => {
  const [ todoList, setTodoList ] = useRecoilState(todoState);
  const checkedList = useRecoilValue(checkedTodoList);

  const getTodoList = async () => {
    const result = await TodoService.getTodoList() as Todo[];
    setTodoList((oldList) => {
      return [
        ...result
      ]
    });
  }

  useEffect(() => {
    getTodoList();
  }, []);

  return (
    <div
      className={`w-full h-full flex flex-col items-center justify-start gap-1`}
    >
      {
        todoList.map((todo, index) => {
          if(todo.checked) return null;
          return (
            <TodoItem 
              key={index}
              todo={todo}
            />
          )
        })
      }
      {
        checkedList.map((todo, index) => {
          return (
            <TodoItem 
              key={index}
              todo={todo}
            />
          )
        })
      }
    </div>
  )
}

export default TodoList
