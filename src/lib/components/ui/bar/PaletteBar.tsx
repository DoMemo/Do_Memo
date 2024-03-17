import ColorPicker from 'lib/components/picker/ColorPicker';
import { PICKER_COLOR } from 'lib/enum/PickerColor';
import { Tools } from 'lib/enum/Tools';
import { toolState } from 'lib/store/ToolState';
import React from 'react'
import { useRecoilValue } from 'recoil'

const colors = [
  PICKER_COLOR.red,
  PICKER_COLOR.blue,
  PICKER_COLOR.green,
  PICKER_COLOR.yellow,
  PICKER_COLOR.purple,
  PICKER_COLOR.pink,
];

const PaletteBar = () => {
  const currentTool = useRecoilValue(toolState);

  const isActive = () => {
    return currentTool === Tools.HIGHLIGHTER;
  }
  return (
    <div
      className={`absolute ${isActive() ? "top-[-110%]" : "top-2"} left-0 flex flex-row gap-3 justify-center items-center w-[calc(100%-16px)] h-[60px] shadow-[0_0px_2px_1px_rgba(0,0,0,0.1)] bg-white duration-300 rounded-full mx-2`}
    >
      {
        colors.map((color, index) => {
          return (
            <ColorPicker color={color} key={index} />
          )
        })
      }
    </div>
  )
}

export default PaletteBar
