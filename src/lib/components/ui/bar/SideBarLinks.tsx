import { PageInfo } from 'lib/enum/PageInfo'
import React, { useEffect, useState } from 'react'
import { Link, useLocation, useSearchParams } from 'react-router-dom'
const pages = [
  {
    name: 'home',
    link: PageInfo.home,
  },
  {
    name: 'calendar',
    link: PageInfo.calendar,
  }, 
  {
    name: 'history',
    link: PageInfo.history,
  },
]
const SideBarLinks = () => {
  const param = useLocation();

  const returnIsActive = (param: any, link: string) => {
    if(param.pathname === link) return true;
    return false
  }
  return (
    <div className='w-full flex flex-col items-start gap-4 text-xl font-bold uppercase p-4'>
      {pages.map((page, index) => (
        <div className='w-full' key={`${index}_${page.name}`}>
          <Link key={`${index}_${page.name}`} to={page.link}>
            <div className={`w-full ${returnIsActive(param, page.link) ? "bg-red-400" : ""}`}>
            {page.name}
            </div>
          </Link>
        </div>
      ))}
    </div>
  )
}

export default SideBarLinks
