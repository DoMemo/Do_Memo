import React from 'react'

const CancelCircleButton = ({ handleDelete }: {
  handleDelete: () => void;
}) => {
  return (
    <button
      className='w-[25px] h-[25px] rounded-full flex justify-center items-center duration-200 shadow-lg text-white bg-red-500'
      onClick={handleDelete}
    >
      x
    </button>
  )
}

export default CancelCircleButton
