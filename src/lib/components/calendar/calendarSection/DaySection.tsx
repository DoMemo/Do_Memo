import { selectedDateState } from 'lib/store/calendarStore/selectedDateState';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useSetRecoilState } from 'recoil';

const DaySection = ({ day }: { day: string }) => {
  const [date, setDate] = useState<string>(day);
  // const [onToday, setOnToday] = useState<boolean>(false)
  const setSelectedDate = useSetRecoilState(selectedDateState);

  const handleClick = () => {
    setSelectedDate(day);
  };
  useEffect(() => {
    setDate(day.slice(-2));
  }, [day]);

  return (
    <div className="bg-white border-2" onClick={handleClick}>
      {date}
    </div>
  );
};

export default DaySection;
