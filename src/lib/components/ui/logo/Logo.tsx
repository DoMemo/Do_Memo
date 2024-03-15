import React from 'react'
import { Link } from 'react-router-dom'

const Logo = () => {
  return (
    <Link to='/home'>
      <div className='text-bold'>
        Do!
      </div>
    </Link>
  )
}

export default Logo
