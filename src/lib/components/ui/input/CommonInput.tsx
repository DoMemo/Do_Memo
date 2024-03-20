import { FontSizeState } from 'lib/store/setting/FontState';
import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useRecoilValue } from 'recoil';

const CommonInput = ({
  value,
  setValue,
  isShadow,
  isFocus,
  handleSubmit,
  onChange,
}: {
  value: string;
  setValue: (value: string) => void;
  isShadow?: boolean;
  isFocus?: boolean;
  handleSubmit?: () => void;
  onChange?: (event: ChangeEvent<HTMLTextAreaElement>) => void;
}) => {
  const textareaElement = useRef<HTMLTextAreaElement | null>(null);
  const fontSize = useRecoilValue(FontSizeState);

  const textareaResize = (init?: string) => {
    if (!textareaElement || !textareaElement.current) return;
    textareaElement.current.style.height = 'auto';

    if (init === 'init') {
      textareaElement.current.style.height = '40px';
      return;
    }
    textareaElement.current.style.height = textareaElement.current?.scrollHeight - 20 + 'px';
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && handleSubmit && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
      textareaResize('init');
    }
  };

  const handleValue = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(event.target.value);
    textareaResize();
  };
  useEffect(() => {
    if (isFocus) {
      textareaElement.current?.focus();
    }
  }, [isFocus]);

  useEffect(() => {
    textareaResize('init');
  }, []);

  useEffect(() => {
    if (!textareaElement || !textareaElement.current) return;
    textareaElement.current.style.fontSize = fontSize + 'px';
  }, [fontSize]);

  return (
    <textarea
      className={` w-10/12 h-full text-black resize-none rounded-xl px-4 bg-white scrollbar-hide ${`text-[${fontSize}px]`} focus:outline-none focus:border-none p-2 ${
        isShadow && 'shadow'
      }`}
      onChange={(event) => handleValue(event)}
      value={value}
      ref={textareaElement}
      onKeyPress={handleKeyDown}
    />
  );
};

export default CommonInput;
