import React from 'react'
import SettingItem from './SettingItem'

const SettingWrapper = () => {
  return (
    <div
      className='w-full bg-red flex flex-col pt-4 gap-3'
    >
      <SettingItem title='폰트 사이즈'>
        준비중
      </SettingItem>
      <SettingItem title='다크 모드'>
        준비중ㅋ
      </SettingItem>
    </div>
  )
}

export default SettingWrapper
