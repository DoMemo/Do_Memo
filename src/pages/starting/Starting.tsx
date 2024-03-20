import { TodoService } from 'lib/service/TodoService';
import { Todo } from 'lib/types/todo';
import { returnToday } from 'lib/util/formatDate';
import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
const Starting = () => {
  const [ isLoading, setIsLoading ] = useState(true);
  const navigate = useNavigate();

  setTimeout(() => {
    navigate('/home');
  }, 1200);
  
  const setTodoHistory = async () => {
    const todoList = await TodoService.getTodoList() as Todo[];
    console.log('실행');
    todoList.forEach( async (todo) => {
      if(todo.checked && todo.date < returnToday()) {
        console.log('삭제할 todo',todo);
        await TodoService.deleteTodo(todo.id);

        const newHistory = {
          title: todo.title,
          text: todo.text,
          checked: false,
          color: todo.color,
          prevItemId: todo.prevItemId,
          type: todo.type,
          isDone: true,
          date: returnToday(),
          link: todo.link
        }
        await TodoService.createTodoHistory(newHistory);
      }
    });
  }

  useEffect(() => {
    setTodoHistory();
  }, []);

  return (
    <div className='w-full h-screen flex justify-center items-center'>
      <h1 className='font-bold text-2xl'>
        Do!
      </h1>
    </div>
  )
}

export default Starting
