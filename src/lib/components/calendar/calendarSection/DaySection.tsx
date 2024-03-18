import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

const DaySection = ({ day }: { day: string }) => {
  const [date, setDate] = useState<string>(day);
  useEffect(() => {
    setDate(day.slice(-2));
  }, []);
  return <div className="bg-white border-2">{date}</div>;
};

export default DaySection;
