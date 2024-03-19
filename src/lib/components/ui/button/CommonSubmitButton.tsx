import React from 'react'

const CommonSubmitButton = ({ handleClick, isShadow }: {
  handleClick?: () => void;
  isShadow?: boolean;
}) => {
  function handleSubmit(e: React.FormEvent<HTMLButtonElement>) {
    e.preventDefault()
    if (handleClick) handleClick()
  }
  return (
    <button
      className={`w-[50px] h-[40px] bg-black text-white rounded-xl border-0 text-sm ${isShadow && 'shadow'}`}
      type='submit'
      onClick={handleSubmit}
    >
      enter
    </button>
  )
}

export default CommonSubmitButton
