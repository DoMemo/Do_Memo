import TodoInputBox from 'lib/components/todo/TodoInputBox'
import TodoList from 'lib/components/todo/TodoList'
import React from 'react'

const Home = () => {
  return (
    <div className={`w-full max-h-full relative`}>
      <TodoInputBox />
      <div className={`relative w-full h-[calc(100vh-110px)] z-10 overflow-scroll scrollbar-hide`}>
        <TodoList />
      </div>
    </div>
  )
}

export default Home
