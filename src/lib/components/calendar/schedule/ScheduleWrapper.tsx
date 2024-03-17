import React from 'react'
import ScheduleCard from './ScheduleCard'


const DummyData = [
  {
    id: '1',
    title: '운동가기',
    text: '루틴 \n\n 1. 벤치프레스 12x3 \n 2. 스쿼트 12x3',
    color: 'bg-red-500',
    type: 'type',
    date: 'date',
    link: [
      {
        type: 'type',
        id: 'id'
      }
    ]
  },
  {
    id: '2',
    title: 'title',
    text: 'klasjgiosjgofiewjfoiajwoifj;awogj;ij\nsd;lgsdfkjlsjkfla;sjgklkjsldfjlksjdlkfj\n\n;wjf;oiwejfoi;ajwgoi',
    color: 'bg-blue-500',
    type: 'type',
    date: 'date',
    link: [
      {
        type: 'type',
        id: 'id'
      }
    ]
  },
  {
    id: '3',
    title: 'title',
    text: 'text',
    color: 'bg-green-500',
    type: 'type',
    date: 'date',
    link: [
      {
        type: 'type',
        id: 'id'
      }
    ]
  },
  {
    id: '4',
    title: 'title',
    text: 'text',
    color: 'bg-yellow-500',
    type: 'type',
    date: 'date',
    link: [
      {
        type: 'type',
        id: 'id'
      }
    ]
  },
  {
    id: '5',
    title: 'title',
    text: 'text',
    color: 'bg-pink-500',
    type: 'type',
    date: 'date',
    link: [
      {
        type: 'type',
        id: 'id'
      }
    ]
  },
  {
    id: '6',
    title: 'title',
    text: 'text',
    color: 'bg-purple-500',
    type: 'type',
    date: 'date',
    link: [
      {
        type: 'type',
        id: 'id'
      }
    ]
  },
  {
    id: '7',
    title: 'title',
    text: 'text',
    color: 'bg-indigo-500',
    type: 'type',
    date: 'date',
    link: [
      {
        type: 'type',
        id: 'id'
      }
    ]
  },
  {
    id: '8',
    title: 'title',
    text: 'text',
    color: 'bg-gray-500',
    type: 'type',
    date: 'date',
    link: [
      {
        type: 'type',
        id: 'id'
      }
    ]
  },
]
const ScheduleWrapper = () => {
  return (
    <div
      className='w-full p-2'
    >
      {DummyData.map((schedule) => {
        return (
          <ScheduleCard
            key={schedule.id}
            schedule={schedule}
          />
        )
      })}
    </div>
  )
}

export default ScheduleWrapper
