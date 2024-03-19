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
    if(isFocus) {
      setTimeout(() => {
        inputElement.current?.focus();
      }, 310);
    };

  }, [isFocus]);

  return (
    <input 
      className={`w-full h-full text-black rounded-full px-4 focus:outline-none focus:border-none ${isShadow && 'shadow'}`}
      type="text"
      autoFocus={true}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      ref={inputElement}
      onKeyPress={handleKeyDown}
    />
  )
}

export default CommonInput
