import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../../../../assets/images/logo.svg';

const Logo = () => {
  return (
    <Link to='/home'>
      <div className='text-bold'>
        <img 
          className='w-[30px] h-[30px]'
          src={logo} alt="" />
      </div>
    </Link>
  )
}

export default Logo
