import React, { useEffect, useRef } from 'react'

const CommonInput = ({ value, setValue, isShadow, isFocus, handleSubmit }: {
  value: string;
  setValue: (value: string) => void;
  isShadow?: boolean;
  isFocus?: boolean;
  handleSubmit?: () => void;
}) => {
  const inputElement = useRef<HTMLInputElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if(e.key === 'Enter' && handleSubmit) {
      handleSubmit();
    }
  }

  useEffect(() => {
    if(isFocus) inputElement.current?.focus();
  }, [isFocus]);

  return (
    <input 
      className={`w-full h-[40px] bg-white border-2 border-gray-300 rounded-md px-4 focus:outline-none focus:border-blue-500 ${isShadow && 'shadow'}`}
      type="text"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      ref={inputElement}
      onKeyPress={handleKeyDown}
    />
  )
}

export default CommonInput