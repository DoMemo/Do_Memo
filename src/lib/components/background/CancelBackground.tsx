import { darkState } from 'lib/store/setting/DarkState';
import React from 'react'
import { useRecoilValue } from 'recoil';

const CancelBackground = ({ handleCancel }: {
  handleCancel: () => void;
}) => {
  const isDarkMode = useRecoilValue(darkState);
  return (
    <div
      className={`w-full h-[300vh] ${isDarkMode ? "bg-slate-900" : "bg-gray-200"} bg-opacity-30 absolute top-0 left-0 z-30 duration-200`}
      onClick={handleCancel}
    >

    </div>
  )
}

export default CancelBackground
