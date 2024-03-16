import { COLOR_OPACITY, PICKER_COLOR } from 'lib/enum/PickerColor';
import { colorState } from 'lib/store/colorStore/colorState';
import React, { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil';

const ColorPicker = ({ color }: {
  color: PICKER_COLOR;
}) => {
  const [ isActive, setIsActive ] = useState(false);
  const [ pickedColor, setPickedColor ] = useRecoilState(colorState);

  const handleColorPicker = () => {
    setPickedColor({
      pickedColor: color
    });
  };

  useEffect(() => {
    if(pickedColor.pickedColor === color) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [pickedColor]);

  return (
    <div
      className={`w-[45px] h-[45px] rounded-full ${color} cursor-pointer ${isActive ? `scale-110 border-2 border-${color}` : ""} transition-transform duration-300 ease-in-out`}
      onClick={handleColorPicker}
    />
  )
}

export default ColorPicker
