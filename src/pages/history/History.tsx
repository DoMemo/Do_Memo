import TodoItem from 'lib/components/todo/TodoItem';
import { TodoService } from 'lib/service/TodoService';
import { Todo } from 'lib/types/todo';
import React, { useEffect, useState } from 'react'

const History = () => {
  const [ historyList, setHistoryList ] = useState<Todo[]>([]);
  const getHistory = async () => {
    const result = await TodoService.getTodoHistory() as Todo[];
    const sortList = result.sort((a, b) => {
      const dateA = new Date(a.updateAt || a.date);
      const dateB = new Date(a.updateAt || a.date);
      return (dateA as any)- (dateB as any);
  })
    setHistoryList(sortList);
  }
  useEffect(() => {
    getHistory();
  }, [])
  return (
    <>
      <div className='w-full h-full overflow-scroll scrollbar-hide'>
        {historyList.map((todo, index) => {
          return <TodoItem todo={todo} isTodo={false} key={index}/>
        })}
      </div>
    </>
  )
}

export default History
