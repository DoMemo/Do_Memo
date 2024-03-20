import TodoItem from 'lib/components/todo/TodoItem';
import { TodoService } from 'lib/service/TodoService';
import { Todo } from 'lib/types/todo';
import React, { useEffect, useState } from 'react'

const History = () => {
  const [ historyList, setHistoryList ] = useState<Todo[]>([]);
  const getHistory = async () => {
    const result = await TodoService.getTodoHistory() as Todo[];
    setHistoryList(result);
  }
  useEffect(() => {
    getHistory();
  }, [])
  return (
    <div>
      {historyList.map((todo, index) => {
        return <TodoItem todo={todo} isTodo={false} key={index}/>
      })}
    </div>
  )
}

export default History
