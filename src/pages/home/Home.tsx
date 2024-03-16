import TodoInputBox from 'lib/components/todo/TodoInputBox'
import TodoList from 'lib/components/todo/TodoList'
import React, { useEffect, useRef, useState } from 'react'

const Home = () => {
  const bodyContainer = useRef<HTMLDivElement>(null);
  const [ scrollY, setScrollY ] = useState(0);

  const handleScroll = () => {
    if(bodyContainer.current) {
      setScrollY(bodyContainer.current.scrollTop);
    }
  }
  return (
    <div className={`w-full max-h-full relative`}>
      <TodoInputBox />
      <div 
        className={`relative w-full h-[calc(100vh-110px)] z-10 overflow-scroll scrollbar-hide`}
        ref={bodyContainer} 
        onScroll={handleScroll}
      >
        <TodoList scroll={scrollY} />
      </div>
    </div>
  )
}

export default Home
