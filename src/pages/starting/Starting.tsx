
import React from 'react'
import { useNavigate } from "react-router-dom";
const Starting = () => {
  const navigate = useNavigate();

  setTimeout(() => {
    navigate('/home');
  }, 1200);
  
  return (
    <div className='w-full h-screen flex justify-center items-center'>
      <h1 className='font-bold text-2xl'>
        Do!
      </h1>
    </div>
  )
}

export default Starting
