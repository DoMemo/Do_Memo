import React, { useEffect, useRef } from 'react'

const CommonInput = ({ value, setValue, isShadow, isFocus, handleSubmit }: {
  value: string;
  setValue: (value: string) => void;
  isShadow?: boolean;
  isFocus?: boolean;
  handleSubmit?: () => void;
}) => {
  const textareaElement = useRef<HTMLTextAreaElement | null>(null);

  
  const textareaResize = (init?: string) => {
    if(!textareaElement || !textareaElement.current) return;
    textareaElement.current.style.height = 'auto';
    
    if(init === 'init') {
      textareaElement.current.style.height = '40px';
      return;
    }
    textareaElement.current.style.height = textareaElement.current?.scrollHeight + 'px';
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if(e.key === 'Enter' && handleSubmit && !e.shiftKey) {
      textareaResize('init');
      handleSubmit();
    }
  };

  const handleValue = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    textareaResize();
    setValue(event.target.value);
  };

  const initSize = () => {
    if(!value) {
      textareaResize('init');
    }
  }
  useEffect(() => {
    if(isFocus) {
      setTimeout(() => {
        textareaElement.current?.focus();
      }, 310);
    };

  }, [isFocus]);

  useEffect(() => {
    textareaResize('init');
  }, []);

  return (
    <textarea 
      className={` w-10/12 h-full text-black rounded-xl px-4 bg-white focus:outline-none focus:border-none p-2 ${isShadow && 'shadow'}`}
      autoFocus={true}
      value={value}
      onChange={(event) => handleValue(event)}
      ref={textareaElement}
      onKeyDown={handleKeyDown}
      onKeyUp={initSize}
    />
  )
}

export default CommonInput
