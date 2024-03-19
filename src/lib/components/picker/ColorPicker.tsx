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
      className={`w-[45px] h-[45px] rounded-full bg-white cursor-pointer ${isActive ? `scale-[120%] ` : "scale-[80%]"} transition-transform duration-300 ease-[cubic-bezier(0.4, 0, 0.5, 1.74)]`}
      onClick={handleColorPicker}
    >
      <div
        className={`w-full h-full rounded-full ${color}`}
      >

      </div>
    </div>
  )
}

export default ColorPicker
