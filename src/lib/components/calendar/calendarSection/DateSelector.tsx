import React, { useEffect, useState } from 'react';
import MonthSection from './MonthSection';

const DateSelector = () => {
  const [monthDaysArray, setMonthDaysArray] = useState<string[]>([]);
  const currentDate = new Date();
  const [year, setYear] = useState<number>(currentDate.getFullYear());
  const [month, setMonth] = useState<number>(currentDate.getMonth() - 1);

  // Year, Month 에 따라 달력 설정 함수
  const getDaysInMonth = (currentDate: Date) => {
    // 현재 달의 첫째 날
    const firstDay = new Date(year, month, 1);

    // 이전 달의 마지막날 구하기
    const prevLast = new Date(firstDay);
    prevLast.setDate(0);

    const prevLastDate = prevLast.getDate();
    const prevLastDay = prevLast.getDay();

    const currentLastDate = new Date(year, month + 1, 0).getDate();
    const currentLastDay = new Date(year, month + 1, 0).getDay();

    const prevDates: string[] = [];
    const currentDates: string[] = [];
    const nextDates: string[] = [];

    // 이전 달의 마지막 주의 일요일부터 이전 달의 마지막 날까지 날짜 추가
    const lastSunday = prevLastDate - prevLastDay;
    for (let i = lastSunday; i <= prevLastDate; i++) {
      let prevMonth = String(month).padStart(2, '0');
      let prevYear = year;
      if (prevMonth == '00') {
        prevMonth = '12';
        prevYear = year - 1;
      }
      const formattedDate = `${prevYear}-${prevMonth}-${String(i).padStart(2, '0')}`;
      prevDates.push(formattedDate);
    }

    // 현재 달의 날짜 추가
    for (let i = 1; i <= currentLastDate; i++) {
      const formattedDate = `${year}-${String(month + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
      currentDates.push(formattedDate);
    }

    // 다음 달의 날짜 추가
    const remainingDays = 7 - currentLastDay;
    for (let i = 1; i < remainingDays; i++) {
      const nextMonth = month === 11 ? 0 : month + 1;
      const nextYear = month === 11 ? year + 1 : year;
      const formattedDate = `${nextYear}-${String(nextMonth + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
      nextDates.push(formattedDate);
    }

    // 모든 날짜를 하나의 배열로 합치기
    const dates = prevDates.concat(currentDates, nextDates);

    setMonthDaysArray(dates);
  };

  //Year, Month 설정 함수
  const handleYear = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedYear = parseInt(event.target.value);
    setYear(selectedYear);
  };
  const handleMonth = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedMonth = parseInt(event.target.value);
    setMonth(selectedMonth);
  };

  const handlePrevMonth = () => {
    if (month === 0) {
      setYear(year - 1);
      setMonth(11);
    } else {
      setMonth(month - 1);
    }
  };
  const handleNextMonth = () => {
    if (month === 11) {
      setYear(year + 1);
      setMonth(0);
    } else {
      setMonth(month + 1);
    }
  };

  useEffect(() => {
    getDaysInMonth(currentDate);
  }, [year, month]);

  return (
    <div className="max-w-[700px] w-3/4 mx-auto">
      <div className="flex justify-between pl-2 pr-2">
        <select value={year} onChange={handleYear} className="mr-2">
          {Array.from({ length: 10 }, (_, index) => year - 5 + index).map((selectYear) => (
            <option key={selectYear} value={selectYear}>
              {selectYear}
            </option>
          ))}
        </select>
        <select value={month} onChange={handleMonth} className="mr-2">
          {Array.from({ length: 12 }, (_, index) => index).map((selectMonth) => (
            <option key={selectMonth} value={selectMonth}>
              {String(selectMonth + 1).padStart(2, '0')}
            </option>
          ))}
        </select>
        <div>
          <button className="mr-2" onClick={handlePrevMonth}>
            이전달
          </button>
          <button onClick={handleNextMonth}>다음달</button>
        </div>
      </div>
      <MonthSection dayArray={monthDaysArray} />
    </div>
  );
};

export default DateSelector;
