import React, { useEffect, useState } from 'react';
import MonthSection from './MonthSection';

const DateSelector = () => {
  const [monthDaysArray, setMonthDaysArray] = useState<string[]>([]);
  const currentDate = new Date();
  const [year, setYear] = useState<number>(currentDate.getFullYear());
  const [month, setMonth] = useState<number>(currentDate.getMonth());

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

  // Year, Month 에 따라 달력 설정
  useEffect(() => {
    setMonthDaysArray([
      ...getDaysInPrevMonth(year, month),
      ...getDaysInCurrentMonth(year, month),
      ...getDaysInNextMonth(year, month),
    ]);
  }, [year, month]);

  return (
    <div className="max-w-[700px] w-3/4 mx-auto">
      <div className="flex justify-between mt-2">
        <div>
          <select value={month} onChange={handleMonth} className="text-lg font-bold text-gray-800">
            {Array.from({ length: 12 }, (_, index) => index).map((selectMonth) => {
              const monthName = new Date(0, selectMonth).toLocaleString('en', { month: 'short' });
              return (
                <option key={selectMonth} value={selectMonth}>
                  {monthName}
                </option>
              );
            })}
          </select>
          <select value={year} onChange={handleYear} className="mr-2 ml-1 text-lg text-gray-500 font-normal">
            {Array.from({ length: 10 }, (_, index) => year - 5 + index).map((selectYear) => (
              <option key={selectYear} value={selectYear}>
                {selectYear}
              </option>
            ))}
          </select>
        </div>
        <div className="border rounded-lg px-1">
          <button
            className="leading-none rounded-lg transition ease-in-out duration-100 inline-flex cursor-pointer hover:bg-gray-200 p-1 items-center"
            onClick={handlePrevMonth}
          >
            <svg
              className="h-6 w-6 text-gray-500 inline-flex leading-none"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
            </svg>
          </button>
          <div className="border-r inline-flex h-6"></div>
          <button
            onClick={handleNextMonth}
            className="leading-none rounded-lg transition ease-in-out duration-100 inline-flex items-center cursor-pointer hover:bg-gray-200 p-1"
          >
            <svg
              className="h-6 w-6 text-gray-500 inline-flex leading-none"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </button>
        </div>
      </div>
      <MonthSection
        dayArray={monthDaysArray}
        currentMonth={month + 1}
        prevDays={getDaysInPrevMonth(year, month).length}
        nextDays={getDaysInNextMonth(year, month).length}
      />
    </div>
  );
};

// 이전 달의 마지막 주 배열
function getDaysInPrevMonth(year: number, month: number) {
  const prevDates: string[] = [];
  // 현재 달의 첫째 날짜
  const firstDay = new Date(year, month, 1);

  // 이전 달의 마지막 날
  const prevLast = new Date(firstDay);
  prevLast.setDate(0); // 이전 달의 마지막날짜 Date정보

  const prevLastDate = prevLast.getDate(); // 이전 달의 마지막 날짜
  const prevLastDay = prevLast.getDay(); // 이전 달의 마지막 요일

  // 이전 달의 마지막 날짜로부터 마지막 주 일요일까지 날짜 배열에 담기
  const lastSunday = prevLastDate - prevLastDay; // 배열에 담아야할 날짜의 갯수
  //마지막 요일이 일요일 일 경우 빈배열 반환
  if (prevLastDay !== 6) {
    for (let i = lastSunday; i <= prevLastDate; i++) {
      let prevMonth = String(month).padStart(2, '0');
      let prevYear = year;
      if (prevMonth == '00') {
        prevMonth = '12';
        prevYear = year - 1;
      }
      const dates = `${prevYear}-${prevMonth}-${String(i)}`;
      prevDates.push(dates);
    }
  }
  return prevDates;
}

// 현재 달의 날짜 배열
function getDaysInCurrentMonth(year: number, month: number) {
  const currentDates: string[] = [];

  // 현재 달의 마지막 날짜
  const currentLastDate = new Date(year, month + 1, 0).getDate();
  for (let i = 1; i <= currentLastDate; i++) {
    const dates = `${year}-${String(month + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
    currentDates.push(dates);
  }
  return currentDates;
}

// 다음달의 첫째 주 배열
function getDaysInNextMonth(year: number, month: number) {
  const nextDates: string[] = [];

  // 현재 달의 마지막 요일
  const currentLastDay = new Date(year, month + 1, 0).getDay();

  // 다음 달의 날짜 추가
  const nextEmptyDays = 7 - currentLastDay; // 다음 달의 첫째 주 배열에 들어갈 날짜들
  for (let i = 1; i < nextEmptyDays; i++) {
    const nextMonth = month === 11 ? 0 : month + 1;
    const nextYear = month === 11 ? year + 1 : year;
    const dates = `${nextYear}-${String(nextMonth + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
    nextDates.push(dates);
  }
  return nextDates;
}

export default DateSelector;
