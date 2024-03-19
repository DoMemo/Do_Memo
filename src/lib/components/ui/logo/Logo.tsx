import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../../../../assets/images/logo.svg';
import logoWhite from '../../../../assets/images/logo_white.svg';
import { useRecoilValue } from 'recoil';
import { darkState } from 'lib/store/setting/DarkState';

const Logo = () => {
  const isDarkMode = useRecoilValue(darkState);

  return (
    <Link to='/home'>
      <div className='text-bold'>
        <img 
          className='w-[30px] h-[30px]'
          src={isDarkMode ? logoWhite : logo} alt="" />
      </div>
    </Link>
  )
}

export default Logo
