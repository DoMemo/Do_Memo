import { selectedDateState } from 'lib/store/calendarStore/selectedDateState';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';

const DaySection = ({ day }: { day: string }) => {
  const [date, setDate] = useState<string>(day);
  const selectedDate = useRecoilValue(selectedDateState);
  const [onToday, setOnToday] = useState<boolean>(selectedDate === day);
  const setSelectedDate = useSetRecoilState(selectedDateState);

  const handleClick = () => {
    setSelectedDate(day);
  };
  useEffect(() => {
    setDate(day.slice(-2));
    setOnToday(selectedDate === day);
  }, [day, selectedDate]);

  return (
    <div className={`bg-white border-2 ${onToday ? 'border-black' : ''}`} onClick={handleClick}>
      {date}
    </div>
  );
};

export default DaySection;
