import { PageInfo } from 'lib/enum/PageInfo'
import React from 'react'
import { Link } from 'react-router-dom'
const pages = [
  {
    name: 'calendar',
    link: PageInfo.calendar,
  }, 
  // {
  //   name: 'note',
  //   link: PageInfo.note,
  // },
  {
    name: 'home',
    link: PageInfo.home,
  },
]
const SideBarLinks = () => {
  return (
    <div className='w-full flex flex-col items-start gap-4 text-xl font-bold uppercase p-4'>
      {pages.map((page, index) => (
        <Link key={index} to={page.link}>
          {page.name}
        </Link>
      ))}
    </div>
  )
}

export default SideBarLinks
