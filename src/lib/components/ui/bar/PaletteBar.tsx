import ColorPicker from 'lib/components/picker/ColorPicker';
import { PICKER_COLOR } from 'lib/enum/PickerColor';
import { Tools } from 'lib/enum/Tools';
import { toolState } from 'lib/store/ToolState';
import { darkState } from 'lib/store/setting/DarkState';
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
  const isDarkMode = useRecoilValue(darkState);

  const isActive = () => {
    return currentTool === Tools.HIGHLIGHTER;
  }
  return (
    <div
      className={`absolute ${isActive() ? "top-[-110%]" : "top-2"} left-0 flex flex-row gap-3 justify-center items-center w-[calc(100%-16px)] h-[60px] shadow-[0_0px_2px_1px_rgba(0,0,0,0.1)] ${isDarkMode ? "bg-slate-950 text-white" : "bg-white"} duration-300 rounded-full mx-2 overflow-hidden ease-[cubic-bezier(0.88, 0.6, 0.58, 1.75)]`}
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
